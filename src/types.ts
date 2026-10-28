export type ItemType = 'floor' | 'wall' | 'window' | 'table' | 'chair' | 'stove' | 'counter' | 'plant' | 'door';

export interface FurnitureItem {
  id: string;
  name: string;
  type: ItemType;
  price: number;
  cashPrice?: number;
  currency?: 'coins' | 'cash';
  imageSrc?: string;
  color: string;
  accentColor?: string;
  pattern?: string;
  originalPrice?: number;
  isFromInventory?: boolean;
  isWalkable: boolean;
  isInteractive?: boolean;
  flipX?: boolean;
  rotation?: number; // 0 = default, 90, 180, 270
}

export interface PlacedItem {
  instanceId: string;
  col: number;
  row: number;
  item: FurnitureItem;
  isDirty?: boolean;
}

export interface InventoryItem {
  item: FurnitureItem;
  quantity: number;
}

export type StaffRole = 'waiter' | 'chef' | 'cleaner';

export type CustomerState = 
  | 'entering' 
  | 'walking_to_seat' 
  | 'waiting_to_order' 
  | 'waiting_for_food' 
  | 'eating' 
  | 'finished_eating' 
  | 'leaving'
  | 'walkaway_no_seats';

export type WaiterState = 
  | 'idle' 
  | 'walking_to_order' 
  | 'taking_order' 
  | 'walking_to_stove' 
  | 'walking_to_serve';

export type ChefState = 
  | 'idle' 
  | 'cooking';

export type CleanerState = 
  | 'idle' 
  | 'walking_to_clean' 
  | 'cleaning';

export type ActorState = CustomerState | WaiterState | ChefState | CleanerState;

export interface CookingTicket {
  ticketId: string;
  customerId: string;
  tableCol: number;
  tableRow: number;
  dish: Recipe;
  stoveCol: number;
  stoveRow: number;
  prepProgress: number;
  isReady: boolean;
  chefId?: string;
  claimedByWaiterId?: string;
}

export interface Actor {
  id: string;
  name: string;
  role: 'customer' | StaffRole;
  col: number;
  row: number;
  screenX: number;
  screenY: number;
  path: { col: number; row: number }[];
  state: ActorState;
  stateTimer: number;
  avatarSrc?: string;
  color: string;
  hairColor: string;
  assignedChairId?: string;
  assignedDish?: Recipe;
  targetCustomerId?: string;
  carriedDish?: Recipe;
  targetTableCol?: number;
  targetTableRow?: number;
  wage?: number;
  energy: number;
  patience: number;
  patienceMax?: number;
  partnerId?: string;
  isCouple?: boolean;
  walkawayTimer?: number;
  walkawayEmote?: string;
  talkBubbleTimer?: number;
  talkBubbleIcon?: string;
  entranceCol?: number;
  entranceRow?: number;
}

export type IngredientId =
  | 'beef'
  | 'lobster'
  | 'escargot'
  | 'cheese'
  | 'cream'
  | 'milk'
  | 'flour'
  | 'bread'
  | 'pasta_dough'
  | 'coffee_beans'
  | 'sugar'
  | 'chocolate'
  | 'tomato'
  | 'basil'
  | 'berries'
  | 'lemon'
  | 'truffle';

export interface IngredientRequirement {
  ingredientId: IngredientId;
  amount: number;
}

export interface IngredientInfo {
  id: IngredientId;
  name: string;
  emoji: string;
  category: 'protein' | 'dairy' | 'produce' | 'pantry';
  marketPrice: number;
  description: string;
}

export interface IngredientDrop {
  id: string;
  ingredientId: IngredientId;
  col: number;
  row: number;
  remainingTime: number;
  maxTime: number;
  isCrate?: boolean;
}

export interface MarketDeal {
  id: string;
  ingredientId: IngredientId;
  amount: number;
  coinPrice: number;
  isSoldOut?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'starter' | 'main' | 'dessert' | 'drink';
  unlockLevel?: number;
  level: number;
  basePrice?: number;
  price: number;
  prepTime: number;
  imageSrc: string;
  emoji?: string;
  description?: string;
  isActive?: boolean;
  servingsCount?: number;
  baseIngredients: IngredientRequirement[];
}

export interface ExpansionTier {
  size: number;
  name: string;
  minLevel: number;
  cost: number;
}

export interface TableTip {
  id: string;
  col: number;
  row: number;
  remainingTime: number;
  maxTime: number;
  value: number;
  createdAt: number;
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  startY: number;
  color: string;
  alpha: number;
  lifetime: number;
  maxLifetime: number;
}

export interface BistroFinancialRecord {
  // Income categories
  starterSales: number;
  mainSales: number;
  dessertSales: number;
  drinkSales: number;
  tableTips: number;
  bonuses: number;
  itemSales: number;

  // Operating Expenses (Labor)
  chefWages: number;
  waiterWages: number;
  cleanerWages: number;
  wageDeficits: number;

  // Capital Expenditures (Building & Buying)
  furnitureTables: number;
  furnitureChairs: number;
  kitchenStoves: number;
  decorWallpapers: number;
  expansions: number;
  staffHiring: number;

  // Culinary Investments
  dishUpgrades: number;
}

export interface PrestigeBreakdown {
  baseRating: number;
  expansionScore: number;
  seatingScore: number;
  decorScore: number;
  wallFloorScore: number;
  culinaryScore: number;
  diversityScore: number;
  maxRating: number;
  tableSetsCount: number;
  decorCount: number;
  recipeLevelsSum: number;
}

export interface BistroSaveData {
  timestamp?: number;
  version?: number;
  gridSize: number;
  coins: number;
  cash: number;
  rating: number;
  hasReachedFiveStars: boolean;
  level: number;
  xp: number;
  nextLevelXp: number;
  totalMealsServed: number;
  recipes: Array<{
    id: string;
    level: number;
    price: number;
    prepTime: number;
    isActive: boolean;
    servingsCount: number;
  }>;
  placedItems: PlacedItem[];
  inventory: Array<{ key: string; item: FurnitureItem; quantity: number }>;
  staff: Array<{
    id: string;
    name: string;
    role: StaffRole;
    col: number;
    row: number;
    color: string;
    hairColor: string;
    avatarSrc?: string;
    wage?: number;
  }>;
  payrollTimer: number;
  currentShiftNumber: number;
  shiftFinances: BistroFinancialRecord;
  allTimeFinances: BistroFinancialRecord;
  pantryFreshStart: number;
  pantry: [string, number][];
}

export type CloudSyncState = 'synced' | 'saving' | 'offline' | 'error';

export interface BistroUser {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

