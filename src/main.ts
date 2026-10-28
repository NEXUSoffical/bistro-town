import { BistroEngine } from './BistroEngine';
import { FurnitureItem } from './types';
import { BistroCloudSave } from './BistroCloudSave';

// Cozy web audio synthesis
class BistroAudio {
  private ctx: AudioContext | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playCoinSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
    osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playOrderSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.07); // E5
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playServeSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.28);
  }

  playSizzleSound() {
    if (!this.ctx) return;
    // White noise puff for frying sizzle
    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  playDecorSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880.00, this.ctx.currentTime + 0.08); // A5
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playTriumphSound() {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0.14, this.ctx!.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + i * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + i * 0.1);
      osc.stop(this.ctx!.currentTime + i * 0.1 + 0.35);
    });
  }

  playDoorBell() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime); // E6
    osc.frequency.setValueAtTime(1046.50, this.ctx.currentTime + 0.12); // C6
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playPageFlipSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.14);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.14);
  }

  playRecipeUpgradeSound() {
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.13, this.ctx!.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.08 + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + i * 0.08);
      osc.stop(this.ctx!.currentTime + i * 0.08 + 0.28);
    });
  }

  playIngredientSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime); // E5
    osc.frequency.setValueAtTime(880.00, this.ctx.currentTime + 0.08); // A5
    osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.16); // E6
    gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playTradeSound() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }
}

const audio = new BistroAudio();

