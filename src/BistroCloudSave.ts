import { supabase } from './supabase';
import { BistroSaveData, BistroUser, CloudSyncState } from './types';

export interface SyncStatusInfo {
  state: CloudSyncState;
  lastSavedAt: number | null;
  message?: string;
}

export class BistroCloudSave {
  private static instance: BistroCloudSave | null = null;
  private currentUser: BistroUser | null = null;
  private isInitialized: boolean = false;
  private syncState: CloudSyncState = 'offline';
  private lastSavedAt: number | null = null;
  private saveDebounceTimer: any = null;
  private authListeners: Array<(user: BistroUser | null) => void> = [];
  private syncListeners: Array<(info: SyncStatusInfo) => void> = [];

  private constructor() {}

  public static getInstance(): BistroCloudSave {
    if (!BistroCloudSave.instance) {
      BistroCloudSave.instance = new BistroCloudSave();
    }
    return BistroCloudSave.instance;
  }

  public async init(): Promise<BistroUser | null> {
    if (this.isInitialized) return this.currentUser;

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!error && session?.user) {
        this.setUserFromSession(session.user);
        this.syncState = 'synced';
      } else {
        this.currentUser = null;
        this.syncState = 'offline';
      }
    } catch (e) {
      console.warn('BistroCloudSave: Failed to check active session:', e);
      this.currentUser = null;
      this.syncState = 'offline';
    }

    // Subscribe to auth state changes
    supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      if (session?.user) {
        this.setUserFromSession(session.user);
        this.syncState = 'synced';
      } else {
        this.currentUser = null;
        this.syncState = 'offline';
      }
      this.notifyAuthListeners();
      this.notifySyncListeners();
    });

    this.isInitialized = true;
    this.notifyAuthListeners();
    this.notifySyncListeners();
    return this.currentUser;
  }

  private setUserFromSession(user: any) {
    const email = user.email || 'chef@bistrotown.io';
    const metadataName = user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.username;
    const derivedName = metadataName || email.split('@')[0];
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

    this.currentUser = {
      id: user.id,
      email,
      username: formattedName,
      avatarUrl
    };
  }

  public getCurrentUser(): BistroUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public getSyncStatus(): SyncStatusInfo {
    return {
      state: this.syncState,
      lastSavedAt: this.lastSavedAt
    };
  }

  private getStorageKey(): string {
    if (this.currentUser) {
      return `bistro_town_save_${this.currentUser.id}`;
    }
    return 'bistro_town_grind_save';
  }

  /**
   * Saves game data locally immediately and to Supabase Cloud if authenticated (debounced).
   */
  public async queueSave(data: BistroSaveData, isImmediate: boolean = false): Promise<boolean> {
    data.timestamp = Date.now();
    data.version = 1;

    // 1. Always write immediately to local storage
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.getStorageKey(), serialized);
      // Also keep fallback guest save in sync
      localStorage.setItem('bistro_town_grind_save', serialized);
      this.lastSavedAt = data.timestamp;
    } catch (err) {
      console.warn('BistroCloudSave: Failed local save:', err);
    }

    // 2. If not logged in, we are in offline/guest mode
    if (!this.currentUser) {
      this.syncState = 'offline';
      this.notifySyncListeners();
      return true;
    }

    // 3. Cloud save
    if (isImmediate) {
      if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
      return this.pushToCloud(data);
    }

    this.syncState = 'saving';
    this.notifySyncListeners();

    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }

    this.saveDebounceTimer = setTimeout(() => {
      this.pushToCloud(data);
    }, 2500); // Debounce by 2.5 seconds during rapid actions

    return true;
  }

  /**
   * Direct push of save data to Supabase Cloud.
   */
  public async pushToCloud(data: BistroSaveData): Promise<boolean> {
    if (!this.currentUser) {
      this.syncState = 'offline';
      this.notifySyncListeners();
      return false;
    }

    this.syncState = 'saving';
    this.notifySyncListeners();

    try {
      const now = Date.now();
      data.timestamp = now;

      // Method A: Store in Supabase user metadata (guaranteed per-user storage, no SQL schema dependencies)
      const { error: userMetaError } = await supabase.auth.updateUser({
        data: {
          bistro_save: data,
          bistro_save_updated: now
        }
      });

      if (userMetaError) {
        console.warn('BistroCloudSave: updateUser metadata save error:', userMetaError.message);
      }

      // Method B: Try upserting to user_saves or bistro_saves table for relational permanence
      try {
        await supabase.from('bistro_saves').upsert({
          user_id: this.currentUser.id,
          save_state: data,
          updated_at: new Date(now).toISOString()
        });
      } catch {
        // Ignored if table does not exist
      }

      this.lastSavedAt = now;
      this.syncState = 'synced';
      this.notifySyncListeners();
      return true;
    } catch (err: any) {
      console.error('BistroCloudSave: Cloud sync failed:', err);
      this.syncState = 'error';
      this.notifySyncListeners({
        state: 'error',
        lastSavedAt: this.lastSavedAt,
        message: err?.message || 'Failed to sync with cloud'
      });
      return false;
    }
  }

  /**
   * Fetches cloud save data for the current logged-in user.
   */
  public async fetchCloudSave(): Promise<BistroSaveData | null> {
    if (!this.currentUser) return null;

    try {
      // 1. Try fetching from Supabase session / user metadata first
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!error && user?.user_metadata?.bistro_save) {
        const save = user.user_metadata.bistro_save as BistroSaveData;
        if (save && typeof save.gridSize === 'number') {
          return save;
        }
      }

      // 2. Try fetching from table if available
      const { data: tableData } = await supabase
        .from('bistro_saves')
        .select('save_state')
        .eq('user_id', this.currentUser.id)
        .single();

      if (tableData?.save_state) {
        return tableData.save_state as BistroSaveData;
      }
    } catch (e) {
      console.warn('BistroCloudSave: Error fetching cloud save:', e);
    }

    return null;
  }

  /**
   * Resolves the best save data available: compares cloud vs local.
   */
  public async loadBestSave(): Promise<{ data: BistroSaveData | null; source: 'cloud' | 'local' | 'none' }> {
    const preAuthRaw = localStorage.getItem('bistro_town_pre_auth_save');
    const localRaw = localStorage.getItem(this.getStorageKey()) || preAuthRaw || localStorage.getItem('bistro_town_grind_save');
    if (preAuthRaw) {
      localStorage.removeItem('bistro_town_pre_auth_save');
    }
    let localSave: BistroSaveData | null = null;

    if (localRaw) {
      try {
        localSave = JSON.parse(localRaw);
      } catch (e) {
        console.warn('Corrupted local save:', e);
      }
    }

    if (!this.currentUser) {
      return { data: localSave, source: localSave ? 'local' : 'none' };
    }

    const cloudSave = await this.fetchCloudSave();

    if (!cloudSave && localSave) {
      // User has local save but no cloud save yet: auto-migrate local save to cloud!
      await this.pushToCloud(localSave);
      return { data: localSave, source: 'local' };
    }

    if (cloudSave && !localSave) {
      // Local save was empty: populate from cloud
      localStorage.setItem(this.getStorageKey(), JSON.stringify(cloudSave));
      return { data: cloudSave, source: 'cloud' };
    }

    if (cloudSave && localSave) {
      const cloudTime = cloudSave.timestamp || 0;
      const localTime = localSave.timestamp || 0;

      if (cloudTime > localTime) {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(cloudSave));
        return { data: cloudSave, source: 'cloud' };
      } else {
        // Local is newer: update cloud
        await this.pushToCloud(localSave);
        return { data: localSave, source: 'local' };
      }
    }

    return { data: null, source: 'none' };
  }

  /**
   * Authentication methods
   */
  public async signIn(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        this.setUserFromSession(data.user);
        this.syncState = 'synced';
        this.notifyAuthListeners();
        this.notifySyncListeners();
        return { success: true };
      }

      return { success: false, message: 'Could not log in. Please check credentials.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Login failed.' };
    }
  }

  public async signUp(email: string, password: string, username?: string): Promise<{ success: boolean; message?: string }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0]
          }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user && !data.session) {
        return { 
          success: true, 
          message: 'Account created! Please check your email to confirm registration, then sign in.' 
        };
      }

      if (data.user) {
        this.setUserFromSession(data.user);
        this.syncState = 'synced';
        this.notifyAuthListeners();
        this.notifySyncListeners();
        return { success: true };
      }

      return { success: false, message: 'Registration failed.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Signup failed.' };
    }
  }

  public async signInWithGoogle(): Promise<{ success: boolean; message?: string }> {
    try {
      // Preserve current local diner before OAuth redirect
      const localRaw = localStorage.getItem(this.getStorageKey()) || localStorage.getItem('bistro_town_grind_save');
      if (localRaw) {
        localStorage.setItem('bistro_town_pre_auth_save', localRaw);
      }

      const redirectTo = window.location.origin + window.location.pathname;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed to initiate Google sign-in.' };
    }
  }

  public async signOut(): Promise<void> {
    if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
    await supabase.auth.signOut();
    this.currentUser = null;
    this.syncState = 'offline';
    this.notifyAuthListeners();
    this.notifySyncListeners();
  }

  /**
   * Export / Import utilities
   */
  public exportSaveFile(data: BistroSaveData): void {
    const timestampStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `bistro-town-save-${timestampStr}.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public async importSaveFile(file: File): Promise<BistroSaveData> {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data || typeof data.gridSize !== 'number' || typeof data.coins !== 'number') {
      throw new Error('Invalid Bistro Town save file format.');
    }

    data.timestamp = Date.now();
    await this.queueSave(data, true);
    return data;
  }

  /**
   * Event subscriptions
   */
  public onAuth(listener: (user: BistroUser | null) => void): () => void {
    this.authListeners.push(listener);
    listener(this.currentUser);
    return () => {
      this.authListeners = this.authListeners.filter(l => l !== listener);
    };
  }

  public onSync(listener: (info: SyncStatusInfo) => void): () => void {
    this.syncListeners.push(listener);
    listener(this.getSyncStatus());
    return () => {
      this.syncListeners = this.syncListeners.filter(l => l !== listener);
    };
  }

  private notifyAuthListeners() {
    this.authListeners.forEach(cb => {
      try { cb(this.currentUser); } catch (e) { console.error(e); }
    });
  }

  private notifySyncListeners(customInfo?: SyncStatusInfo) {
    const info = customInfo || this.getSyncStatus();
    this.syncListeners.forEach(cb => {
      try { cb(info); } catch (e) { console.error(e); }
    });
  }
}