window.addEventListener('DOMContentLoaded', () => {
  // Strip any old saved starter bundle ingredients from localStorage
  try {
    const raw = localStorage.getItem('bistro_town_grind_save');
    if (raw) {
      const parsed = JSON.parse(raw);
      parsed.pantry = [];
      localStorage.setItem('bistro_town_grind_save', JSON.stringify(parsed));
    }
  } catch (e) {}

  const canvas = document.getElementById('bistroCanvas') as HTMLCanvasElement;
  const engine = new BistroEngine(canvas);
  engine.pantry.clear();
  engine.saveGameState();

  const coinsDisplay = document.getElementById('coinsVal')!;
  const ratingDisplay = document.getElementById('ratingVal');
  const starsFill = document.getElementById('starsFill');
  const levelDisplay = document.getElementById('levelVal')!;
  const xpDisplay = document.getElementById('xpVal')!;
  const nextXpDisplay = document.getElementById('nextXpVal')!;
  const cashDisplay = document.getElementById('cashVal')!;
  const storeModalCashDisplay = document.getElementById('storeModalCashVal')!;
  const btnOpenCashStore = document.getElementById('btnOpenCashStore')!;
  const cashStoreModalBackdrop = document.getElementById('cashStoreModalBackdrop')!;
  const btnCloseCashStoreModal = document.getElementById('btnCloseCashStoreModal')!;
  const btnExpandBistro = document.getElementById('btnExpandBistro') as HTMLButtonElement;

  // Rating & Review Modal
  const btnRatingReview = document.getElementById('btnRatingReview');
  const ratingModalBackdrop = document.getElementById('ratingModalBackdrop');
  const btnCloseRatingModal = document.getElementById('btnCloseRatingModal');
  const modalRatingVal = document.getElementById('modalRatingVal');
  const modalStarsTrack = document.getElementById('modalStarsTrack');

  // Cookbook elements
  const btnMenuBook = document.getElementById('btnMenuBook');
  const cookbookModalBackdrop = document.getElementById('cookbookModalBackdrop');
  const btnCloseCookbookModal = document.getElementById('btnCloseCookbookModal');
  const activeMenuCountBadge = document.getElementById('activeMenuCountBadge');
  const cookbookActiveCountText = document.getElementById('cookbookActiveCountText');
  const cookbookTotalServingsText = document.getElementById('cookbookTotalServingsText');
  const recipeCardsGrid = document.getElementById('recipeCardsGrid');

  let activeRecipeCat = 'all';
  let renderCookbook: () => void = () => {};

  const updateRatingUI = (rating: number) => {
    if (ratingDisplay) {
      ratingDisplay.innerText = rating.toFixed(1);
    }
    if (starsFill) {
      const pct = Math.min(100, Math.max(0, (rating / 5.0) * 100));
      starsFill.style.width = `${pct}%`;
    }
    if (modalRatingVal) {
      modalRatingVal.innerText = rating.toFixed(1);
    }
    if (modalStarsTrack) {
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (rating >= i - 0.2) {
          starsHtml += `<span style="color: #ffd166;">★</span>`;
        } else if (rating >= i - 0.7) {
          starsHtml += `<span style="color: #ffd166; opacity: 0.7;">★</span>`;
        } else {
          starsHtml += `<span style="color: rgba(255,255,255,0.22);">★</span>`;
        }
      }
      modalStarsTrack.innerHTML = starsHtml;
    }

    // Built Prestige Breakdown
    const prestige = engine.calculatePrestige();
    const modalMaxPotentialVal = document.getElementById('modalMaxPotentialVal');
    const prestigeExpansionVal = document.getElementById('prestigeExpansionVal');
    const prestigeSeatingVal = document.getElementById('prestigeSeatingVal');
    const prestigeDecorVal = document.getElementById('prestigeDecorVal');
    const prestigeWallVal = document.getElementById('prestigeWallVal');
    const prestigeCulinaryVal = document.getElementById('prestigeCulinaryVal');
    const prestigeDiversityVal = document.getElementById('prestigeDiversityVal');

    if (modalMaxPotentialVal) {
      modalMaxPotentialVal.innerText = prestige.maxRating.toFixed(1);
    }
    if (prestigeExpansionVal) {
      prestigeExpansionVal.innerText = `+${prestige.expansionScore.toFixed(2)} ⭐ (${engine.gridSize}x${engine.gridSize})`;
    }
    if (prestigeSeatingVal) {
      prestigeSeatingVal.innerText = `+${prestige.seatingScore.toFixed(2)} ⭐ (${prestige.tableSetsCount} Sets)`;
    }
    if (prestigeDecorVal) {
      prestigeDecorVal.innerText = `+${prestige.decorScore.toFixed(2)} ⭐ (${prestige.decorCount} Items)`;
    }
    if (prestigeWallVal) {
      prestigeWallVal.innerText = `+${prestige.wallFloorScore.toFixed(2)} ⭐`;
    }
    if (prestigeCulinaryVal) {
      prestigeCulinaryVal.innerText = `+${prestige.culinaryScore.toFixed(2)} ⭐ (${prestige.recipeLevelsSum} Upgrades)`;
    }
    if (prestigeDiversityVal) {
      prestigeDiversityVal.innerText = `+${prestige.diversityScore.toFixed(2)} ⭐`;
    }
  };

  if (btnRatingReview && ratingModalBackdrop) {
    btnRatingReview.addEventListener('click', () => {
      audio.init();
      audio.playDecorSound();
      updateRatingUI(engine.rating);
      ratingModalBackdrop.style.display = 'flex';
    });
  }

  if (btnCloseRatingModal && ratingModalBackdrop) {
    btnCloseRatingModal.addEventListener('click', () => {
      ratingModalBackdrop.style.display = 'none';
    });
    ratingModalBackdrop.addEventListener('click', (e) => {
      if (e.target === ratingModalBackdrop) {
        ratingModalBackdrop.style.display = 'none';
      }
    });
  }

  // Build mode controls & toolbar elements
  const buildBtn = document.getElementById('btnBuild')!;
  const buildCatalog = document.getElementById('buildCatalog')!;
  const buildToolsGroup = document.getElementById('buildToolsGroup')!;
  const btnToolMove = document.getElementById('btnToolMove')!;
  const btnToolRotate = document.getElementById('btnToolRotate')!;
  const btnToolRemove = document.getElementById('btnToolRemove')!;
  const catalogList = document.getElementById('catalogList')!;
  const inventoryList = document.getElementById('inventoryList')!;

  const toastContainer = document.getElementById('toastContainer')!;

  const showToast = (msg: string) => {
    const toast = document.createElement('div');
    toast.className = 'bistro-toast';
    toast.innerText = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  const updateExpansionUI = () => {
    levelDisplay.innerText = engine.level.toString();
    xpDisplay.innerText = engine.xp.toString();
    nextXpDisplay.innerText = engine.nextLevelXp.toString();
    coinsDisplay.innerText = engine.coins.toString();
    if (engine.coins < 0) {
      coinsDisplay.parentElement?.classList.add('debt');
      coinsDisplay.parentElement?.setAttribute('title', `In Debt: ${engine.coins} 🪙 (Serve diners to repay debt)`);
    } else {
      coinsDisplay.parentElement?.classList.remove('debt');
      coinsDisplay.parentElement?.setAttribute('title', `Coins: ${engine.coins} 🪙`);
    }
    if (cashDisplay) cashDisplay.innerText = engine.cash.toString();
    if (storeModalCashDisplay) storeModalCashDisplay.innerText = engine.cash.toString();
    updateRatingUI(engine.rating);
    if (activeMenuCountBadge) activeMenuCountBadge.innerText = engine.getActiveRecipes().length.toString();

    const nextTier = engine.getNextExpansion();
    if (!nextTier) {
      btnExpandBistro.innerHTML = '🏆 <b>Max Restaurant Size</b>';
      btnExpandBistro.classList.remove('ready');
      btnExpandBistro.classList.add('locked');
      return;
    }

    const check = engine.canExpand();
    if (check.can) {
      btnExpandBistro.innerHTML = `✨ <b>Expand</b> <span class="expand-badge">${nextTier.cost.toLocaleString()} 🪙</span>`;
      btnExpandBistro.classList.remove('locked');
      btnExpandBistro.classList.add('ready');
    } else {
      btnExpandBistro.innerHTML = `🔒 <b>Expand</b> <span class="expand-badge">Lv. ${nextTier.minLevel} · ${nextTier.cost.toLocaleString()} 🪙</span>`;
      btnExpandBistro.classList.remove('ready');
      btnExpandBistro.classList.add('locked');
    }
  };

  btnExpandBistro.addEventListener('click', () => {
    const res = engine.expandRestaurant();
    if (res.success) {
      audio.init();
      audio.playTriumphSound();
      showToast(res.message);
      updateExpansionUI();
    } else {
      showToast(`⚠️ ${res.message}`);
    }
  });

  // Sound and Progression Callbacks
  engine.onCoinsEarned = (amount: number) => {
    updateExpansionUI();
    if (amount > 0) {
      audio.init();
      audio.playCoinSound();
      showToast(`+${amount} Coins! 🪙`);
    }
  };

  engine.onTipCollected = (amount: number) => {
    updateExpansionUI();
    audio.init();
    audio.playCoinSound();
    showToast(`🪙 Table Tip Collected: +${amount} Coins!`);
  };

  engine.onCashChanged = (val: number) => {
    if (cashDisplay) cashDisplay.innerText = val.toString();
    if (storeModalCashDisplay) storeModalCashDisplay.innerText = val.toString();
  };

  engine.onXpGained = () => {
    updateExpansionUI();
  };

  engine.onLevelUp = (level: number, bonus: number) => {
    audio.init();
    audio.playTriumphSound();
    showToast(`🎉 LEVEL UP! Level ${level} Reached! +${bonus} Coins Bonus! 🏆`);
    updateExpansionUI();
    renderCookbook();
  };

  engine.onRestaurantExpanded = () => {
    updateExpansionUI();
  };

  engine.onRatingChange = (rating: number) => {
    updateRatingUI(rating);
  };

  engine.onRecipesUpdated = () => {
    updateExpansionUI();
    renderCookbook();
  };

  engine.onFiveStarReached = () => {
    audio.init();
    audio.playTriumphSound();
    showToast('🏆 CONGRATULATIONS! 5-STAR MICHELIN RATING ACHIEVED! 🌟');
  };

  engine.onOrderSound = () => {
    audio.init();
    audio.playOrderSound();
    showToast(`📝 Waiter took order! Sent to Chef.`);
  };

  engine.onSizzleSound = () => {
    audio.init();
    audio.playSizzleSound();
    showToast(`🍳 Dish cooked! Ready on stove.`);
  };

  engine.onServeSound = () => {
    audio.init();
    audio.playServeSound();
    showToast(`🍽️ Dish served to guest!`);
  };

  engine.onCustomerEnter = () => {
    audio.init();
    audio.playDoorBell();
  };

  // Initial HUD update
  updateExpansionUI();

  // Build mode toggle
  buildBtn.addEventListener('click', () => {
    engine.isBuildMode = !engine.isBuildMode;
    buildBtn.classList.toggle('active', engine.isBuildMode);
    buildCatalog.style.display = engine.isBuildMode ? 'flex' : 'none';
    buildToolsGroup.style.display = engine.isBuildMode ? 'flex' : 'none';
    
    if (!engine.isBuildMode) {
      engine.selectedTool = null;
      engine.selectedPlacedItem = null;
      engine.activeBuildTool = null;
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.catalog-item').forEach(el => el.classList.remove('selected'));
    }
  });

  const setActiveTool = (tool: 'move' | 'rotate' | 'remove' | null, btn: HTMLElement | null) => {
    // If clicking same active tool, turn it off
    if (engine.activeBuildTool === tool) {
      engine.activeBuildTool = null;
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      return;
    }

    engine.activeBuildTool = tool;
    engine.selectedTool = null;
    document.querySelectorAll('.catalog-item').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));

    if (btn && tool) {
      btn.classList.add('active');
    }
  };

  btnToolMove.addEventListener('click', () => {
    setActiveTool('move', btnToolMove);
    showToast('✋ Move Tool active: Click any item to pick it up!');
  });

  btnToolRotate.addEventListener('click', () => {
    setActiveTool('rotate', btnToolRotate);
    showToast('🔄 Rotate Tool active: Click any item to rotate it!');
  });

  btnToolRemove.addEventListener('click', () => {
    setActiveTool('remove', btnToolRemove);
    showToast('📦 Remove Tool active: Click any item or wall window to remove!');
  });

  engine.onItemRemoved = (name) => {
    showToast(`📦 Stashed ${name} into Inventory!`);
  };

  engine.onItemRotated = (name) => {
    showToast(`🔄 Rotated ${name}!`);
  };

  engine.onWallpaperApplied = (name) => {
    if (name.startsWith('insufficient_cash:')) {
      const itemName = name.replace('insufficient_cash:', '');
      showToast(`⚠️ Not enough Bistro Cash for ${itemName}! Click [+] next to 💵 Cash to get more!`);
      if (cashStoreModalBackdrop) cashStoreModalBackdrop.style.display = 'flex';
      return;
    }
    if (name.startsWith('insufficient_coins:')) {
      const itemName = name.replace('insufficient_coins:', '');
      showToast(`⚠️ Not enough coins for ${itemName}! Serve diners to earn more.`);
      return;
    }
    audio.init();
    audio.playDecorSound();
    showToast(`🎨 Decorated wall section with ${name}!`);
    updateExpansionUI();
  };

  engine.onWindowInstalled = (name) => {
    if (name.startsWith('insufficient_coins:')) {
      const itemName = name.replace('insufficient_coins:', '');
      showToast(`⚠️ Not enough coins for ${itemName}! Serve diners to earn more.`);
      return;
    }
    if (name === 'no_window_here') {
      showToast('ℹ️ No window on this wall section to remove!');
      return;
    }
    audio.init();
    audio.playDecorSound();
    showToast(`🪟 Installed ${name} on wall section!`);
    updateExpansionUI();
  };

  engine.onDoorInstalled = (name) => {
    if (name.startsWith('insufficient_coins:')) {
      const itemName = name.replace('insufficient_coins:', '');
      showToast(`⚠️ Not enough coins for ${itemName}! Serve diners to earn more.`);
      return;
    }
    if (name === 'click_wall_to_install') {
      showToast('ℹ️ Doors must be attached to the restaurant walls! Click any wall section.');
      return;
    }
    if (name === 'no_item_on_wall') {
      showToast('ℹ️ No door or window on this wall section to remove!');
      return;
    }
    audio.init();
    audio.playDoorBell();
    showToast(`🚪 Installed ${name} on wall! Diners will enter here.`);
    updateExpansionUI();
  };

  // Category filtering & tab logic
  let activeCategory = 'all';
  const invTabBtn = document.getElementById('invTabBtn')!;
  const invCountText = document.getElementById('invCountText')!;

  const catalogItems: (FurnitureItem & { category: 'stove' | 'table' | 'chair' | 'decor' | 'floor' | 'wall' | 'window' | 'door' })[] = [
    // VIP Cash Luxury Items (Exclusive Real-Money Store Items)
    { id: 'cat_royal_range', name: 'Golden Royal Range', type: 'stove', category: 'stove', price: 0, cashPrice: 15, currency: 'cash', color: '#ffd700', imageSrc: '/assets/furniture/stove.png', isWalkable: false },
    { id: 'cat_cyber_cooker', name: 'Cyber Induction Oven', type: 'stove', category: 'stove', price: 0, cashPrice: 20, currency: 'cash', color: '#06d6a0', imageSrc: '/assets/furniture/pizza_oven.png', isWalkable: false },
    { id: 'cat_marble_vip_table', name: 'Imperial Gold Table', type: 'table', category: 'table', price: 0, cashPrice: 8, currency: 'cash', color: '#d4af37', imageSrc: '/assets/furniture/round_table.png', isWalkable: false },
    { id: 'cat_neon_table', name: 'Cyberpunk Neon Table', type: 'table', category: 'table', price: 0, cashPrice: 6, currency: 'cash', color: '#7209b7', imageSrc: '/assets/furniture/table.png', isWalkable: false },
    { id: 'cat_royal_throne', name: 'Royal Velvet Throne', type: 'chair', category: 'chair', price: 0, cashPrice: 5, currency: 'cash', color: '#9d0208', imageSrc: '/assets/furniture/chair.png', isWalkable: true },
    { id: 'cat_cyber_chair', name: 'Neon Hover Seat', type: 'chair', category: 'chair', price: 0, cashPrice: 4, currency: 'cash', color: '#3a0ca3', imageSrc: '/assets/furniture/chair_back.png', isWalkable: true },
    { id: 'cat_golden_fountain', name: 'Grand Gold Fountain', type: 'plant', category: 'decor', price: 0, cashPrice: 12, currency: 'cash', color: '#ffd700', isWalkable: false },
    { id: 'cat_neon_sign', name: 'Neon Bistro Sign', type: 'plant', category: 'decor', price: 0, cashPrice: 10, currency: 'cash', color: '#f72585', isWalkable: false },
    { id: 'cat_cherry_bonsai', name: 'Cherry Blossom Bonsai', type: 'plant', category: 'decor', price: 0, cashPrice: 7, currency: 'cash', color: '#ffb703', isWalkable: false },
    { id: 'cat_crystal_chandelier', name: 'Diamond Chandelier', type: 'plant', category: 'decor', price: 0, cashPrice: 14, currency: 'cash', color: '#e0fbfc', isWalkable: false },
    { id: 'wall_celestial', name: 'Celestial Galaxy Wall', type: 'wall', category: 'wall', pattern: 'modern', price: 0, cashPrice: 4, currency: 'cash', color: '#3a0ca3', isWalkable: false },
    { id: 'wall_gold_leaf', name: '24K Gold Leaf Wall', type: 'wall', category: 'wall', pattern: 'damask', price: 0, cashPrice: 5, currency: 'cash', color: '#d4af37', isWalkable: false },
    { id: 'floor_lapis_gold', name: 'Lapis & Gold Tile', type: 'floor', category: 'floor', price: 0, cashPrice: 2, currency: 'cash', color: '#1d3557', isWalkable: true },
    { id: 'floor_emerald_glass', name: 'Emerald Glass Tile', type: 'floor', category: 'floor', price: 0, cashPrice: 2, currency: 'cash', color: '#06d6a0', isWalkable: true },

    // Standard Coin Stoves
    { id: 'cat_stove', name: 'Gas Stove', type: 'stove', category: 'stove', price: 120, imageSrc: '/assets/furniture/stove.png', color: '#264653', isWalkable: false },
    { id: 'cat_pizza_oven', name: 'Pizza Oven', type: 'stove', category: 'stove', price: 250, imageSrc: '/assets/furniture/pizza_oven.png', color: '#8b4513', isWalkable: false },
    
    // Tables
    { id: 'cat_table', name: 'Mahogany Table', type: 'table', category: 'table', price: 40, imageSrc: '/assets/furniture/table.png', color: '#8b5a2b', isWalkable: false },
    { id: 'cat_round_table', name: 'Round Bistro Table', type: 'table', category: 'table', price: 75, imageSrc: '/assets/furniture/round_table.png', color: '#5c3a21', isWalkable: false },

    // Chairs
    { id: 'cat_chair', name: 'Ruby Chair (Front)', type: 'chair', category: 'chair', price: 20, imageSrc: '/assets/furniture/chair.png', color: '#e63946', isWalkable: true },
    { id: 'cat_chair_back', name: 'Ruby Chair (Back)', type: 'chair', category: 'chair', price: 20, imageSrc: '/assets/furniture/chair_back.png', color: '#e63946', isWalkable: true },

    // Doors (Restaurant City architectural entrances)
    { id: 'door_french', name: 'Classic French Door', type: 'door', category: 'door', pattern: 'french', price: 65, color: '#6b4c35', isWalkable: true },
    { id: 'door_oak', name: 'Rustic Oak Arch Door', type: 'door', category: 'door', pattern: 'oak', price: 90, color: '#8b5a2b', isWalkable: true },
    { id: 'door_glass', name: 'Modern Loft Glass Door', type: 'door', category: 'door', pattern: 'glass', price: 120, color: '#1e293b', isWalkable: true },
    { id: 'door_cafe', name: 'Pastel Cafe Awning Door', type: 'door', category: 'door', pattern: 'cafe', price: 80, color: '#e63946', isWalkable: true },
    { id: 'door_royal', name: 'Imperial Golden Door', type: 'door', category: 'door', pattern: 'royal', price: 240, color: '#d4af37', isWalkable: true },

    // Windows (Restaurant City architectural windows)
    { id: 'win_arched', name: 'Arched Bistro Window', type: 'window', category: 'window', pattern: 'arched', price: 45, color: '#caf0f8', isWalkable: false },
    { id: 'win_bay', name: 'Grand Bay Window', type: 'window', category: 'window', pattern: 'bay', price: 80, color: '#3e1f08', isWalkable: false },
    { id: 'win_stained', name: 'Rose Stained Glass', type: 'window', category: 'window', pattern: 'stained', price: 125, color: '#ef233c', isWalkable: false },
    { id: 'win_modern', name: 'Modern Loft Window', type: 'window', category: 'window', pattern: 'modern', price: 95, color: '#18181b', isWalkable: false },
    { id: 'win_shutter', name: 'Rustic Shutter Window', type: 'window', category: 'window', pattern: 'shutter', price: 65, color: '#2563eb', isWalkable: false },

    // Wallpapers (Restaurant City authentic styles)
    { id: 'wall_sage', name: 'Sage Wainscot', type: 'wall', category: 'wall', pattern: 'sage', price: 25, color: '#588157', isWalkable: false },
    { id: 'wall_stripes', name: 'Parisian Stripes', type: 'wall', category: 'wall', pattern: 'stripes', price: 45, color: '#780000', isWalkable: false },
    { id: 'wall_floral', name: 'Vintage Rose', type: 'wall', category: 'wall', pattern: 'floral', price: 50, color: '#d8f3dc', isWalkable: false },
    { id: 'wall_yellow', name: 'Sunny Beadboard', type: 'wall', category: 'wall', pattern: 'yellow', price: 35, color: '#fde047', isWalkable: false },
    { id: 'wall_brick', name: 'Exposed Brick', type: 'wall', category: 'wall', pattern: 'brick', price: 60, color: '#9a3412', isWalkable: false },
    { id: 'wall_damask', name: 'Royal Damask', type: 'wall', category: 'wall', pattern: 'damask', price: 85, color: '#1e293b', isWalkable: false },
    { id: 'wall_modern', name: 'Obsidian Slate', type: 'wall', category: 'wall', pattern: 'modern', price: 110, color: '#27272a', isWalkable: false },

    // Decor
    { id: 'cat_plant', name: 'Palm Plant', type: 'plant', category: 'decor', price: 35, color: '#2a9d8f', isWalkable: false },

    // Flooring
    { id: 'cat_floor_tile', name: 'Marble Tile', type: 'floor', category: 'floor', price: 5, color: '#e0e1dd', isWalkable: true },
    { id: 'cat_floor_wood', name: 'Wood Plank', type: 'floor', category: 'floor', price: 5, color: '#deb887', isWalkable: true }
  ];

  const renderCatalog = () => {
    catalogList.innerHTML = '';
    const filtered = activeCategory === 'all' 
      ? catalogItems 
      : (activeCategory === 'cash' 
          ? catalogItems.filter(item => item.currency === 'cash')
          : catalogItems.filter(item => item.category === activeCategory));

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'catalog-item';

      let previewHtml = '';
      if (item.imageSrc) {
        previewHtml = `<img src="${item.imageSrc}" style="width: 42px; height: 42px; object-fit: contain; margin-bottom: 4px; border-radius: 6px;" />`;
      } else if (item.type === 'door') {
        let doorBg = '';
        if (item.pattern === 'glass') {
          doorBg = `background: linear-gradient(135deg, rgba(125, 211, 252, 0.7), rgba(2, 132, 199, 0.7)); border: 2.5px solid #0f172a; box-shadow: inset 0 0 0 1px #f59e0b;`;
        } else if (item.pattern === 'oak') {
          doorBg = `background: linear-gradient(180deg, #854d0e, #451a03); border: 2.5px solid #3e1f08; border-radius: 12px 12px 2px 2px;`;
        } else if (item.pattern === 'royal') {
          doorBg = `background: linear-gradient(180deg, #1e3a8a, #0f172a); border: 2.5px solid #fbbf24; box-shadow: inset 0 0 4px #fbbf24;`;
        } else if (item.pattern === 'cafe') {
          doorBg = `background: linear-gradient(180deg, #ef233c 30%, #ffffff 30%, #ffffff 35%, #5c3a21 35%); border: 2px solid #5c3a21;`;
        } else {
          doorBg = `background: linear-gradient(180deg, #6b4c35, #3e1f08); border: 2.5px solid #2b1d12; border-radius: 8px 8px 2px 2px;`;
        }
        previewHtml = `<div style="width: 36px; height: 44px; ${doorBg} display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 4px; position: relative; box-shadow: 0 3px 6px rgba(0,0,0,0.35);">
          <div style="width: 22px; height: 26px; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 4px 4px 1px 1px; background: rgba(255,255,255,0.15);"></div>
          <div style="position: absolute; right: 4px; top: 22px; width: 3px; height: 6px; background: #f59e0b; border-radius: 1px;"></div>
        </div>`;
      } else if (item.type === 'window') {
        let winPreview = '';
        if (item.pattern === 'bay') {
          winPreview = `background: linear-gradient(135deg, #70d6ff, #e0fbfc); border: 2.5px solid #603813; box-shadow: inset 0 0 0 2px #3e1f08, 0 2px 4px rgba(0,0,0,0.3);`;
        } else if (item.pattern === 'stained') {
          winPreview = `background: conic-gradient(#f59e0b 0deg 90deg, #ef233c 90deg 180deg, #2563eb 180deg 270deg, #10b981 270deg 360deg); border: 2.5px solid #334155; border-radius: 10px 10px 3px 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);`;
        } else if (item.pattern === 'modern') {
          winPreview = `background: linear-gradient(180deg, #0284c7, #bae6fd); border: 2px solid #18181b; box-shadow: inset 0 0 0 1px #eab308;`;
        } else if (item.pattern === 'shutter') {
          winPreview = `background: linear-gradient(180deg, #93c5fd, #eff6ff); border: 2px solid #ffffff; box-shadow: -4px 0 0 #2563eb, 4px 0 0 #2563eb, 0 2px 4px rgba(0,0,0,0.3); margin: 0 4px;`;
        } else {
          winPreview = `background: linear-gradient(180deg, #90e0ef, #caf0f8); border: 2.5px solid #bc6c25; border-radius: 10px 10px 3px 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);`;
        }
        previewHtml = `<div style="width: 38px; height: 38px; ${winPreview} display: flex; align-items: center; justify-content: center; margin-bottom: 4px; position: relative;">
          <div style="position: absolute; width: 100%; height: 1.5px; background: rgba(0,0,0,0.3);"></div>
          <div style="position: absolute; height: 100%; width: 1.5px; background: rgba(0,0,0,0.3);"></div>
        </div>`;
      } else if (item.type === 'wall') {
        let bgStyle = `background: ${item.color};`;
        if (item.pattern === 'stripes') {
          bgStyle = `background: repeating-linear-gradient(90deg, #780000, #780000 4px, #fdf0d5 4px, #fdf0d5 8px);`;
        } else if (item.pattern === 'brick') {
          bgStyle = `background: repeating-linear-gradient(0deg, #9a3412, #9a3412 5px, #431407 5px, #431407 6px);`;
        } else if (item.pattern === 'damask') {
          bgStyle = `background: radial-gradient(circle, #f59e0b 2px, transparent 2px), #0f172a; background-size: 8px 8px;`;
        } else if (item.pattern === 'floral') {
          bgStyle = `background: radial-gradient(circle, #f43f5e 2.5px, transparent 2.5px), #d8f3dc; background-size: 10px 10px;`;
        } else if (item.pattern === 'yellow') {
          bgStyle = `background: repeating-linear-gradient(90deg, #fde047, #fde047 5px, rgba(255,255,255,0.7) 5px, rgba(255,255,255,0.7) 6px);`;
        } else if (item.pattern === 'modern') {
          bgStyle = `background: linear-gradient(180deg, #27272a 50%, #eab308 50%, #eab308 55%, #18181b 55%);`;
        } else {
          bgStyle = `background: linear-gradient(135deg, #588157, #3a5a40);`;
        }
        previewHtml = `<div style="width: 40px; height: 40px; ${bgStyle} border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.25); box-shadow: inset 0 0 4px rgba(0,0,0,0.3);"></div>`;
      } else {
        previewHtml = `<div style="width: 36px; height: 36px; background: ${item.color}; border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.2);"></div>`;
      }

      const isCash = item.currency === 'cash';
      const priceBadge = isCash 
        ? `<div class="item-price cash">💵 ${item.cashPrice} Cash</div>`
        : `<div class="item-price">🪙 ${item.price}</div>`;

      card.innerHTML = `
        ${previewHtml}
        <div class="item-title">${item.name}</div>
        ${priceBadge}
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('.catalog-item').forEach(el => el.classList.remove('selected'));
        card.classList.add('selected');
        engine.selectedTool = item;
        engine.activeBuildTool = 'place';
        if (item.type === 'window') {
          showToast(`Selected: ${item.name}. Click any wall section to install!`);
        } else if (item.type === 'wall') {
          showToast(`Selected: ${item.name}. Click any wall section to decorate!`);
        } else if (item.type === 'door') {
          showToast(`Selected: ${item.name}. Click any wall section to install door!`);
        } else {
          showToast(`Selected: ${item.name}. Click floor to place!`);
        }
      });
      catalogList.appendChild(card);
    });
  };

  // Setup Category Tab click events
  document.querySelectorAll('.cat-tab[data-cat]').forEach(tabEl => {
    tabEl.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab[data-cat], #invTabBtn').forEach(b => b.classList.remove('active'));
      tabEl.classList.add('active');
      activeCategory = (tabEl as HTMLElement).dataset.cat || 'all';
      catalogList.style.display = 'flex';
      inventoryList.style.display = 'none';
      renderCatalog();
    });
  });

  // Toggle Inventory Tab
  invTabBtn.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab[data-cat], #invTabBtn').forEach(b => b.classList.remove('active'));
    invTabBtn.classList.add('active');
    catalogList.style.display = 'none';
    inventoryList.style.display = 'flex';
  });

  // Inventory Update Callback
  engine.onInventoryUpdate = (invItems) => {
    const totalCount = invItems.reduce((acc, curr) => acc + curr.quantity, 0);
    invCountText.innerText = totalCount.toString();
    inventoryList.innerHTML = '';

    if (invItems.length === 0) {
      inventoryList.innerHTML = `<div style="color: rgba(255,255,255,0.5); font-size: 0.9rem; padding: 12px;">Inventory is empty. Use the Remove tool to store items here!</div>`;
      return;
    }

    invItems.forEach(({ item, quantity }) => {
      const card = document.createElement('div');
      card.className = 'catalog-item';
      card.style.minWidth = '110px';
      card.style.padding = '10px 8px';

      const unitSellPrice = engine.getItemSellPrice(item);
      const totalSellPrice = unitSellPrice * quantity;

      let previewHtml = '';
      if (item.imageSrc) {
        previewHtml = `<img src="${item.imageSrc}" style="width: 42px; height: 42px; object-fit: contain; margin-bottom: 4px; border-radius: 6px;" />`;
      } else if (item.type === 'door') {
        let doorBg = '';
        if (item.pattern === 'glass') {
          doorBg = `background: linear-gradient(135deg, rgba(125, 211, 252, 0.7), rgba(2, 132, 199, 0.7)); border: 2.5px solid #0f172a; box-shadow: inset 0 0 0 1px #f59e0b;`;
        } else if (item.pattern === 'oak') {
          doorBg = `background: linear-gradient(180deg, #854d0e, #451a03); border: 2.5px solid #3e1f08; border-radius: 12px 12px 2px 2px;`;
        } else if (item.pattern === 'royal') {
          doorBg = `background: linear-gradient(180deg, #1e3a8a, #0f172a); border: 2.5px solid #fbbf24; box-shadow: inset 0 0 4px #fbbf24;`;
        } else if (item.pattern === 'cafe') {
          doorBg = `background: linear-gradient(180deg, #ef233c 30%, #ffffff 30%, #ffffff 35%, #5c3a21 35%); border: 2px solid #5c3a21;`;
        } else {
          doorBg = `background: linear-gradient(180deg, #6b4c35, #3e1f08); border: 2.5px solid #2b1d12; border-radius: 8px 8px 2px 2px;`;
        }
        previewHtml = `<div style="width: 36px; height: 44px; ${doorBg} display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 4px; position: relative; box-shadow: 0 3px 6px rgba(0,0,0,0.35);">
          <div style="width: 22px; height: 26px; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 4px 4px 1px 1px; background: rgba(255,255,255,0.15);"></div>
          <div style="position: absolute; right: 4px; top: 22px; width: 3px; height: 6px; background: #f59e0b; border-radius: 1px;"></div>
        </div>`;
      } else if (item.type === 'window') {
        let winPreview = '';
        if (item.pattern === 'bay') {
          winPreview = `background: linear-gradient(135deg, #70d6ff, #e0fbfc); border: 2.5px solid #603813; box-shadow: inset 0 0 0 2px #3e1f08, 0 2px 4px rgba(0,0,0,0.3);`;
        } else if (item.pattern === 'stained') {
          winPreview = `background: conic-gradient(#f59e0b 0deg 90deg, #ef233c 90deg 180deg, #2563eb 180deg 270deg, #10b981 270deg 360deg); border: 2.5px solid #334155; border-radius: 10px 10px 3px 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);`;
        } else if (item.pattern === 'modern') {
          winPreview = `background: linear-gradient(180deg, #0284c7, #bae6fd); border: 2px solid #18181b; box-shadow: inset 0 0 0 1px #eab308;`;
        } else if (item.pattern === 'shutter') {
          winPreview = `background: linear-gradient(180deg, #93c5fd, #eff6ff); border: 2px solid #ffffff; box-shadow: -4px 0 0 #2563eb, 4px 0 0 #2563eb, 0 2px 4px rgba(0,0,0,0.3); margin: 0 4px;`;
        } else {
          winPreview = `background: linear-gradient(180deg, #90e0ef, #caf0f8); border: 2.5px solid #bc6c25; border-radius: 10px 10px 3px 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);`;
        }
        previewHtml = `<div style="width: 38px; height: 38px; ${winPreview} display: flex; align-items: center; justify-content: center; margin-bottom: 4px; position: relative;">
          <div style="position: absolute; width: 100%; height: 1.5px; background: rgba(0,0,0,0.3);"></div>
          <div style="position: absolute; height: 100%; width: 1.5px; background: rgba(0,0,0,0.3);"></div>
        </div>`;
      } else {
        previewHtml = `<div style="width: 36px; height: 36px; background: ${item.color}; border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.2);"></div>`;
      }

      card.innerHTML = `
        ${previewHtml}
        <div class="item-title" style="text-align: center; font-size: 0.8rem; margin-bottom: 2px;">${item.name}</div>
        <div style="font-size: 0.75rem; color: #64dfdf; font-weight: 700; margin-bottom: 6px;">Qty: ${quantity}</div>
        <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
          <button class="btn-inv-place" style="width: 100%; padding: 4px 6px; font-size: 0.75rem; background: linear-gradient(180deg, #3a86ff, #00509d); border: 1px solid #64dfdf; border-radius: 6px; color: white; cursor: pointer; font-weight: 700; font-family: inherit;">📍 Place</button>
          <div style="display: flex; gap: 4px; width: 100%;">
            <button class="btn-inv-sell" title="Sell 1 for ${unitSellPrice} coins" style="flex: 1; padding: 4px 2px; font-size: 0.72rem; background: linear-gradient(180deg, #10b981, #059669); border: 1px solid #34d399; border-radius: 6px; color: white; cursor: pointer; font-weight: 700; font-family: inherit; white-space: nowrap;">🪙 +${unitSellPrice}</button>
            ${quantity > 1 ? `<button class="btn-inv-sell-all" title="Sell all ${quantity} for ${totalSellPrice} coins" style="flex: 1; padding: 4px 2px; font-size: 0.72rem; background: linear-gradient(180deg, #f59e0b, #d97706); border: 1px solid #fbbf24; border-radius: 6px; color: white; cursor: pointer; font-weight: 700; font-family: inherit; white-space: nowrap;">All +${totalSellPrice}</button>` : ''}
          </div>
        </div>
      `;

      const selectForPlacement = () => {
        document.querySelectorAll('.catalog-item').forEach(el => el.classList.remove('selected'));
        card.classList.add('selected');
        // Place from inventory (free)
        engine.selectedTool = { ...item, isFromInventory: true };
        engine.activeBuildTool = 'place';
        if (item.type === 'window' || item.type === 'door') {
          showToast(`Ready to install ${item.name} from Inventory! Click any wall section.`);
        } else if (item.type === 'wall') {
          showToast(`Ready to apply ${item.name} from Inventory! Click any wall section.`);
        } else {
          showToast(`Ready to place ${item.name} from Inventory!`);
        }
      };

      card.addEventListener('click', () => {
        selectForPlacement();
      });

      const placeBtn = card.querySelector('.btn-inv-place') as HTMLButtonElement;
      placeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectForPlacement();
      });

      const sellBtn = card.querySelector('.btn-inv-sell') as HTMLButtonElement;
      sellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const res = engine.sellInventoryItem(item.id, 1);
        if (res.success) {
          audio.init();
          audio.playCoinSound();
          showToast(`💰 Sold 1x ${res.soldItem?.name || item.name} for +${res.coinsEarned} 🪙!`);
          updateExpansionUI();
        }
      });

      const sellAllBtn = card.querySelector('.btn-inv-sell-all') as HTMLButtonElement | null;
      if (sellAllBtn) {
        sellAllBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const res = engine.sellInventoryItem(item.id, quantity);
          if (res.success) {
            audio.init();
            audio.playCoinSound();
            showToast(`💰 Sold all ${res.countSold}x ${res.soldItem?.name || item.name} for +${res.coinsEarned} 🪙!`);
            updateExpansionUI();
          }
        });
      }

      inventoryList.appendChild(card);
    });
  };

  // Setup Bottom-Left Zoom Controls
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');

  btnZoomIn?.addEventListener('click', () => {
    engine.zoomIn();
    audio.init();
    audio.playDecorSound();
  });

  btnZoomOut?.addEventListener('click', () => {
    engine.zoomOut();
    audio.init();
    audio.playDecorSound();
  });

  zoomLevelDisplay?.addEventListener('click', () => {
    engine.resetZoom();
    audio.init();
    audio.playDecorSound();
    showToast('Zoom reset to 100%');
  });

  engine.onZoomChange = (zoomVal: number) => {
    if (zoomLevelDisplay) {
      zoomLevelDisplay.innerText = `${Math.round(zoomVal * 100)}%`;
    }
  };

  // Staff & Tactical Shift Payroll Management
  const btnStaff = document.getElementById('btnStaff');
  const staffCountBadge = document.getElementById('staffCountBadge');
  const staffModalBackdrop = document.getElementById('staffModalBackdrop');
  const btnCloseStaffModal = document.getElementById('btnCloseStaffModal');
  const modalStaffCount = document.getElementById('modalStaffCount');
  const modalShiftBill = document.getElementById('modalShiftBill');
  const modalNextPayday = document.getElementById('modalNextPayday');
  const staffListContainer = document.getElementById('staffListContainer');
  const btnHireChef = document.getElementById('btnHireChef');
  const btnHireWaiter = document.getElementById('btnHireWaiter');
  const btnHireCleaner = document.getElementById('btnHireCleaner');

  const updateStaffUI = () => {
    const staffList = engine.getStaffList();
    const totalWage = engine.getTotalShiftWages();
    const secondsRemaining = Math.max(0, Math.ceil(engine.payrollTimer));

    if (staffCountBadge) staffCountBadge.innerText = staffList.length.toString();

    if (modalStaffCount) modalStaffCount.innerText = `${staffList.length} ${staffList.length === 1 ? 'Member' : 'Members'}`;
    if (modalShiftBill) modalShiftBill.innerText = totalWage.toString();
    if (modalNextPayday) modalNextPayday.innerText = `${secondsRemaining}s`;

    if (staffListContainer && staffModalBackdrop && staffModalBackdrop.style.display === 'flex') {
      staffListContainer.innerHTML = '';
      if (staffList.length === 0) {
        staffListContainer.innerHTML = `
          <div style="text-align: center; color: #94a3b8; padding: 22px; font-style: italic; background: rgba(255,255,255,0.03); border-radius: 12px;">
            ⚠️ No active staff! Hire cooks, waiters, or cleaners below to run your restaurant.
          </div>
        `;
        return;
      }

      staffList.forEach(member => {
        const card = document.createElement('div');
        card.className = 'staff-card';
        
        let icon = '🧑‍🍳';
        let roleName = 'Staff Member';
        let desc = 'Helping around the restaurant';
        if (member.role === 'chef') {
          icon = '🍳';
          roleName = 'Line Cook';
          desc = 'Cooks meal tickets at stoves';
        } else if (member.role === 'waiter') {
          icon = '🍽️';
          roleName = 'Floor Waiter';
          desc = 'Takes diner orders & serves meals';
        } else if (member.role === 'cleaner') {
          icon = '🧹';
          roleName = 'Table Cleaner';
          desc = 'Cleans dirty tables (+2% pop)';
        }

        const wage = member.wage || engine.getStaffWage(member.role as any);
        const avatarDisplay = member.avatarSrc
          ? `<img src="${member.avatarSrc}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: contain; transform: scale(1.15) translateY(2px);" />`
          : icon;

        card.innerHTML = `
          <div class="staff-info-left">
            <div class="staff-avatar-badge" style="overflow: hidden; background: rgba(0, 0, 0, 0.3);">${avatarDisplay}</div>
            <div class="staff-details">
              <div class="staff-name">${member.name} <span style="font-weight: 500; font-size: 0.8rem; color: #94a3b8;">(${roleName})</span></div>
              <div class="staff-sub">${desc}</div>
              <div class="staff-wage-badge">Wage: -${wage} 🪙 / 60s</div>
            </div>
          </div>
          <button class="btn-sack" title="Sack this staff member immediately to reduce payroll" data-id="${member.id}">❌ Sack</button>
        `;

        const sackBtn = card.querySelector('.btn-sack') as HTMLButtonElement;
        sackBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const res = engine.sackStaff(member.id);
          if (res.success) {
            audio.init();
            audio.playDecorSound();
            showToast(`👋 Sacked ${member.name}. Shift payroll reduced!`);
            updateExpansionUI();
            updateStaffUI();
          } else {
            showToast(`⚠️ ${res.message}`);
          }
        });

        staffListContainer.appendChild(card);
      });
    }
  };

  const hireStaffRole = (role: 'chef' | 'waiter' | 'cleaner') => {
    audio.init();
    const res = engine.hireStaff(role);
    if (res.success) {
      audio.playCoinSound();
      showToast(`🎉 Hired ${res.staff?.name || role}!`);
      updateExpansionUI();
      updateStaffUI();
    } else {
      showToast(`⚠️ ${res.message}`);
    }
  };

  btnHireChef?.addEventListener('click', () => hireStaffRole('chef'));
  btnHireWaiter?.addEventListener('click', () => hireStaffRole('waiter'));
  btnHireCleaner?.addEventListener('click', () => hireStaffRole('cleaner'));

  btnStaff?.addEventListener('click', () => {
    audio.init();
    audio.playDecorSound();
    if (staffModalBackdrop) {
      staffModalBackdrop.style.display = 'flex';
      updateStaffUI();
    }
  });

  btnCloseStaffModal?.addEventListener('click', () => {
    if (staffModalBackdrop) {
      staffModalBackdrop.style.display = 'none';
    }
  });

  staffModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === staffModalBackdrop) {
      staffModalBackdrop.style.display = 'none';
    }
  });

  staffModalBackdrop?.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: true });

  engine.onStaffUpdated = () => {
    updateStaffUI();
  };

  engine.onPayrollPaid = (amount: number, staffCount: number, isDeficit: boolean) => {
    updateExpansionUI();
    updateStaffUI();
    if (isDeficit) {
      audio.init();
      audio.playDecorSound();
      showToast(`💸 Shift Wages Paid: -${amount} 🪙 to ${staffCount} staff. Balance: ${engine.coins} 🪙 (in debt).`);
    } else {
      audio.init();
      audio.playCoinSound();
      showToast(`💸 Shift Wages Paid: -${amount} 🪙 to ${staffCount} staff.`);
    }
  };

  // Live timer tick for payroll timer in modal
  setInterval(() => {
    const secondsRemaining = Math.max(0, Math.ceil(engine.payrollTimer));
    if (modalNextPayday && staffModalBackdrop && staffModalBackdrop.style.display === 'flex') {
      modalNextPayday.innerText = `${secondsRemaining}s`;
    }
  }, 500);

  // Cash Store & Real Money purchase event listeners
  btnOpenCashStore?.addEventListener('click', () => {
    audio.init();
    audio.playDecorSound();
    if (cashStoreModalBackdrop) {
      updateExpansionUI();
      cashStoreModalBackdrop.style.display = 'flex';
    }
  });

  btnCloseCashStoreModal?.addEventListener('click', () => {
    if (cashStoreModalBackdrop) {
      cashStoreModalBackdrop.style.display = 'none';
    }
  });

  cashStoreModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === cashStoreModalBackdrop) {
      cashStoreModalBackdrop.style.display = 'none';
    }
  });

  document.querySelectorAll('.btn-buy-cash').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cashAmount = parseInt(btn.getAttribute('data-cash') || '50', 10);
      const costStr = btn.getAttribute('data-cost') || '1.99';
      const packName = btn.getAttribute('data-name') || 'Cash Pack';

      audio.init();
      audio.playTriumphSound();
      engine.addCash(cashAmount);
      showToast(`🎉 Payment of $${costStr} successful! Added ${cashAmount} 💵 Bistro Cash (${packName})!`);
      updateExpansionUI();
      setTimeout(() => {
        if (cashStoreModalBackdrop) cashStoreModalBackdrop.style.display = 'none';
      }, 700);
    });
  });

  // Check URL query parameters for payment return (Stripe Checkout)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('payment_status') === 'success') {
    const cashCredited = parseInt(urlParams.get('cash') || '150', 10);
    engine.addCash(cashCredited);
    audio.init();
    audio.playTriumphSound();
    showToast(`🎉 Stripe Checkout complete! Credited ${cashCredited} 💵 Bistro Cash!`);
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Cookbook & Daily Menu Management
  renderCookbook = () => {
    if (!recipeCardsGrid) return;
    recipeCardsGrid.innerHTML = '';

    const activeList = engine.getActiveRecipes();
    const totalServings = engine.recipes.reduce((sum, r) => sum + (r.servingsCount || 0), 0);
    const unlockedList = engine.recipes.filter(r => (r.unlockLevel || 1) <= engine.level);

    if (activeMenuCountBadge) activeMenuCountBadge.innerText = activeList.length.toString();
    if (cookbookActiveCountText) cookbookActiveCountText.innerText = `${activeList.length} / ${unlockedList.length} Dishes on Menu`;
    if (cookbookTotalServingsText) cookbookTotalServingsText.innerText = `${totalServings} Meals Served`;

    // Ensure category tab active styles are synced
    document.querySelectorAll('[data-recipe-cat]').forEach(t => {
      if (t.getAttribute('data-recipe-cat') === activeRecipeCat) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    const filtered = activeRecipeCat === 'all'
      ? engine.recipes
      : engine.recipes.filter(r => r.category === activeRecipeCat);

    filtered.forEach(recipe => {
      const isLocked = engine.level < (recipe.unlockLevel || 1);
      const card = document.createElement('div');
      card.className = `recipe-card ${isLocked ? 'locked' : ''} ${recipe.isActive ? 'active-dish' : ''}`;
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';

      let thumbHtml = '';
      if (recipe.imageSrc) {
        thumbHtml = `<img src="${recipe.imageSrc}" alt="${recipe.name}" />`;
      } else {
        thumbHtml = `<span>${recipe.emoji || '🍽️'}</span>`;
      }

      const cost = engine.getRecipeUpgradeCost(recipe);
      const canAfford = (engine.coins - cost) >= (engine.creditLimit ?? -1000);
      const isMax = recipe.level >= 10;
      const progressPct = Math.min(100, (recipe.level / 10) * 100);
      const reqs = engine.getRequiredIngredients(recipe);
      const allReqsSatisfied = reqs.every(r => r.satisfied);
      const canUpgrade = canAfford && allReqsSatisfied;

      card.innerHTML = `
        <div style="display: flex; gap: 10px; align-items: center;">
          <div class="recipe-img-box">${thumbHtml}</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-weight: 800; font-size: 0.92rem; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${recipe.name}
            </div>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <span class="recipe-level-badge">Lv. ${recipe.level} / 10</span>
              <span style="font-size: 0.72rem; text-transform: uppercase; color: #94a3b8; font-weight: 700;">${recipe.category}</span>
            </div>
            <div class="recipe-progress-bar">
              <div class="recipe-progress-fill" style="width: ${progressPct}%;"></div>
            </div>
          </div>
        </div>

        <div style="font-size: 0.75rem; color: #94a3b8; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 28px;">
          ${recipe.description || 'Delicious gourmet recipe prepared fresh for your hungry diners.'}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.25); padding: 5px 8px; border-radius: 6px; font-size: 0.78rem; font-weight: 700;">
          <span style="color: #ffd166;">🪙 ${recipe.price} coins</span>
          <span style="color: #38bdf8;">⏱️ ${recipe.prepTime}s</span>
          <span style="color: #4ade80;">🍽️ ${recipe.servingsCount || 0}</span>
        </div>

        ${!isLocked && !isMax ? `
          <div class="recipe-reqs-container">
            <div class="recipe-reqs-label">
              <span>Needs (Lv.${recipe.level + 1}):</span>
              <span style="color: ${allReqsSatisfied ? '#34d399' : '#f87171'}; font-weight: 800;">
                ${allReqsSatisfied ? '✓ Ready' : '⚠️ Need Stock'}
              </span>
            </div>
            <div class="recipe-reqs-pills">
              ${reqs.map(r => `
                <span class="recipe-req-pill ${r.satisfied ? 'satisfied' : 'missing'}" title="${r.info.name}: Have ${r.has}, Need ${r.amount}">
                  <span>${r.info.emoji}</span>
                  <span>${r.info.name}</span>
                  <b style="margin-left: 2px;">${r.has}/${r.amount}</b>
                  <span>${r.satisfied ? '✓' : ''}</span>
                </span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${isLocked ? `
          <div style="background: rgba(239, 68, 68, 0.15); border: 1px dashed rgba(239, 68, 68, 0.4); border-radius: 8px; padding: 7px; text-align: center; font-size: 0.78rem; color: #f87171; font-weight: 700; margin-top: auto;">
            🔒 Unlocks at Bistro Lv. ${recipe.unlockLevel}
          </div>
        ` : `
          <div style="display: flex; gap: 6px; margin-top: auto; padding-top: 6px;">
            <button class="btn-toggle-menu ${recipe.isActive ? 'active' : ''}" style="flex: 1;" title="${recipe.isActive ? 'Remove from today\'s menu' : 'Put on today\'s menu'}">
              ${recipe.isActive ? '✓ On Menu' : '+ Add to Menu'}
            </button>
            <button class="btn-upgrade-recipe" style="flex: 1.25;" ${isMax || !canUpgrade ? 'disabled' : ''} title="${isMax ? 'Maximum Level Reached' : !allReqsSatisfied ? 'Need required ingredients! Serve diners and collect tips to find ingredients.' : !canAfford ? 'Debt limit reached' : `Upgrade to Level ${recipe.level + 1}`}">
              ${isMax ? '👑 Max Level' : !allReqsSatisfied ? `🔒 Need Stock (${cost} 🪙)` : `⬆️ Upgrade Lv.${recipe.level + 1} (${cost} 🪙)`}
            </button>
          </div>
        `}
      `;

      if (!isLocked) {
        const toggleBtn = card.querySelector('.btn-toggle-menu');
        toggleBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          audio.init();
          audio.playDecorSound();
          const res = engine.toggleRecipeActive(recipe.id);
          showToast(res.message);
        });

        const upgradeBtn = card.querySelector('.btn-upgrade-recipe') as HTMLButtonElement;
        upgradeBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isMax) return;
          audio.init();
          const res = engine.upgradeRecipe(recipe.id);
          if (res.success) {
            audio.playRecipeUpgradeSound();
            showToast(res.message);
          } else {
            showToast(`⚠️ ${res.message}`);
          }
        });
      }

      recipeCardsGrid.appendChild(card);
    });
  };

  engine.onIngredientCollected = (info) => {
    audio.playIngredientSound();
    renderCookbook();
    showToast(`🎁 Collected +1 ${info.emoji} ${info.name}!`);
  };

  if (btnMenuBook && cookbookModalBackdrop) {
    btnMenuBook.addEventListener('click', () => {
      audio.init();
      audio.playPageFlipSound();
      updateExpansionUI();
      renderCookbook();
      cookbookModalBackdrop.style.display = 'flex';
    });
  }

  if (btnCloseCookbookModal && cookbookModalBackdrop) {
    btnCloseCookbookModal.addEventListener('click', () => {
      cookbookModalBackdrop.style.display = 'none';
    });
    cookbookModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cookbookModalBackdrop) {
        cookbookModalBackdrop.style.display = 'none';
      }
    });
  }

  // Category Tabs inside Cookbook Modal
  document.querySelectorAll('[data-recipe-cat]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-recipe-cat]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRecipeCat = tab.getAttribute('data-recipe-cat') || 'all';
      audio.init();
      audio.playPageFlipSound();
      renderCookbook();
    });
  });

  // Planet Coaster Style Financial Management Modal Controller
  const btnFinance = document.getElementById('btnFinance');
  const financeModalBackdrop = document.getElementById('financeModalBackdrop');
  const btnCloseFinanceModal = document.getElementById('btnCloseFinanceModal');
  const financeContentPane = document.getElementById('financeContentPane');

  let activeFinTab: 'balance' | 'advice' | 'margin' = 'balance';
  let finRange: 'shift' | 'allTime' = 'shift';
  const collapsedFinCats = new Set<string>();

  const fmtCurrency = (val: number, isPosExpense = false): { text: string; cls: string } => {
    if (val === 0) return { text: '$0.00', cls: 'zero' };
    if (isPosExpense) {
      return { text: `-$${val.toFixed(2)}`, cls: 'neg' };
    }
    return { text: `+$${val.toFixed(2)}`, cls: 'pos' };
  };

  const renderFinances = () => {
    if (!financeContentPane) return;
    const record = finRange === 'shift' ? engine.shiftFinances : engine.allTimeFinances;

    // Income totals
    const foodSales = record.starterSales + record.mainSales + record.dessertSales + record.drinkSales;
    const otherIncome = record.tableTips + record.bonuses + record.itemSales;
    const totalRevenue = foodSales + otherIncome;

    // Expense totals
    const laborCosts = record.chefWages + record.waiterWages + record.cleanerWages + record.wageDeficits;
    const constructionCosts = record.furnitureTables + record.furnitureChairs + record.kitchenStoves + record.decorWallpapers + record.expansions + record.staffHiring;
    const upgradeCosts = record.dishUpgrades;
    const totalExpenses = laborCosts + constructionCosts + upgradeCosts;

    // Bottom-line profit & margins
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '0.0';

    if (activeFinTab === 'balance') {
      const isFoodCollapsed = collapsedFinCats.has('food');
      const isOtherCollapsed = collapsedFinCats.has('other');
      const isLaborCollapsed = collapsedFinCats.has('labor');
      const isBuildCollapsed = collapsedFinCats.has('build');
      const isUpgradeCollapsed = collapsedFinCats.has('upgrades');

      financeContentPane.innerHTML = `
        <div class="finance-content-header">
          <div class="finance-title-text">
            BALANCE
            <span style="font-size: 0.76rem; color: #64748b; font-weight: 700; margin-left: 8px;">
              ${finRange === 'shift' ? `Shift #${engine.currentShiftNumber} (Current 60s Cycle)` : 'All-Time Financial Ledger'}
            </span>
          </div>
          <div class="finance-range-toggles">
            <button class="finance-range-btn ${finRange === 'shift' ? 'active' : ''}" id="btnFinRangeShift">⏱️ Shift</button>
            <button class="finance-range-btn ${finRange === 'allTime' ? 'active' : ''}" id="btnFinRangeAllTime">📅 All-Time</button>
          </div>
        </div>

        <div class="finance-table">
          <!-- 1. Food & Beverage Sales -->
          <div class="finance-category-row" data-toggle-cat="food">
            <div class="finance-cat-badge">
              <span>${isFoodCollapsed ? '▶' : '▼'}</span>
              <span>Food & Beverage Sales</span>
            </div>
            <div class="finance-val-pill ${foodSales > 0 ? 'pos' : 'neutral'}">
              ${foodSales > 0 ? `+$${foodSales.toFixed(2)}` : '$0.00'}
            </div>
          </div>
          ${!isFoodCollapsed ? `
            <div class="finance-sub-rows">
              <div class="finance-sub-row">
                <span>Starter Dish Sales</span>
                <span class="finance-sub-val ${fmtCurrency(record.starterSales).cls}">${fmtCurrency(record.starterSales).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Main Course Sales</span>
                <span class="finance-sub-val ${fmtCurrency(record.mainSales).cls}">${fmtCurrency(record.mainSales).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Dessert Sales</span>
                <span class="finance-sub-val ${fmtCurrency(record.dessertSales).cls}">${fmtCurrency(record.dessertSales).text}</span>
              </div>
              <div class="finance-sub-row" style="border-bottom: none;">
                <span>Beverage & Coffee Sales</span>
                <span class="finance-sub-val ${fmtCurrency(record.drinkSales).cls}">${fmtCurrency(record.drinkSales).text}</span>
              </div>
            </div>
          ` : ''}

          <!-- 2. Table Tips & Other Cash -->
          <div class="finance-category-row" data-toggle-cat="other">
            <div class="finance-cat-badge">
              <span>${isOtherCollapsed ? '▶' : '▼'}</span>
              <span>Table Tips & Other Cash</span>
            </div>
            <div class="finance-val-pill ${otherIncome > 0 ? 'pos' : 'neutral'}">
              ${otherIncome > 0 ? `+$${otherIncome.toFixed(2)}` : '$0.00'}
            </div>
          </div>
          ${!isOtherCollapsed ? `
            <div class="finance-sub-rows">
              <div class="finance-sub-row">
                <span>Diner Table Tips Collected</span>
                <span class="finance-sub-val ${fmtCurrency(record.tableTips).cls}">${fmtCurrency(record.tableTips).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Level-Up Prestige Bonuses</span>
                <span class="finance-sub-val ${fmtCurrency(record.bonuses).cls}">${fmtCurrency(record.bonuses).text}</span>
              </div>
              <div class="finance-sub-row" style="border-bottom: none;">
                <span>Asset / Inventory Resale</span>
                <span class="finance-sub-val ${fmtCurrency(record.itemSales).cls}">${fmtCurrency(record.itemSales).text}</span>
              </div>
            </div>
          ` : ''}

          <!-- 3. Staff Payroll & Labor -->
          <div class="finance-category-row" data-toggle-cat="labor">
            <div class="finance-cat-badge" style="background: #fed7aa; color: #9a3412;">
              <span>${isLaborCollapsed ? '▶' : '▼'}</span>
              <span>Staff Payroll & Labor</span>
            </div>
            <div class="finance-val-pill ${laborCosts > 0 ? 'neg' : 'neutral'}">
              ${laborCosts > 0 ? `-$${laborCosts.toFixed(2)}` : '$0.00'}
            </div>
          </div>
          ${!isLaborCollapsed ? `
            <div class="finance-sub-rows" style="border-left-color: #fb923c;">
              <div class="finance-sub-row">
                <span>Chef Salaries</span>
                <span class="finance-sub-val ${fmtCurrency(record.chefWages, true).cls}">${fmtCurrency(record.chefWages, true).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Waiter Wages</span>
                <span class="finance-sub-val ${fmtCurrency(record.waiterWages, true).cls}">${fmtCurrency(record.waiterWages, true).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Busboy Cleaner Wages</span>
                <span class="finance-sub-val ${fmtCurrency(record.cleanerWages, true).cls}">${fmtCurrency(record.cleanerWages, true).text}</span>
              </div>
              <div class="finance-sub-row" style="border-bottom: none;">
                <span>Unpaid Wage Deficit Fines</span>
                <span class="finance-sub-val ${fmtCurrency(record.wageDeficits, true).cls}">${fmtCurrency(record.wageDeficits, true).text}</span>
              </div>
            </div>
          ` : ''}

          <!-- 4. Construction & Facilities -->
          <div class="finance-category-row" data-toggle-cat="build">
            <div class="finance-cat-badge" style="background: #e2e8f0; color: #334155;">
              <span>${isBuildCollapsed ? '▶' : '▼'}</span>
              <span>Construction Costs</span>
            </div>
            <div class="finance-val-pill ${constructionCosts > 0 ? 'neg' : 'neutral'}">
              ${constructionCosts > 0 ? `-$${constructionCosts.toFixed(2)}` : '$0.00'}
            </div>
          </div>
          ${!isBuildCollapsed ? `
            <div class="finance-sub-rows" style="border-left-color: #94a3b8;">
              <div class="finance-sub-row">
                <span>Dining Tables</span>
                <span class="finance-sub-val ${fmtCurrency(record.furnitureTables, true).cls}">${fmtCurrency(record.furnitureTables, true).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Chairs & Seating</span>
                <span class="finance-sub-val ${fmtCurrency(record.furnitureChairs, true).cls}">${fmtCurrency(record.furnitureChairs, true).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Stoves & Kitchen Equipment</span>
                <span class="finance-sub-val ${fmtCurrency(record.kitchenStoves, true).cls}">${fmtCurrency(record.kitchenStoves, true).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Decor, Wallpaper & Windows</span>
                <span class="finance-sub-val ${fmtCurrency(record.decorWallpapers, true).cls}">${fmtCurrency(record.decorWallpapers, true).text}</span>
              </div>
              <div class="finance-sub-row">
                <span>Restaurant Expansion Tiers</span>
                <span class="finance-sub-val ${fmtCurrency(record.expansions, true).cls}">${fmtCurrency(record.expansions, true).text}</span>
              </div>
              <div class="finance-sub-row" style="border-bottom: none;">
                <span>Staff Hiring Agency Fees</span>
                <span class="finance-sub-val ${fmtCurrency(record.staffHiring, true).cls}">${fmtCurrency(record.staffHiring, true).text}</span>
              </div>
            </div>
          ` : ''}

          <!-- 5. Culinary Research & Upgrades -->
          <div class="finance-category-row" data-toggle-cat="upgrades">
            <div class="finance-cat-badge" style="background: #fef08a; color: #854d0e;">
              <span>${isUpgradeCollapsed ? '▶' : '▼'}</span>
              <span>Culinary Dish Upgrades</span>
            </div>
            <div class="finance-val-pill ${upgradeCosts > 0 ? 'neg' : 'neutral'}">
              ${upgradeCosts > 0 ? `-$${upgradeCosts.toFixed(2)}` : '$0.00'}
            </div>
          </div>
          ${!isUpgradeCollapsed ? `
            <div class="finance-sub-rows" style="border-left-color: #eab308;">
              <div class="finance-sub-row" style="border-bottom: none;">
                <span>Recipe Level Up Costs</span>
                <span class="finance-sub-val ${fmtCurrency(record.dishUpgrades, true).cls}">${fmtCurrency(record.dishUpgrades, true).text}</span>
              </div>
            </div>
          ` : ''}

          <!-- Highlighted Summary Rows (Planet Coaster style) -->
          <div style="margin-top: 10px; border-top: 2px solid #cbd5e1; padding-top: 8px;">
            <div class="finance-summary-row">
              <div class="finance-summary-label-pill ${netProfit >= 0 ? 'pos' : ''}">Operating Profit</div>
              <div class="finance-summary-val-pill ${netProfit >= 0 ? 'pos' : 'neg'}">
                ${netProfit >= 0 ? `+$${netProfit.toFixed(2)}` : `-$${Math.abs(netProfit).toFixed(2)}`}
              </div>
            </div>

            <div class="finance-summary-row">
              <div class="finance-summary-label-pill ${netProfit >= 0 ? 'pos' : ''}" style="background: #e2e8f0; color: #334155;">
                Profit Margin
              </div>
              <div class="finance-summary-val-pill ${netProfit >= 0 ? 'pos' : 'neg'}">
                ${netProfit >= 0 ? `+${profitMargin}%` : `${profitMargin}%`}
              </div>
            </div>

            <div class="finance-summary-row">
              <div class="finance-summary-label-pill ${netProfit >= 0 ? 'pos' : ''}">Cash Flow</div>
              <div class="finance-summary-val-pill ${netProfit >= 0 ? 'pos' : 'neg'}">
                ${netProfit >= 0 ? `+$${netProfit.toFixed(2)}` : `-$${Math.abs(netProfit).toFixed(2)}`}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (activeFinTab === 'advice') {
      // Dynamic Smart Spending Advice - Diagnosis of where to stop spending!
      const laborPct = totalExpenses > 0 ? Math.round((laborCosts / totalExpenses) * 100) : 0;
      const buildPct = totalExpenses > 0 ? Math.round((constructionCosts / totalExpenses) * 100) : 0;
      const upgradePct = totalExpenses > 0 ? Math.round((upgradeCosts / totalExpenses) * 100) : 0;

      const currentStaffCount = engine.getStaffList().length;
      const tableCount = Array.from(engine.placedItems.values()).filter(p => p.item.type === 'table').length;
      const shiftWageBill = engine.getTotalShiftWages();

      const insights: { title: string; desc: string; type: 'alert' | 'good'; icon: string }[] = [];

      // 1. Labor cost diagnosis
      if (laborCosts > foodSales && foodSales > 0) {
        insights.push({
          title: '🚨 High Labor Overhead (Payroll Exceeds Food Revenue)',
          desc: `You paid $${laborCosts.toFixed(2)} in staff wages but only earned $${foodSales.toFixed(2)} in dining sales. You have ${currentStaffCount} staff members for only ${tableCount} tables. Consider sacking 1 waiter or cleaner until customer volume picks up.`,
          type: 'alert',
          icon: '🛑'
        });
      } else if (currentStaffCount > 0 && tableCount === 0) {
        insights.push({
          title: '🚨 Zero Seating Capacity (Paying Staff with No Tables)',
          desc: `You are paying $${shiftWageBill} in shift wages every 60s, but your bistro has 0 dining tables placed! Customers cannot sit, order, or eat. Place tables immediately or release staff.`,
          type: 'alert',
          icon: '🍽️'
        });
      } else {
        insights.push({
          title: '✅ Balanced Staff Payroll',
          desc: `Labor makes up ${laborPct}% of operating costs. Your kitchen and floor staff are generating sustainable meal turnaround.`,
          type: 'good',
          icon: '👔'
        });
      }

      // 2. Construction & Decor spending check
      if (constructionCosts > totalRevenue && totalRevenue > 0) {
        insights.push({
          title: '⚠️ Heavy Construction & Decor Spend',
          desc: `You have spent $${constructionCosts.toFixed(2)} on furniture, wallpaper, and tiles, which exceeds your total revenue ($${totalRevenue.toFixed(2)}). Pause buying new decorations until your dining profits build a healthy cash buffer!`,
          type: 'alert',
          icon: '🔨'
        });
      }

      // 3. Wage Deficit warning
      if (record.wageDeficits > 0) {
        insights.push({
          title: '🚨 Wage Deficit Fine Incurred',
          desc: `You experienced $${record.wageDeficits.toFixed(2)} in unpaid wages, dock-penalizing your bistro star rating by -0.50 ⭐! Always maintain a reserve of at least ${shiftWageBill * 2} 🪙 before purchasing expensive decor.`,
          type: 'alert',
          icon: '📉'
        });
      }

      // 4. Menu & Dish margin suggestions
      const activeRecipes = engine.getActiveRecipes();
      const highestPriceRecipe = activeRecipes.reduce((prev, curr) => (curr.price > prev.price ? curr : prev), activeRecipes[0] || engine.recipes[0]);
      if (highestPriceRecipe) {
        insights.push({
          title: '💡 Best Earning Dish on Menu',
          desc: `${highestPriceRecipe.name} pays ${highestPriceRecipe.price} 🪙 per serving (${highestPriceRecipe.servingsCount || 0} served). Prioritize upgrading this dish to boost your margin per diner!`,
          type: 'good',
          icon: '🌟'
        });
      }

      financeContentPane.innerHTML = `
        <div class="finance-content-header">
          <div class="finance-title-text">
            WHERE TO STOP SPENDING (ADVISOR)
          </div>
          <div style="font-size: 0.8rem; font-weight: 800; color: #0284c7;">
            ${netProfit >= 0 ? '🟢 Profitable Bistro' : '🔴 Operating at a Loss'}
          </div>
        </div>

        <!-- Expense Ratio Visualizer -->
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 16px;">
          <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">
            Expense Distribution (% of Total Spending)
          </div>
          <div style="display: flex; height: 16px; border-radius: 8px; overflow: hidden; background: #e2e8f0;">
            <div style="width: ${laborPct}%; background: #f97316;" title="Labor: ${laborPct}%"></div>
            <div style="width: ${buildPct}%; background: #0ea5e9;" title="Construction: ${buildPct}%"></div>
            <div style="width: ${upgradePct}%; background: #eab308;" title="Dish Upgrades: ${upgradePct}%"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.76rem; font-weight: 700; margin-top: 8px; flex-wrap: wrap; gap: 8px;">
            <span style="color: #f97316;">● Staff Labor (${laborPct}%)</span>
            <span style="color: #0ea5e9;">● Construction & Build (${buildPct}%)</span>
            <span style="color: #eab308;">● Dish Upgrades (${upgradePct}%)</span>
          </div>
        </div>

        <!-- Actionable Insights List -->
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px;">
          ${insights.map(item => `
            <div class="finance-insight-card ${item.type}">
              <div class="finance-insight-icon">${item.icon}</div>
              <div>
                <div class="finance-insight-title">${item.title}</div>
                <div class="finance-insight-desc">${item.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (activeFinTab === 'margin') {
      financeContentPane.innerHTML = `
        <div class="finance-content-header">
          <div class="finance-title-text">
            OPERATING MARGINS & EFFICIENCY
          </div>
          <span style="font-size: 0.8rem; font-weight: 800; color: #64748b;">
            Shift #${engine.currentShiftNumber}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center;">
            <div style="font-size: 0.74rem; text-transform: uppercase; font-weight: 800; color: #64748b;">Gross Revenue</div>
            <div style="font-size: 1.4rem; font-weight: 900; color: #16a34a; margin-top: 4px;">+$${totalRevenue.toFixed(2)}</div>
            <div style="font-size: 0.76rem; color: #94a3b8; margin-top: 2px;">Food sales & tips</div>
          </div>

          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center;">
            <div style="font-size: 0.74rem; text-transform: uppercase; font-weight: 800; color: #64748b;">Operating Overhead</div>
            <div style="font-size: 1.4rem; font-weight: 900; color: #dc2626; margin-top: 4px;">-$${laborCosts.toFixed(2)}</div>
            <div style="font-size: 0.76rem; color: #94a3b8; margin-top: 2px;">Wages every 60s</div>
          </div>

          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center;">
            <div style="font-size: 0.74rem; text-transform: uppercase; font-weight: 800; color: #64748b;">Net Margin %</div>
            <div style="font-size: 1.4rem; font-weight: 900; color: ${netProfit >= 0 ? '#16a34a' : '#dc2626'}; margin-top: 4px;">
              ${profitMargin}%
            </div>
            <div style="font-size: 0.76rem; color: #94a3b8; margin-top: 2px;">Target: > 25%</div>
          </div>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-top: 6px;">
          <div style="font-weight: 800; font-size: 0.9rem; color: #1e293b; margin-bottom: 8px;">
            📊 Tactical Cost Management Rules
          </div>
          <ul style="padding-left: 18px; margin: 0; font-size: 0.82rem; color: #475569; display: flex; flex-direction: column; gap: 6px; line-height: 1.4;">
            <li>Keep staff wages below <b>40% of dining revenue</b> to guarantee profit each shift.</li>
            <li>Don't hire additional waiters unless customer queues form or wait times exceed 12 seconds.</li>
            <li>Prioritize leveling up high-price main dishes to increase coins earned per diner meal.</li>
            <li>Always maintain a reserve of at least <b>${engine.getTotalShiftWages() * 2} 🪙</b> so you never incur unpaid wage deficit penalties (-0.50 ⭐).</li>
          </ul>
        </div>
      `;
    }

    // Attach listeners inside rendered view
    const btnShift = document.getElementById('btnFinRangeShift');
    const btnAll = document.getElementById('btnFinRangeAllTime');
    btnShift?.addEventListener('click', () => {
      finRange = 'shift';
      renderFinances();
    });
    btnAll?.addEventListener('click', () => {
      finRange = 'allTime';
      renderFinances();
    });

    // Category accordion toggle listeners
    financeContentPane.querySelectorAll('[data-toggle-cat]').forEach(el => {
      el.addEventListener('click', () => {
        const cat = el.getAttribute('data-toggle-cat');
        if (!cat) return;
        if (collapsedFinCats.has(cat)) {
          collapsedFinCats.delete(cat);
        } else {
          collapsedFinCats.add(cat);
        }
        audio.init();
        audio.playPageFlipSound();
        renderFinances();
      });
    });
  };

  if (btnFinance && financeModalBackdrop) {
    btnFinance.addEventListener('click', () => {
      audio.init();
      audio.playPageFlipSound();
      renderFinances();
      financeModalBackdrop.style.display = 'flex';
    });
  }

  if (btnCloseFinanceModal && financeModalBackdrop) {
    btnCloseFinanceModal.addEventListener('click', () => {
      financeModalBackdrop.style.display = 'none';
    });
    financeModalBackdrop.addEventListener('click', (e) => {
      if (e.target === financeModalBackdrop) {
        financeModalBackdrop.style.display = 'none';
      }
    });
  }

  // Top Tabs inside Finance Modal
  document.querySelectorAll('[data-fin-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-fin-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFinTab = (tab.getAttribute('data-fin-tab') as any) || 'balance';
      audio.init();
      audio.playPageFlipSound();
      renderFinances();
    });
  });

  // Left Sidebar Icons inside Finance Modal
  document.querySelectorAll('[data-fin-view]').forEach(icon => {
    icon.addEventListener('click', () => {
      document.querySelectorAll('[data-fin-view]').forEach(i => i.classList.remove('active'));
      icon.classList.add('active');
      const view = icon.getAttribute('data-fin-view');
      if (view === 'balance') activeFinTab = 'balance';
      else if (view === 'costs') activeFinTab = 'margin';
      else if (view === 'insights') activeFinTab = 'advice';
      
      // Sync top tabs
      document.querySelectorAll('[data-fin-tab]').forEach(t => {
        if (t.getAttribute('data-fin-tab') === activeFinTab) t.classList.add('active');
        else t.classList.remove('active');
      });

      audio.init();
      audio.playPageFlipSound();
      renderFinances();
    });
  });

  // Real-time update hook
  engine.onFinancesUpdated = () => {
    if (financeModalBackdrop && financeModalBackdrop.style.display === 'flex') {
      renderFinances();
    }
  };

  // Initialize staff UI
  updateStaffUI();

  // Initial catalog draw
  renderCatalog();

  // Initial cookbook render
  renderCookbook();

  // ==========================================
  // BISTRO CLOUD SAVE & AUTHENTICATION SYSTEM
  // ==========================================
  const cloudSave = BistroCloudSave.getInstance();

  // HUD Elements
  const btnBistroAuth = document.getElementById('btnBistroAuth');
  const authSyncDot = document.getElementById('authSyncDot');
  const authBtnIcon = document.getElementById('authBtnIcon');
  const authStatusTitle = document.getElementById('authStatusTitle');
  const authUserLabel = document.getElementById('authUserLabel');
  const btnQuickSave = document.getElementById('btnQuickSave');

  // Modal Elements
  const bistroAuthModalBackdrop = document.getElementById('bistroAuthModalBackdrop');
  const btnCloseAuthModal = document.getElementById('btnCloseAuthModal');
  const authLoggedOutView = document.getElementById('authLoggedOutView');
  const authLoggedInView = document.getElementById('authLoggedInView');
  const btnTabSignIn = document.getElementById('btnTabSignIn');
  const btnTabSignUp = document.getElementById('btnTabSignUp');
  const authIntroText = document.getElementById('authIntroText');
  const bistroAuthForm = document.getElementById('bistroAuthForm') as HTMLFormElement | null;
  const groupUsername = document.getElementById('groupUsername');
  const inputAuthUsername = document.getElementById('inputAuthUsername') as HTMLInputElement | null;
  const inputAuthEmail = document.getElementById('inputAuthEmail') as HTMLInputElement | null;
  const inputAuthPassword = document.getElementById('inputAuthPassword') as HTMLInputElement | null;
  const authStatusMsg = document.getElementById('authStatusMsg');
  const btnAuthSubmit = document.getElementById('btnAuthSubmit') as HTMLButtonElement | null;
  const btnAuthSubmitText = document.getElementById('btnAuthSubmitText');
  const btnGoogleAuth = document.getElementById('btnGoogleAuth') as HTMLButtonElement | null;
  const btnGoogleAuthText = document.getElementById('btnGoogleAuthText');

  // Logged In Screen Elements
  const userDisplayName = document.getElementById('userDisplayName');
  const userDisplayEmail = document.getElementById('userDisplayEmail');
  const cloudLastSavedTime = document.getElementById('cloudLastSavedTime');
  const csLevelVal = document.getElementById('csLevelVal');
  const csRatingVal = document.getElementById('csRatingVal');
  const csCoinsVal = document.getElementById('csCoinsVal');
  const csCashVal = document.getElementById('csCashVal');

  // Action Buttons
  const btnManualSaveCloud = document.getElementById('btnManualSaveCloud');
  const btnManualLoadCloud = document.getElementById('btnManualLoadCloud');
  const btnExportSaveJson = document.getElementById('btnExportSaveJson');
  const btnImportSaveJson = document.getElementById('btnImportSaveJson');
  const fileImportSave = document.getElementById('fileImportSave') as HTMLInputElement | null;
  const btnAuthSignOut = document.getElementById('btnAuthSignOut');

  let currentAuthMode: 'signin' | 'signup' = 'signin';

  const updateAuthUI = () => {
    const user = cloudSave.getCurrentUser();
    const syncStatus = cloudSave.getSyncStatus();

    // 1. Update Topbar HUD Card
    if (authStatusTitle && authUserLabel && authSyncDot && authBtnIcon) {
      if (user) {
        authUserLabel.innerText = `Chef ${user.username}`;
        if (syncStatus.state === 'saving') {
          authStatusTitle.innerText = 'Saving (Local + Cloud)...';
          authSyncDot.className = 'auth-sync-dot saving';
        } else if (syncStatus.state === 'error') {
          authStatusTitle.innerText = 'Local Saved (Cloud Offline)';
          authSyncDot.className = 'auth-sync-dot error';
        } else {
          authStatusTitle.innerText = 'Synced (Local + Cloud)';
          authSyncDot.className = 'auth-sync-dot synced';
        }
      } else {
        authStatusTitle.innerText = 'Auto-Saved Locally';
        authUserLabel.innerText = 'Guest (Click to Link Cloud)';
        authSyncDot.className = 'auth-sync-dot';
      }
    }

    // 2. Update Modal Contents
    if (user) {
      if (authLoggedOutView) authLoggedOutView.style.display = 'none';
      if (authLoggedInView) authLoggedInView.style.display = 'block';

      if (userDisplayName) userDisplayName.innerText = user.username;
      if (userDisplayEmail) userDisplayEmail.innerText = user.email;

      const userAvatarCircle = document.querySelector('.user-avatar-circle') as HTMLElement | null;
      if (userAvatarCircle) {
        if (user.avatarUrl) {
          userAvatarCircle.innerHTML = `<img src="${user.avatarUrl}" alt="${user.username}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        } else {
          userAvatarCircle.innerText = '🧑‍🍳';
        }
      }

      if (cloudLastSavedTime) {
        if (syncStatus.lastSavedAt) {
          const formatted = new Date(syncStatus.lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          cloudLastSavedTime.innerText = `Synced at ${formatted}`;
        } else {
          cloudLastSavedTime.innerText = 'Active';
        }
      }

      if (csLevelVal) csLevelVal.innerText = `Lv.${engine.level}`;
      if (csRatingVal) csRatingVal.innerText = `★ ${engine.rating.toFixed(1)}`;
      if (csCoinsVal) {
        if (engine.coins < 0) {
          csCoinsVal.innerHTML = `<span style="color: #f87171; font-weight: 700;">🪙 ${engine.coins.toLocaleString()} (Debt)</span>`;
        } else {
          csCoinsVal.innerText = `🪙 ${engine.coins.toLocaleString()}`;
        }
      }
      if (csCashVal) csCashVal.innerText = `💵 ${engine.cash.toLocaleString()}`;
    } else {
      if (authLoggedOutView) authLoggedOutView.style.display = 'block';
      if (authLoggedInView) authLoggedInView.style.display = 'none';
    }
  };

  const setAuthTab = (mode: 'signin' | 'signup') => {
    currentAuthMode = mode;
    if (authStatusMsg) {
      authStatusMsg.style.display = 'none';
      authStatusMsg.className = 'auth-status-msg';
    }

    if (mode === 'signup') {
      btnTabSignUp?.classList.add('active');
      btnTabSignIn?.classList.remove('active');
      if (groupUsername) groupUsername.style.display = 'flex';
      if (authIntroText) authIntroText.innerText = 'Create your Genesis Cloud account to preserve your restaurant layout, coins, staff, and star rating anywhere!';
      if (btnAuthSubmitText) btnAuthSubmitText.innerText = 'Create Account & Sync';
    } else {
      btnTabSignIn?.classList.add('active');
      btnTabSignUp?.classList.remove('active');
      if (groupUsername) groupUsername.style.display = 'none';
      if (authIntroText) authIntroText.innerText = 'Sign in to sync your restaurant layout, Michelin star rating, coins, and staff across all your devices with Genesis Cloud!';
      if (btnAuthSubmitText) btnAuthSubmitText.innerText = 'Sign In to Bistro Cloud';
    }
  };

  const showAuthMsg = (msg: string, type: 'error' | 'success' | 'info') => {
    if (!authStatusMsg) return;
    authStatusMsg.innerText = msg;
    authStatusMsg.className = `auth-status-msg ${type}`;
    authStatusMsg.style.display = 'block';
  };

  // Open / Close Modal Handlers
  if (btnBistroAuth && bistroAuthModalBackdrop) {
    btnBistroAuth.addEventListener('click', () => {
      audio.init();
      audio.playPageFlipSound();
      updateAuthUI();
      bistroAuthModalBackdrop.style.display = 'flex';
    });
  }

  if (btnCloseAuthModal && bistroAuthModalBackdrop) {
    btnCloseAuthModal.addEventListener('click', () => {
      bistroAuthModalBackdrop.style.display = 'none';
    });
    bistroAuthModalBackdrop.addEventListener('click', (e) => {
      if (e.target === bistroAuthModalBackdrop) {
        bistroAuthModalBackdrop.style.display = 'none';
      }
    });
  }

  // Quick Save Button (in HUD card)
  if (btnQuickSave) {
    btnQuickSave.addEventListener('click', async (e) => {
      e.stopPropagation();
      audio.init();
      audio.playCoinSound();
      engine.saveGameState(true);
      if (cloudSave.isAuthenticated()) {
        showToast('☁️ Saved to Genesis Cloud!');
      } else {
        showToast('💾 Saved locally! (Sign in to back up to cloud)');
      }
      updateAuthUI();
    });
  }

  // Tab Switching
  btnTabSignIn?.addEventListener('click', () => setAuthTab('signin'));
  btnTabSignUp?.addEventListener('click', () => setAuthTab('signup'));

  // Google OAuth Sign In
  btnGoogleAuth?.addEventListener('click', async () => {
    audio.init();
    audio.playCoinSound();
    if (btnGoogleAuth) btnGoogleAuth.disabled = true;
    if (btnGoogleAuthText) btnGoogleAuthText.innerText = 'Connecting to Google...';
    showAuthMsg('Redirecting to Google Secure Login...', 'info');

    const res = await cloudSave.signInWithGoogle();
    if (!res.success) {
      showAuthMsg(res.message || 'Google sign-in could not be initiated.', 'error');
      if (btnGoogleAuth) btnGoogleAuth.disabled = false;
      if (btnGoogleAuthText) btnGoogleAuthText.innerText = 'Continue with Google';
    }
  });

  // Auth Form Submission
  bistroAuthForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = inputAuthEmail?.value.trim() || '';
    const password = inputAuthPassword?.value.trim() || '';
    const username = inputAuthUsername?.value.trim() || '';

    if (!email || !password) {
      showAuthMsg('Please enter both your email address and password.', 'error');
      return;
    }

    if (btnAuthSubmit) {
      btnAuthSubmit.disabled = true;
      if (btnAuthSubmitText) btnAuthSubmitText.innerText = 'Contacting Cloud...';
    }

    try {
      if (currentAuthMode === 'signup') {
        const res = await cloudSave.signUp(email, password, username);
        if (!res.success) {
          showAuthMsg(res.message || 'Registration failed.', 'error');
        } else {
          showAuthMsg(res.message || 'Account created successfully!', 'success');
          // If session started immediately, upload current local state to newly created cloud account!
          if (cloudSave.isAuthenticated()) {
            await cloudSave.pushToCloud(engine.getSerializedSaveData());
            showToast('🎉 Account linked! Restaurant saved to cloud.');
            setTimeout(() => {
              if (bistroAuthModalBackdrop) bistroAuthModalBackdrop.style.display = 'none';
            }, 1200);
          }
        }
      } else {
        const res = await cloudSave.signIn(email, password);
        if (!res.success) {
          showAuthMsg(res.message || 'Login failed. Please verify credentials.', 'error');
        } else {
          showAuthMsg('Signed in successfully! Syncing restaurant...', 'success');
          // Load newest progress
          const best = await cloudSave.loadBestSave();
          if (best.data) {
            engine.applyLoadedState(best.data);
            updateExpansionUI();
            updateStaffUI();
            renderCatalog();
            renderCookbook();
          }
          const user = cloudSave.getCurrentUser();
          showToast(`👋 Welcome back, Chef ${user?.username || 'Pioneer'}!`);
          setTimeout(() => {
            if (bistroAuthModalBackdrop) bistroAuthModalBackdrop.style.display = 'none';
          }, 900);
        }
      }
    } catch (err: any) {
      showAuthMsg(err?.message || 'An unexpected error occurred.', 'error');
    } finally {
      if (btnAuthSubmit) {
        btnAuthSubmit.disabled = false;
        if (btnAuthSubmitText) {
          btnAuthSubmitText.innerText = currentAuthMode === 'signup' ? 'Create Account & Sync' : 'Sign In to Bistro Cloud';
        }
      }
      updateAuthUI();
    }
  });

  // Manual Cloud Save
  btnManualSaveCloud?.addEventListener('click', async () => {
    audio.init();
    audio.playCoinSound();
    const saveObj = engine.getSerializedSaveData();
    const ok = await cloudSave.pushToCloud(saveObj);
    if (ok) {
      showToast('☁️ Restaurant state uploaded to Genesis Cloud!');
      updateAuthUI();
    } else {
      showToast('⚠️ Failed to sync with cloud. Saved locally.');
    }
  });

  // Manual Cloud Load
  btnManualLoadCloud?.addEventListener('click', async () => {
    audio.init();
    audio.playPageFlipSound();
    const cloudData = await cloudSave.fetchCloudSave();
    if (cloudData) {
      const ok = engine.applyLoadedState(cloudData);
      if (ok) {
        updateExpansionUI();
        updateStaffUI();
        renderCatalog();
        renderCookbook();
        showToast('☁️ Latest cloud backup restored successfully!');
        updateAuthUI();
      } else {
        showToast('⚠️ Could not parse cloud save data.');
      }
    } else {
      showToast('ℹ️ No previous cloud backup found for this account.');
    }
  });

  // Export Save File
  btnExportSaveJson?.addEventListener('click', () => {
    audio.init();
    audio.playPageFlipSound();
    const currentData = engine.getSerializedSaveData();
    cloudSave.exportSaveFile(currentData);
    showToast('📥 Backup save file (.json) downloaded!');
  });

  // Import Save File
  btnImportSaveJson?.addEventListener('click', () => {
    fileImportSave?.click();
  });

  fileImportSave?.addEventListener('change', async () => {
    const file = fileImportSave.files?.[0];
    if (!file) return;

    try {
      const data = await cloudSave.importSaveFile(file);
      const ok = engine.applyLoadedState(data);
      if (ok) {
        updateExpansionUI();
        updateStaffUI();
        renderCatalog();
        renderCookbook();
        showToast('✅ Restaurant save imported successfully!');
        updateAuthUI();
      } else {
        showToast('⚠️ Save file contains incompatible restaurant layout.');
      }
    } catch (err: any) {
      showToast(`⚠️ Import failed: ${err.message || 'Invalid JSON'}`);
    } finally {
      fileImportSave.value = '';
    }
  });

  // Sign Out
  btnAuthSignOut?.addEventListener('click', async () => {
    audio.init();
    audio.playPageFlipSound();
    await cloudSave.signOut();
    showToast('🚪 Signed out of Bistro Cloud. Switched to local guest mode.');
    updateAuthUI();
  });

  // Subscriptions & Initialization on Page Load
  cloudSave.onAuth(() => updateAuthUI());
  cloudSave.onSync(() => updateAuthUI());

  // Bootstrap cloud authentication and attempt cloud sync
  cloudSave.init().then(async (user) => {
    if (user) {
      try {
        const best = await cloudSave.loadBestSave();
        if (best.data && best.source === 'cloud') {
          engine.applyLoadedState(best.data);
          updateExpansionUI();
          updateStaffUI();
          renderCatalog();
          renderCookbook();
          showToast(`☁️ Restored cloud progress for Chef ${user.username}!`);
        }
      } catch (e) {
        console.warn('Initial cloud sync check:', e);
      }
    }
    updateAuthUI();
  });
});


