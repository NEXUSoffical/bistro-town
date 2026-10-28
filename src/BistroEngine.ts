import { IsoUtils } from './IsoUtils';
import { Pathfinding } from './Pathfinding';
import { CityEnvironment } from './CityEnvironment';
import { 
  PlacedItem, FurnitureItem, Actor, Recipe, CookingTicket, ExpansionTier, TableTip, FloatingText, StaffRole,
  IngredientId, IngredientInfo, IngredientDrop, MarketDeal, BistroFinancialRecord, PrestigeBreakdown,
  BistroSaveData
} from './types';
import { BistroCloudSave } from './BistroCloudSave';

export const EXPANSION_TIERS: ExpansionTier[] = [
  { size: 6, name: 'Starter Diner', minLevel: 1, cost: 0 },
  { size: 7, name: 'Cozy Bistro', minLevel: 3, cost: 850 },
  { size: 8, name: 'Neighborhood Cafe', minLevel: 5, cost: 2500 },
  { size: 9, name: 'Corner Brasserie', minLevel: 8, cost: 7000 },
  { size: 10, name: 'City Plaza Restaurant', minLevel: 12, cost: 18000 },
  { size: 11, name: 'Grand Dining Hall', minLevel: 16, cost: 45000 },
  { size: 12, name: 'Imperial Luxury Palace', minLevel: 20, cost: 120000 }
];

export const INGREDIENT_CATALOG: Record<IngredientId, IngredientInfo> = {
  beef: { id: 'beef', name: 'Prime Beef', emoji: '🥩', category: 'protein', marketPrice: 24, description: 'Tender grain-fed cuts for gourmet burgers and ribeye steaks.' },
  lobster: { id: 'lobster', name: 'Fresh Lobster', emoji: '🦞', category: 'protein', marketPrice: 38, description: 'Sweet Atlantic lobster caught fresh for gourmet seafood.' },
  escargot: { id: 'escargot', name: 'Wild Escargot', emoji: '🐌', category: 'protein', marketPrice: 28, description: 'French vineyard snails prepared for garlic herb butter.' },
  cheese: { id: 'cheese', name: 'Artisan Cheese', emoji: '🧀', category: 'dairy', marketPrice: 16, description: 'Fresh mozzarella fior di latte and aged sharp cheddar.' },
  cream: { id: 'cream', name: 'Sweet Cream', emoji: '🥛', category: 'dairy', marketPrice: 14, description: 'Rich farm-fresh heavy cream for bisques, sauces, and gelato.' },
  milk: { id: 'milk', name: 'Whole Milk', emoji: '🍼', category: 'dairy', marketPrice: 10, description: 'Cold whole frothing milk for lattes and macchiatos.' },
  flour: { id: 'flour', name: 'Organic Flour', emoji: '🌾', category: 'pantry', marketPrice: 10, description: 'Finely ground stone flour for artisanal pizza and pastries.' },
  bread: { id: 'bread', name: 'Bakery Bread', emoji: '🥖', category: 'pantry', marketPrice: 12, description: 'Toasted brioche buns and crispy French baguettes.' },
  pasta_dough: { id: 'pasta_dough', name: 'Egg Pasta', emoji: '🍝', category: 'pantry', marketPrice: 18, description: 'Silky golden handmade pasta noodles rolled daily.' },
  coffee_beans: { id: 'coffee_beans', name: 'Espresso Beans', emoji: '☕', category: 'pantry', marketPrice: 15, description: 'Dark roasted Arabica coffee beans with rich cocoa aroma.' },
  sugar: { id: 'sugar', name: 'Cane Sugar', emoji: '🍬', category: 'pantry', marketPrice: 8, description: 'Pure crystallized sugar for desserts and glazed syrups.' },
  chocolate: { id: 'chocolate', name: 'Belgian Cocoa', emoji: '🍫', category: 'pantry', marketPrice: 20, description: 'Rich 70% dark chocolate for decadent molten desserts.' },
  tomato: { id: 'tomato', name: 'Vine Tomato', emoji: '🍅', category: 'produce', marketPrice: 12, description: 'San Marzano vine tomatoes bursting with fresh juice.' },
  basil: { id: 'basil', name: 'Garden Basil', emoji: '🌿', category: 'produce', marketPrice: 9, description: 'Aromatic sweet basil and herbs picked from greenhouse.' },
  berries: { id: 'berries', name: 'Wild Berries', emoji: '🫐', category: 'produce', marketPrice: 15, description: 'Hand-picked raspberries, blackberries, and blueberries.' },
  lemon: { id: 'lemon', name: 'Sicilian Lemon', emoji: '🍋', category: 'produce', marketPrice: 11, description: 'Zesty tart lemons packed with refreshing citrus juices.' },
  truffle: { id: 'truffle', name: 'Black Truffle', emoji: '🍄', category: 'produce', marketPrice: 42, description: 'Rare fragrant woodland truffles for Michelin-star cuisine.' }
};

export const STAFF_AVATARS: Record<StaffRole, string[]> = {
  chef: [
    '/assets/characters/chef_marco.png',
    '/assets/characters/chef_pierre.png'
  ],
  waiter: [
    '/assets/characters/waiter_clara.png',
    '/assets/characters/waiter_lucas.png'
  ],
  cleaner: [
    '/assets/characters/cleaner_sam.png'
  ]
};

export const DEFAULT_RECIPES: Recipe[] = [
  // Starters
  {
    id: 'soup',
    name: 'Creamy Tomato Bisque',
    category: 'starter',
    unlockLevel: 1,
    level: 1,
    basePrice: 3,
    price: 3,
    prepTime: 5.0,
    imageSrc: '/assets/dishes/soup.png',
    emoji: '🥣',
    description: 'Slow-simmered vine-ripened tomatoes finished with sweet cream and garden basil.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'tomato', amount: 2 },
      { ingredientId: 'cream', amount: 1 },
      { ingredientId: 'basil', amount: 1 }
    ]
  },
  {
    id: 'salad',
    name: 'Crisp Caesar Salad',
    category: 'starter',
    unlockLevel: 2,
    level: 1,
    basePrice: 4,
    price: 4,
    prepTime: 4.5,
    imageSrc: '',
    emoji: '🥗',
    description: 'Crisp romaine hearts tossed in garlic parmesan dressing with crunchy croutons.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'basil', amount: 1 },
      { ingredientId: 'cheese', amount: 1 },
      { ingredientId: 'bread', amount: 1 },
      { ingredientId: 'lemon', amount: 1 }
    ]
  },
  {
    id: 'bruschetta',
    name: 'Rustic Bruschetta',
    category: 'starter',
    unlockLevel: 3,
    level: 1,
    basePrice: 5,
    price: 5,
    prepTime: 4.0,
    imageSrc: '',
    emoji: '🥖',
    description: 'Toasted sourdough with garlic, diced heirloom tomatoes, and balsamic glaze.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'bread', amount: 2 },
      { ingredientId: 'tomato', amount: 2 },
      { ingredientId: 'basil', amount: 1 }
    ]
  },
  {
    id: 'escargot',
    name: 'Garlic Butter Escargot',
    category: 'starter',
    unlockLevel: 5,
    level: 1,
    basePrice: 8,
    price: 8,
    prepTime: 5.5,
    imageSrc: '',
    emoji: '🐌',
    description: 'Authentic French delicacy sizzling in herbed garlic butter and white wine.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'escargot', amount: 2 },
      { ingredientId: 'cream', amount: 1 },
      { ingredientId: 'basil', amount: 1 }
    ]
  },

  // Mains
  {
    id: 'burger',
    name: 'Brioche Gourmet Burger',
    category: 'main',
    unlockLevel: 1,
    level: 1,
    basePrice: 5,
    price: 5,
    prepTime: 6.5,
    imageSrc: '/assets/dishes/burger.png',
    emoji: '🍔',
    description: 'Prime ground chuck patty grilled with aged sharp cheddar on a toasted brioche bun.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'beef', amount: 1 },
      { ingredientId: 'bread', amount: 1 },
      { ingredientId: 'cheese', amount: 1 },
      { ingredientId: 'tomato', amount: 1 }
    ]
  },
  {
    id: 'pizza',
    name: 'Woodfired Margherita',
    category: 'main',
    unlockLevel: 2,
    level: 1,
    basePrice: 6,
    price: 6,
    prepTime: 6.0,
    imageSrc: '',
    emoji: '🍕',
    description: 'San Marzano sauce, whole milk mozzarella, and fresh basil on stone-baked crust.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'flour', amount: 2 },
      { ingredientId: 'cheese', amount: 2 },
      { ingredientId: 'tomato', amount: 2 },
      { ingredientId: 'basil', amount: 1 }
    ]
  },
  {
    id: 'pasta',
    name: 'Truffle Tagliatelle',
    category: 'main',
    unlockLevel: 3,
    level: 1,
    basePrice: 8,
    price: 8,
    prepTime: 7.0,
    imageSrc: '',
    emoji: '🍝',
    description: 'Silky pasta tossed in shaved black truffle cream and 24-month parmigiano.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'pasta_dough', amount: 2 },
      { ingredientId: 'cream', amount: 1 },
      { ingredientId: 'cheese', amount: 1 },
      { ingredientId: 'truffle', amount: 1 }
    ]
  },
  {
    id: 'steak',
    name: 'Prime Grilled Ribeye',
    category: 'main',
    unlockLevel: 4,
    level: 1,
    basePrice: 11,
    price: 11,
    prepTime: 7.5,
    imageSrc: '',
    emoji: '🥩',
    description: 'Center-cut ribeye seared with rosemary garlic butter and roasted asparagus.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'beef', amount: 3 },
      { ingredientId: 'cream', amount: 1 },
      { ingredientId: 'basil', amount: 1 }
    ]
  },
  {
    id: 'lobster',
    name: 'Lobster Thermidor',
    category: 'main',
    unlockLevel: 6,
    level: 1,
    basePrice: 15,
    price: 15,
    prepTime: 8.5,
    imageSrc: '',
    emoji: '🦞',
    description: 'Tender fresh lobster in rich cognac egg yolk cream, gratinated with Gruyère.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'lobster', amount: 2 },
      { ingredientId: 'cream', amount: 2 },
      { ingredientId: 'cheese', amount: 1 }
    ]
  },

  // Desserts
  {
    id: 'sundae',
    name: 'Wild Berry Sundae',
    category: 'dessert',
    unlockLevel: 1,
    level: 1,
    basePrice: 4,
    price: 4,
    prepTime: 5.0,
    imageSrc: '/assets/dishes/sundae.png',
    emoji: '🍨',
    description: 'Velvety vanilla bean gelato swirled with tart raspberry coulis and blueberries.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'berries', amount: 2 },
      { ingredientId: 'cream', amount: 1 },
      { ingredientId: 'sugar', amount: 1 }
    ]
  },
  {
    id: 'lava_cake',
    name: 'Molten Lava Cake',
    category: 'dessert',
    unlockLevel: 2,
    level: 1,
    basePrice: 5,
    price: 5,
    prepTime: 5.5,
    imageSrc: '',
    emoji: '🍫',
    description: 'Warm dark chocolate cake with a rich flowing ganache center dusted in cocoa.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'chocolate', amount: 2 },
      { ingredientId: 'flour', amount: 1 },
      { ingredientId: 'sugar', amount: 1 },
      { ingredientId: 'cream', amount: 1 }
    ]
  },
  {
    id: 'macarons',
    name: 'Parisian Macarons',
    category: 'dessert',
    unlockLevel: 3,
    level: 1,
    basePrice: 7,
    price: 7,
    prepTime: 4.5,
    imageSrc: '',
    emoji: '🧁',
    description: 'Delicate almond meringue shells filled with pistachio, rose, and salted caramel.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'sugar', amount: 2 },
      { ingredientId: 'flour', amount: 1 },
      { ingredientId: 'berries', amount: 1 },
      { ingredientId: 'chocolate', amount: 1 }
    ]
  },
  {
    id: 'tiramisu',
    name: 'Royal Gold Tiramisu',
    category: 'dessert',
    unlockLevel: 5,
    level: 1,
    basePrice: 10,
    price: 10,
    prepTime: 6.0,
    imageSrc: '',
    emoji: '🍰',
    description: 'Espresso-soaked ladyfingers layered with sweet mascarpone and edible gold leaf.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'coffee_beans', amount: 2 },
      { ingredientId: 'cream', amount: 2 },
      { ingredientId: 'sugar', amount: 1 },
      { ingredientId: 'chocolate', amount: 1 }
    ]
  },

  // Drinks
  {
    id: 'latte',
    name: 'Caramel Macchiato',
    category: 'drink',
    unlockLevel: 1,
    level: 1,
    basePrice: 3,
    price: 3,
    prepTime: 4.0,
    imageSrc: '/assets/dishes/latte.png',
    emoji: '☕',
    description: 'Steamed whole milk stained with rich double espresso and buttery caramel drizzle.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'coffee_beans', amount: 2 },
      { ingredientId: 'milk', amount: 1 },
      { ingredientId: 'sugar', amount: 1 }
    ]
  },
  {
    id: 'lemonade',
    name: 'Fresh Mint Lemonade',
    category: 'drink',
    unlockLevel: 2,
    level: 1,
    basePrice: 4,
    price: 4,
    prepTime: 3.5,
    imageSrc: '',
    emoji: '🍋',
    description: 'Freshly squeezed lemons shaken with bruised garden mint and sparkling spring water.',
    isActive: true,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'lemon', amount: 2 },
      { ingredientId: 'basil', amount: 1 },
      { ingredientId: 'sugar', amount: 1 }
    ]
  },
  {
    id: 'mocktail',
    name: 'Ruby Berry Mocktail',
    category: 'drink',
    unlockLevel: 3,
    level: 1,
    basePrice: 6,
    price: 6,
    prepTime: 4.0,
    imageSrc: '',
    emoji: '🍹',
    description: 'Pomegranate and hibiscus reduction charged with club soda over crushed crystal ice.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'berries', amount: 2 },
      { ingredientId: 'lemon', amount: 1 },
      { ingredientId: 'sugar', amount: 1 }
    ]
  },
  {
    id: 'champagne',
    name: 'Sparkling Apple Cider',
    category: 'drink',
    unlockLevel: 5,
    level: 1,
    basePrice: 9,
    price: 9,
    prepTime: 4.5,
    imageSrc: '',
    emoji: '🍾',
    description: 'Crisp celebratory bubbly poured into crystal flutes with fresh strawberry garnish.',
    isActive: false,
    servingsCount: 0,
    baseIngredients: [
      { ingredientId: 'berries', amount: 2 },
      { ingredientId: 'sugar', amount: 2 },
      { ingredientId: 'lemon', amount: 1 }
    ]
  }
];

// Asset Image Cache
class AssetCache {
  private images: Map<string, HTMLImageElement> = new Map();

  getImage(src: string): HTMLImageElement {
    let img = this.images.get(src);
    if (!img) {
      img = new Image();
      img.src = src;
      this.images.set(src, img);
    }
    return img;
  }
}

export class BistroEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private assets = new AssetCache();
  
  gridSize = 6;
  originX = 0;
  originY = 0;
  baseOriginX = 0;
  baseOriginY = 0;
  panOffsetX = 0;
  panOffsetY = 0;
  zoom = 1.0; // Dynamic zoom scaling (0.6x to 1.6x)
  private isMouseDown = false;
  private isPanning = false;
  private startMouseX = 0;
  private startMouseY = 0;
  private startPanX = 0;
  private startPanY = 0;
  private hasDragged = false;

  // Game state (Authentic Restaurant City Grind)
  coins = 80;
  creditLimit = -1000; // Allow balance to go negative into debt (overdraft line of credit)
  cash = 25; // Bistro Cash (Real-money premium currency)
  rating = 0.5; // Star rating (starts at 0.5 half-a-star, max 5.0 stars)
  hasReachedFiveStars = false;
  get popularity(): number {
    return Math.round((this.rating / 5.0) * 100);
  }
  level = 1;
  xp = 0;
  nextLevelXp = 150;
  totalMealsServed = 0;
  recipes: Recipe[] = DEFAULT_RECIPES.map(r => ({ ...r }));
  placedItems: Map<string, PlacedItem> = new Map();
  actors: Actor[] = [];
  cookingTickets: CookingTicket[] = [];
  
  // Selection & Build Mode
  selectedTool: FurnitureItem | null = null;
  selectedPlacedItem: PlacedItem | null = null;
  activeMovingItem: PlacedItem | null = null;
  inventory: Map<string, { item: FurnitureItem; quantity: number }> = new Map();
  hoveredCell: { col: number; row: number } | null = null;
  hoveredWall: { side: 'nw' | 'ne'; index: number } | null = null;
  isBuildMode = false;
  activeBuildTool: 'place' | 'move' | 'rotate' | 'remove' | null = null;

  // Callbacks
  onInventoryUpdate?: (items: { item: FurnitureItem; quantity: number }[]) => void;
  onSelectedItemChange?: (item: PlacedItem | null) => void;
  onItemRemoved?: (name: string) => void;
  onItemRotated?: (name: string) => void;
  onWallpaperApplied?: (name: string) => void;
  onWindowInstalled?: (name: string) => void;
  onDoorInstalled?: (name: string) => void;
  onCustomerEnter?: () => void;

  // Timing
  private lastTime = 0;
  private customerSpawnTimer = 3.0;
  private autoSaveTimer = 8.0;
  private city = new CityEnvironment();
  
  // Table Tips & Visual Floaters
  tableTips: TableTip[] = [];
  floatingTexts: FloatingText[] = [];

  // Ingredients Pantry & Mystery Drops
  pantry: Map<IngredientId, number> = new Map();
  ingredientDrops: IngredientDrop[] = [];
  marketDeals: MarketDeal[] = [];
  marketRestockTimer = 60.0;
  maxMarketRestockTimer = 60.0;
  supplyCrateTimer = 75.0;

  // Tactical Staff Payroll System
  payrollTimer = 60.0;
  maxPayrollTimer = 60.0;

  // Tycoon Financial Management System (Planet Coaster style)
  currentShiftNumber = 1;
  shiftFinances: BistroFinancialRecord = this.createEmptyFinancialRecord();
  allTimeFinances: BistroFinancialRecord = this.createEmptyFinancialRecord();
  onFinancesUpdated?: (shift: BistroFinancialRecord, allTime: BistroFinancialRecord) => void;

  createEmptyFinancialRecord(): BistroFinancialRecord {
    return {
      starterSales: 0,
      mainSales: 0,
      dessertSales: 0,
      drinkSales: 0,
      tableTips: 0,
      bonuses: 0,
      itemSales: 0,

      chefWages: 0,
      waiterWages: 0,
      cleanerWages: 0,
      wageDeficits: 0,

      furnitureTables: 0,
      furnitureChairs: 0,
      kitchenStoves: 0,
      decorWallpapers: 0,
      expansions: 0,
      staffHiring: 0,
      dishUpgrades: 0
    };
  }

  recordIncome(category: keyof Pick<BistroFinancialRecord, 'starterSales' | 'mainSales' | 'dessertSales' | 'drinkSales' | 'tableTips' | 'bonuses' | 'itemSales'>, amount: number) {
    if (amount <= 0) return;
    this.shiftFinances[category] += amount;
    this.allTimeFinances[category] += amount;
    if (this.onFinancesUpdated) this.onFinancesUpdated(this.shiftFinances, this.allTimeFinances);
  }

  recordExpense(category: keyof Pick<BistroFinancialRecord, 'chefWages' | 'waiterWages' | 'cleanerWages' | 'wageDeficits' | 'furnitureTables' | 'furnitureChairs' | 'kitchenStoves' | 'decorWallpapers' | 'expansions' | 'staffHiring' | 'dishUpgrades'>, amount: number) {
    if (amount <= 0) return;
    this.shiftFinances[category] += amount;
    this.allTimeFinances[category] += amount;
    if (this.onFinancesUpdated) this.onFinancesUpdated(this.shiftFinances, this.allTimeFinances);
  }

  // Callbacks
  onCoinsEarned?: (amount: number) => void;
  onCashChanged?: (amount: number) => void;
  onTipCollected?: (amount: number) => void;
  onPopularityChange?: (val: number) => void;
  onRatingChange?: (rating: number) => void;
  onFiveStarReached?: () => void;
  onOrderSound?: () => void;
  onSizzleSound?: () => void;
  onServeSound?: () => void;
  onLevelUp?: (level: number, bonusCoins: number) => void;
  onXpGained?: (amount: number, currentXp: number, nextLevelXp: number) => void;
  onRestaurantExpanded?: (newSize: number, tierName: string) => void;
  onZoomChange?: (zoom: number) => void;
  onPayrollPaid?: (totalWages: number, staffCount: number, isDeficit: boolean) => void;
  onStaffUpdated?: (staffList: Actor[]) => void;
  onRecipesUpdated?: (recipes: Recipe[]) => void;
  onPantryUpdated?: (pantry: Map<IngredientId, number>) => void;
  onMarketUpdated?: (deals: MarketDeal[]) => void;
  onIngredientCollected?: (info: IngredientInfo, amount: number) => void;

  initStarterPantry() {
    this.pantry.clear();
  }

  getActiveRecipes(): Recipe[] {
    return this.recipes.filter(r => r.isActive && (r.unlockLevel || 1) <= this.level);
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  getRequiredIngredients(recipe: Recipe): { info: IngredientInfo; amount: number; has: number; satisfied: boolean }[] {
    const level = recipe.level;
    return (recipe.baseIngredients || []).map(req => {
      // Meaningful grind scaling per level: each level requires more ingredients
      const amountNeeded = Math.max(1, Math.round(req.amount * (1 + (level - 1) * 0.75)));
      const has = this.pantry.get(req.ingredientId) || 0;
      const info = INGREDIENT_CATALOG[req.ingredientId];
      return {
        info,
        amount: amountNeeded,
        has,
        satisfied: has >= amountNeeded
      };
    });
  }

  getRecipeUpgradeCost(recipe: Recipe): number {
    const base = recipe.basePrice || 3;
    return Math.floor(base * 4.5 * Math.pow(1.30, recipe.level - 1));
  }

  upgradeRecipe(id: string): { success: boolean; message: string; recipe?: Recipe } {
    const recipe = this.getRecipe(id);
    if (!recipe) {
      return { success: false, message: 'Recipe not found.' };
    }
    if (recipe.level >= 10) {
      return { success: false, message: `${recipe.name} is already at Max Level 10 Master Chef prestige!` };
    }
    const reqLevel = recipe.unlockLevel || 1;
    if (this.level < reqLevel) {
      return { success: false, message: `Requires Bistro Level ${reqLevel} to unlock this dish!` };
    }
    const cost = this.getRecipeUpgradeCost(recipe);
    if ((this.coins - cost) < this.creditLimit) {
      return { success: false, message: `Requires ${cost} 🪙! (Exceeds debt limit of ${this.creditLimit} 🪙)` };
    }

    const reqs = this.getRequiredIngredients(recipe);
    const missing = reqs.filter(r => !r.satisfied);
    if (missing.length > 0) {
      const missingText = missing.map(m => `${m.info.emoji} ${m.info.name} (Need ${m.amount - m.has} more)`).join(', ');
      return { success: false, message: `Missing Ingredients: ${missingText}` };
    }

    // Deduct ingredients
    reqs.forEach(r => {
      const cur = this.pantry.get(r.info.id) || 0;
      this.pantry.set(r.info.id, Math.max(0, cur - r.amount));
    });

    this.coins -= cost;
    this.recordExpense('dishUpgrades', cost);
    recipe.level += 1;
    const base = recipe.basePrice || 3;
    recipe.price = base + (recipe.level - 1) * Math.max(1, Math.floor(base * 0.45));
    recipe.prepTime = Math.max(2.5, +(recipe.prepTime * 0.95).toFixed(1));

    // Award XP & Star Rating
    this.gainXp(40 + recipe.level * 15);
    this.adjustRating(0.06, `+0.06 ⭐ ${recipe.name} Lv.${recipe.level}!`, this.canvas.width / 2, 80);
    this.saveGameState();

    if (this.onPantryUpdated) this.onPantryUpdated(this.pantry);
    if (this.onRecipesUpdated) this.onRecipesUpdated(this.recipes);

    return {
      success: true,
      message: `🎉 Cooked & Mastered ${recipe.name} to Level ${recipe.level}! Price is now ${recipe.price} 🪙!`,
      recipe
    };
  }

  addIngredient(id: IngredientId, amount = 1, showFloating = true, x?: number, y?: number) {
    const cur = this.pantry.get(id) || 0;
    this.pantry.set(id, cur + amount);
    this.saveGameState();
    const info = INGREDIENT_CATALOG[id];
    if (showFloating && info) {
      const fx = x !== undefined ? x : this.canvas.width / 2;
      const fy = y !== undefined ? y : 120;
      this.spawnFloatingText(`+${amount} ${info.emoji} ${info.name}!`, fx, fy, '#34d399');
    }
    if (this.onPantryUpdated) this.onPantryUpdated(this.pantry);
    if (this.onIngredientCollected && info) this.onIngredientCollected(info, amount);
  }

  spawnIngredientDrop(col: number, row: number, ingredientId?: IngredientId, isCrate = false) {
    if (!ingredientId) {
      const allIds = Object.keys(INGREDIENT_CATALOG) as IngredientId[];
      ingredientId = allIds[Math.floor(Math.random() * allIds.length)];
    }
    const drop: IngredientDrop = {
      id: `drop_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ingredientId,
      col,
      row,
      remainingTime: 28.0,
      maxTime: 28.0,
      isCrate
    };
    this.ingredientDrops.push(drop);
  }

  collectIngredientDrop(dropId: string): boolean {
    const idx = this.ingredientDrops.findIndex(d => d.id === dropId);
    if (idx === -1) return false;
    const drop = this.ingredientDrops.splice(idx, 1)[0];
    const pt = IsoUtils.gridToScreen(drop.col, drop.row, this.originX, this.originY);
    if (drop.isCrate) {
      const allIds = Object.keys(INGREDIENT_CATALOG) as IngredientId[];
      for (let i = 0; i < 3; i++) {
        const randId = allIds[Math.floor(Math.random() * allIds.length)];
        this.addIngredient(randId, 1, false);
      }
      this.spawnFloatingText(`📦 Supply Crate (+3 Ingredients)!`, pt.x, pt.y - 30, '#ffd166');
    } else {
      this.addIngredient(drop.ingredientId, 1, true, pt.x, pt.y - 30);
    }
    this.saveGameState();
    return true;
  }

  tradeIngredients(giveId: IngredientId, receiveId: IngredientId): { success: boolean; message: string } {
    if (giveId === receiveId) {
      return { success: false, message: 'Cannot trade an ingredient for itself!' };
    }
    const giveCount = this.pantry.get(giveId) || 0;
    if (giveCount < 2) {
      const giveInfo = INGREDIENT_CATALOG[giveId];
      return { success: false, message: `Need at least 2 ${giveInfo.emoji} ${giveInfo.name} to trade (you have ${giveCount})!` };
    }
    this.pantry.set(giveId, giveCount - 2);
    const recCount = this.pantry.get(receiveId) || 0;
    this.pantry.set(receiveId, recCount + 1);
    this.saveGameState();

    const giveInfo = INGREDIENT_CATALOG[giveId];
    const recInfo = INGREDIENT_CATALOG[receiveId];
    if (this.onPantryUpdated) this.onPantryUpdated(this.pantry);

    return {
      success: true,
      message: `🔄 Traded 2x ${giveInfo.emoji} ${giveInfo.name} for 1x ${recInfo.emoji} ${recInfo.name}!`
    };
  }

  restockMarket(): MarketDeal[] {
    const allIds = Object.keys(INGREDIENT_CATALOG) as IngredientId[];
    const shuffled = [...allIds].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 4);

    this.marketDeals = selected.map((id, index) => {
      const info = INGREDIENT_CATALOG[id];
      const amount = Math.random() < 0.6 ? 2 : 1;
      const coinPrice = Math.max(10, Math.floor(info.marketPrice * amount * (0.85 + Math.random() * 0.3)));
      return {
        id: `deal_${Date.now()}_${index}`,
        ingredientId: id,
        amount,
        coinPrice,
        isSoldOut: false
      };
    });

    if (this.onMarketUpdated) {
      this.onMarketUpdated(this.marketDeals);
    }
    return this.marketDeals;
  }

  buyMarketDeal(dealId: string): { success: boolean; message: string } {
    const deal = this.marketDeals.find(d => d.id === dealId);
    if (!deal) return { success: false, message: 'Deal expired or not found.' };
    if (deal.isSoldOut) return { success: false, message: 'This deal is already sold out!' };
    if ((this.coins - deal.coinPrice) < this.creditLimit) {
      return { success: false, message: `Need ${deal.coinPrice} 🪙! (Exceeds debt limit of ${this.creditLimit} 🪙)` };
    }

    this.coins -= deal.coinPrice;
    deal.isSoldOut = true;
    this.addIngredient(deal.ingredientId, deal.amount, false);
    const info = INGREDIENT_CATALOG[deal.ingredientId];
    this.spawnFloatingText(`+${deal.amount} ${info.emoji} ${info.name}!`, this.canvas.width / 2, 100, '#34d399');
    this.saveGameState();

    if (this.onCoinsEarned) this.onCoinsEarned(-deal.coinPrice);
    if (this.onMarketUpdated) this.onMarketUpdated(this.marketDeals);

    return {
      success: true,
      message: `🛒 Purchased ${deal.amount}x ${info.emoji} ${info.name} from Street Grocer!`
    };
  }

  toggleRecipeActive(id: string): { success: boolean; message: string; recipe?: Recipe } {
    const recipe = this.getRecipe(id);
    if (!recipe) {
      return { success: false, message: 'Recipe not found.' };
    }
    const reqLevel = recipe.unlockLevel || 1;
    if (this.level < reqLevel) {
      return { success: false, message: `Dish is locked until Bistro Level ${reqLevel}!` };
    }

    if (recipe.isActive) {
      const activeCount = this.getActiveRecipes().length;
      if (activeCount <= 1) {
        return { success: false, message: 'You must keep at least 1 dish on your menu so guests can order!' };
      }
      recipe.isActive = false;
    } else {
      recipe.isActive = true;
    }

    this.saveGameState();
    if (this.onRecipesUpdated) {
      this.onRecipesUpdated(this.recipes);
    }

    return {
      success: true,
      message: recipe.isActive ? `📖 Added ${recipe.name} to today's menu!` : `📖 Removed ${recipe.name} from menu.`,
      recipe
    };
  }

  calculatePrestige(): PrestigeBreakdown {
    const baseRating = 0.50;

    // 1. Expansion Score: +0.30 ⭐ per grid level above 6x6 (Starter = 6x6 -> 0.00)
    const expansionSteps = Math.max(0, this.gridSize - 6);
    const expansionScore = Math.min(1.20, expansionSteps * 0.30);

    // 2. Count placed items
    let tableCount = 0;
    let chairCount = 0;
    let decorCount = 0;
    let windowCount = 0;
    let wallpaperCount = 0;
    let floorStyledCount = 0;

    for (const [, placed] of this.placedItems) {
      const type = placed.item.type;
      if (type === 'table') {
        tableCount++;
      } else if (type === 'chair') {
        chairCount++;
      } else if (type === 'plant') {
        decorCount++;
      } else if (type === 'window') {
        windowCount++;
      } else if (type === 'wall') {
        wallpaperCount++;
      } else if (type === 'floor') {
        if (placed.item.pattern && placed.item.pattern !== 'wood') {
          floorStyledCount++;
        }
      }
    }

    // Complete dining sets: 1 table + at least 2 chairs
    const tableSetsCount = Math.min(tableCount, Math.floor(chairCount / 2));
    // Starter has 1 set -> 0.08 ⭐. Each additional dining set adds +0.08 ⭐ up to max +0.60 ⭐
    const seatingScore = Math.min(0.60, tableSetsCount * 0.08);

    // 3. Decor & Ambiance:
    // Starter has 1 plant (0.04) and 1 window (0.04) = 0.08.
    // Additional decor adds +0.06 ⭐ each, windows +0.04 ⭐ each, up to 0.80 ⭐ max.
    const decorScore = Math.min(0.80, decorCount * 0.06 + windowCount * 0.04);

    // 4. Wall & Floor Styling:
    const wallFloorScore = Math.min(0.40, wallpaperCount * 0.03 + Math.floor(floorStyledCount / 4) * 0.02);

    // 5. Culinary Score:
    // Recipes upgraded beyond Level 1
    let recipeLevelsSum = 0;
    for (const r of this.recipes) {
      if (r.level > 1) {
        recipeLevelsSum += (r.level - 1);
      }
    }
    const culinaryScore = Math.min(1.20, recipeLevelsSum * 0.08);

    // 6. Menu Diversity:
    const activeCategories = new Set<string>();
    for (const r of this.recipes) {
      if (r.isActive) {
        activeCategories.add(r.category);
      }
    }
    const diversityScore = Math.min(0.20, activeCategories.size * 0.05);

    const rawMax = baseRating + expansionScore + seatingScore + decorScore + wallFloorScore + culinaryScore + diversityScore;
    const maxRating = Math.min(5.00, Math.max(0.50, Math.round(rawMax * 100) / 100));

    return {
      baseRating,
      expansionScore,
      seatingScore,
      decorScore,
      wallFloorScore,
      culinaryScore,
      diversityScore,
      maxRating,
      tableSetsCount,
      decorCount: decorCount + windowCount,
      recipeLevelsSum
    };
  }

  adjustRating(delta: number, reasonText?: string, x?: number, y?: number) {
    const prestige = this.calculatePrestige();
    const oldRating = this.rating;

    // Positive rating gains are strictly capped by restaurant's current prestige ceiling
    let targetRating = this.rating + delta;
    if (delta > 0) {
      targetRating = Math.min(prestige.maxRating, targetRating);
    }
    this.rating = Math.max(0.50, Math.min(5.00, Math.round(targetRating * 100) / 100));

    let displayReason = reasonText;
    if (delta > 0 && oldRating >= prestige.maxRating) {
      displayReason = reasonText ? `${reasonText} (Prestige Cap)` : undefined;
    }

    if (displayReason && x !== undefined && y !== undefined) {
      const color = delta > 0 ? (oldRating >= prestige.maxRating ? '#94a3b8' : '#fbbf24') : '#f87171';
      this.spawnFloatingText(displayReason, x, y, color);
    }

    if (this.rating !== oldRating) {
      this.saveGameState();
      if (this.onRatingChange) this.onRatingChange(this.rating);
      if (this.onPopularityChange) this.onPopularityChange(this.popularity);

      if (oldRating < 5.0 && this.rating >= 5.0 && !this.hasReachedFiveStars) {
        this.hasReachedFiveStars = true;
        this.saveGameState();
        if (this.onFiveStarReached) this.onFiveStarReached();
      }
    }
  }

  addCash(amount: number) {
    this.cash += amount;
    this.saveGameState();
    if (this.onCashChanged) this.onCashChanged(this.cash);
    this.spawnFloatingText(`+${amount} 💵 Cash!`, this.canvas.width / 2, this.canvas.height / 2 - 40, '#10b981');
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    const loaded = this.loadGameState();
    // Force purge all starting ingredients so pantry is completely empty (0 ingredients)
    this.pantry.clear();
    const prestige = this.calculatePrestige();
    if (this.rating > prestige.maxRating) {
      this.rating = prestige.maxRating;
      if (this.rating < 5.0) this.hasReachedFiveStars = false;
    }
    this.saveGameState();
    this.handleResize();
    if (!loaded) {
      this.initDefaultRestaurant();
    }
    this.initStaff();
    this.repositionStackedStaff();
    this.setupListeners();
    this.startLoop();
  }

  getSerializedSaveData(): BistroSaveData {
    const placedArray: any[] = [];
    this.placedItems.forEach((val) => {
      placedArray.push({
        instanceId: val.instanceId,
        col: val.col,
        row: val.row,
        item: val.item
      });
    });

    const invArray: any[] = [];
    this.inventory.forEach((val, key) => {
      invArray.push({ key, item: val.item, quantity: val.quantity });
    });

    const staffArray = this.actors
      .filter(a => a.role === 'chef' || a.role === 'waiter' || a.role === 'cleaner')
      .map(a => ({
        id: a.id,
        name: a.name,
        role: a.role as StaffRole,
        col: a.col,
        row: a.row,
        color: a.color,
        hairColor: a.hairColor,
        avatarSrc: a.avatarSrc,
        wage: a.wage
      }));

    return {
      timestamp: Date.now(),
      version: 1,
      gridSize: this.gridSize,
      coins: this.coins,
      cash: this.cash,
      rating: this.rating,
      hasReachedFiveStars: this.hasReachedFiveStars,
      level: this.level,
      xp: this.xp,
      nextLevelXp: this.nextLevelXp,
      totalMealsServed: this.totalMealsServed,
      recipes: this.recipes.map(r => ({
        id: r.id,
        level: r.level,
        price: r.price,
        prepTime: r.prepTime,
        isActive: !!r.isActive,
        servingsCount: r.servingsCount ?? 0
      })),
      placedItems: placedArray,
      inventory: invArray,
      staff: staffArray,
      payrollTimer: this.payrollTimer,
      currentShiftNumber: this.currentShiftNumber,
      shiftFinances: this.shiftFinances,
      allTimeFinances: this.allTimeFinances,
      pantryFreshStart: 3,
      pantry: Array.from(this.pantry.entries())
    };
  }

  saveGameState(isImmediate: boolean = false) {
    try {
      const data = this.getSerializedSaveData();
      BistroCloudSave.getInstance().queueSave(data, isImmediate);
    } catch (e) {
      console.warn('Failed to save bistro state:', e);
    }
  }

  applyLoadedState(data: any): boolean {
    if (!data || typeof data.gridSize !== 'number') return false;

    this.gridSize = data.gridSize;
    this.coins = data.coins ?? 80;
    this.cash = typeof data.cash === 'number' ? data.cash : 25;
    this.rating = typeof data.rating === 'number' ? Math.min(5.0, Math.max(0.5, data.rating)) : 0.5;
    this.hasReachedFiveStars = !!data.hasReachedFiveStars;
    this.level = data.level ?? 1;
    this.xp = data.xp ?? 0;
    this.nextLevelXp = data.nextLevelXp ?? 150;
    this.totalMealsServed = data.totalMealsServed ?? 0;

    if (Array.isArray(data.recipes) && data.recipes.length > 0) {
      data.recipes.forEach((saved: any) => {
        const target = this.recipes.find(r => r.id === saved.id);
        if (target) {
          if (typeof saved.level === 'number') target.level = saved.level;
          if (typeof saved.price === 'number') target.price = saved.price;
          if (typeof saved.prepTime === 'number') target.prepTime = saved.prepTime;
          if (typeof saved.isActive === 'boolean') target.isActive = saved.isActive;
          if (typeof saved.servingsCount === 'number') target.servingsCount = saved.servingsCount;
        }
      });
    }

    if (Array.isArray(data.placedItems) && data.placedItems.length > 0) {
      this.placedItems.clear();
      data.placedItems.forEach((p: PlacedItem) => {
        this.placedItems.set(p.instanceId, p);
      });

      // Clean up legacy floor-placed doors and migrate to wall door
      const legacyFloorDoorKeys: string[] = [];
      let hasWallDoor = false;
      let migratedDoorItem: FurnitureItem | null = null;
      for (const [key, placed] of this.placedItems) {
        if (key.startsWith('door_')) {
          hasWallDoor = true;
        } else if (placed.item.type === 'door') {
          legacyFloorDoorKeys.push(key);
          if (!migratedDoorItem) migratedDoorItem = placed.item;
        }
      }
      legacyFloorDoorKeys.forEach(k => this.placedItems.delete(k));

      // Initialize default removable windows if not initialized before
      const hasWindowsInitialized = localStorage.getItem('bistro_windows_initialized');
      if (!hasWindowsInitialized) {
        const starterWin: FurnitureItem = {
          id: 'win_arched',
          name: 'Arched Bistro Window',
          type: 'window',
          price: 45,
          color: '#caf0f8',
          isWalkable: false,
          pattern: 'arched'
        };
        const w1 = 1;
        const w2 = Math.max(3, this.gridSize - 2);
        this.placedItems.set(`window_nw_${w1}`, { instanceId: `window_nw_${w1}`, col: 0, row: w1, item: { ...starterWin } });
        this.placedItems.set(`window_nw_${w2}`, { instanceId: `window_nw_${w2}`, col: 0, row: w2, item: { ...starterWin } });
        this.placedItems.set(`window_ne_${w1}`, { instanceId: `window_ne_${w1}`, col: w1, row: 0, item: { ...starterWin } });
        if (w2 !== 2) {
          this.placedItems.set(`window_ne_${w2}`, { instanceId: `window_ne_${w2}`, col: w2, row: 0, item: { ...starterWin } });
        }
        localStorage.setItem('bistro_windows_initialized', 'true');
      }

      // Ensure at least one entrance door is installed on the wall
      if (!hasWallDoor) {
        const doorIdx = Math.min(2, this.gridSize - 1);
        this.placedItems.delete(`window_ne_${doorIdx}`);
        const starterDoor: FurnitureItem = migratedDoorItem || {
          id: 'door_french',
          name: 'Classic French Door',
          type: 'door',
          price: 65,
          color: '#6b4c35',
          pattern: 'french',
          isWalkable: true
        };
        this.placedItems.set(`door_ne_${doorIdx}`, {
          instanceId: `door_ne_${doorIdx}`,
          col: doorIdx,
          row: 0,
          item: { ...starterDoor, isWalkable: true }
        });
      }
    }

    if (Array.isArray(data.inventory)) {
      this.inventory.clear();
      data.inventory.forEach((inv: any) => {
        this.inventory.set(inv.key, { item: inv.item, quantity: inv.quantity });
      });
    }

    // Restore Hired Staff Roster
    if (Array.isArray(data.staff) && data.staff.length > 0) {
      this.actors = this.actors.filter(a => a.role === 'customer');
      data.staff.forEach((s: any) => {
        const pt = IsoUtils.gridToScreen(s.col ?? 1, s.row ?? 1, this.originX, this.originY);
        this.actors.push({
          id: s.id,
          name: s.name,
          role: s.role,
          col: s.col ?? 1,
          row: s.row ?? 1,
          screenX: pt.x,
          screenY: pt.y,
          path: [],
          state: 'idle',
          stateTimer: 0,
          avatarSrc: s.avatarSrc || this.getStaffAvatar(s.role, s.id),
          color: s.color || '#3b82f6',
          hairColor: s.hairColor || '#2b2d42',
          energy: 100,
          patience: 100,
          wage: s.wage ?? this.getStaffWage(s.role)
        });
      });
      this.repositionStackedStaff();
    }

    if (typeof data.payrollTimer === 'number') {
      this.payrollTimer = data.payrollTimer;
    }

    if (typeof data.currentShiftNumber === 'number') {
      this.currentShiftNumber = data.currentShiftNumber;
    }
    if (data.allTimeFinances) {
      this.allTimeFinances = { ...this.createEmptyFinancialRecord(), ...data.allTimeFinances };
    }
    if (data.shiftFinances) {
      this.shiftFinances = { ...this.createEmptyFinancialRecord(), ...data.shiftFinances };
    }

    if (data.pantryFreshStart === 3 && Array.isArray(data.pantry)) {
      this.pantry = new Map(data.pantry);
    } else {
      this.pantry = new Map();
    }

    // Enforce prestige cap on loaded rating
    const prestige = this.calculatePrestige();
    if (this.rating > prestige.maxRating) {
      this.rating = prestige.maxRating;
      if (this.rating < 5.0) {
        this.hasReachedFiveStars = false;
      }
    }

    // Notify UI if callbacks exist
    if (this.onRatingChange) {
      this.onRatingChange(this.rating);
    }
    if (this.onStaffUpdated) {
      this.onStaffUpdated(this.actors.filter(a => a.role === 'chef' || a.role === 'waiter' || a.role === 'cleaner'));
    }
    if (this.onRecipesUpdated) {
      this.onRecipesUpdated(this.recipes);
    }
    if (this.onFinancesUpdated) {
      this.onFinancesUpdated(this.shiftFinances, this.allTimeFinances);
    }

    return true;
  }

  loadGameState(): boolean {
    try {
      const raw = localStorage.getItem('bistro_town_grind_save');
      if (!raw) return false;
      const data = JSON.parse(raw);
      return this.applyLoadedState(data);
    } catch (e) {
      console.warn('Failed to load bistro state:', e);
      return false;
    }
  }

  resetSave() {
    localStorage.removeItem('bistro_town_grind_save');
    location.reload();
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.baseOriginX = this.canvas.width / 2;
    this.baseOriginY = Math.max(140, Math.floor(this.canvas.height * 0.28));
    this.originX = this.baseOriginX + this.panOffsetX;
    this.originY = this.baseOriginY + this.panOffsetY;
  }

  screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    return {
      x: centerX + (screenX - centerX) / this.zoom,
      y: centerY + (screenY - centerY) / this.zoom
    };
  }

  setZoom(newZoom: number) {
    this.zoom = Math.max(0.6, Math.min(1.6, Math.round(newZoom * 100) / 100));
    if (this.onZoomChange) {
      this.onZoomChange(this.zoom);
    }
  }

  zoomIn() {
    this.setZoom(this.zoom + 0.15);
  }

  zoomOut() {
    this.setZoom(this.zoom - 0.15);
  }

  resetZoom() {
    this.setZoom(1.0);
  }

  private initDefaultRestaurant() {
    // Parquet Floor
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const floorItem: FurnitureItem = {
          id: 'wood_floor',
          name: 'Classic Parquet Floor',
          type: 'floor',
          price: 10,
          color: (c + r) % 2 === 0 ? '#deb887' : '#d2a679',
          isWalkable: true
        };
        this.placedItems.set(`floor_${c}_${r}`, {
          instanceId: `floor_${c}_${r}`,
          col: c,
          row: r,
          item: floorItem
        });
      }
    }

    // Entrance Door installed on Northeast Wall Section 2
    const doorIdx = Math.min(2, this.gridSize - 1);
    this.placedItems.set(`door_ne_${doorIdx}`, {
      instanceId: `door_ne_${doorIdx}`,
      col: doorIdx,
      row: 0,
      item: {
        id: 'door_french',
        name: 'Classic French Door',
        type: 'door',
        price: 65,
        color: '#6b4c35',
        pattern: 'french',
        isWalkable: true
      }
    });

    // Kitchen: 1 Gas Stove in corner (0, 0)
    this.placeItem(0, 0, {
      id: 'chef_stove_1',
      name: 'Pro Gas Stove',
      type: 'stove',
      price: 120,
      imageSrc: '/assets/furniture/stove.png',
      color: '#264653',
      isWalkable: false,
      isInteractive: true
    });

    // 1 Starter Dining Set: Table at (3, 2), 2 Velvet Chairs
    this.placeItem(3, 2, {
      id: 'dining_table_0',
      name: 'Mahogany Table',
      type: 'table',
      price: 40,
      imageSrc: '/assets/furniture/table.png',
      color: '#8b5a2b',
      isWalkable: false,
      isInteractive: true
    });

    this.placeItem(3, 1, {
      id: 'chair_top_0',
      name: 'Velvet Chair',
      type: 'chair',
      price: 20,
      imageSrc: '/assets/furniture/chair.png',
      color: '#e63946',
      isWalkable: true,
      isInteractive: true
    });

    this.placeItem(3, 3, {
      id: 'chair_bottom_0',
      name: 'Velvet Chair',
      type: 'chair',
      price: 20,
      imageSrc: '/assets/furniture/chair_back.png',
      color: '#e63946',
      isWalkable: true,
      isInteractive: true
    });

    // Starter plant in corner
    this.placeItem(0, 4, {
      id: 'fiddle_leaf_fig',
      name: 'Potted Fiddle Leaf',
      type: 'plant',
      price: 35,
      color: '#2a9d8f',
      isWalkable: false
    });

    // Starter Wall Windows (can be removed with Remove tool)
    const starterWin: FurnitureItem = {
      id: 'win_arched',
      name: 'Arched Bistro Window',
      type: 'window',
      price: 45,
      color: '#caf0f8',
      isWalkable: false,
      pattern: 'arched'
    };
    const w1 = 1;
    const w2 = Math.max(3, this.gridSize - 2);
    this.placedItems.set(`window_nw_${w1}`, { instanceId: `window_nw_${w1}`, col: 0, row: w1, item: { ...starterWin } });
    this.placedItems.set(`window_nw_${w2}`, { instanceId: `window_nw_${w2}`, col: 0, row: w2, item: { ...starterWin } });
    this.placedItems.set(`window_ne_${w1}`, { instanceId: `window_ne_${w1}`, col: w1, row: 0, item: { ...starterWin } });
    if (w2 !== 2) {
      this.placedItems.set(`window_ne_${w2}`, { instanceId: `window_ne_${w2}`, col: w2, row: 0, item: { ...starterWin } });
    }
    localStorage.setItem('bistro_windows_initialized', 'true');
  }

  private initStaff() {
    const hasStaff = this.actors.some(a => a.role === 'chef' || a.role === 'waiter' || a.role === 'cleaner');
    if (hasStaff) return;

    this.actors = this.actors.filter(a => a.role === 'customer');
    const chefPt = IsoUtils.gridToScreen(1, 0, this.originX, this.originY);
    // Chef Marco
    this.actors.push({
      id: 'chef_marco',
      name: 'Chef Marco',
      role: 'chef',
      col: 1,
      row: 0,
      screenX: chefPt.x,
      screenY: chefPt.y,
      path: [],
      state: 'idle',
      stateTimer: 0,
      avatarSrc: this.getStaffAvatar('chef', 0),
      color: '#ffffff',
      hairColor: '#2b2d42',
      energy: 100,
      patience: 100,
      wage: 8
    });

    const waiterPt = IsoUtils.gridToScreen(2, 2, this.originX, this.originY);
    // Waitress Clara
    this.actors.push({
      id: 'waiter_clara',
      name: 'Clara',
      role: 'waiter',
      col: 2,
      row: 2,
      screenX: waiterPt.x,
      screenY: waiterPt.y,
      path: [],
      state: 'idle',
      stateTimer: 1.0,
      avatarSrc: this.getStaffAvatar('waiter', 0),
      color: '#1d3557',
      hairColor: '#f4a261',
      energy: 100,
      patience: 100,
      wage: 5
    });
  }

  // Lookup base catalog price for an item
  getItemBasePrice(item: FurnitureItem): number {
    if (item.originalPrice && item.originalPrice > 0) return item.originalPrice;
    if (item.price && item.price > 0 && !item.isFromInventory) return item.price;

    const id = item.id || '';
    if (id.includes('pizza_oven')) return 250;
    if (id.includes('stove')) return 120;
    if (id.includes('round_table')) return 75;
    if (id.includes('table')) return 40;
    if (id.includes('chair')) return 20;
    if (id.includes('win_stained')) return 125;
    if (id.includes('win_modern')) return 95;
    if (id.includes('win_bay')) return 80;
    if (id.includes('win_shutter')) return 65;
    if (id.includes('win_arched')) return 45;
    if (id.includes('wall_modern')) return 110;
    if (id.includes('wall_damask')) return 85;
    if (id.includes('wall_brick')) return 60;
    if (id.includes('wall_floral')) return 50;
    if (id.includes('wall_stripes')) return 45;
    if (id.includes('wall_yellow')) return 35;
    if (id.includes('wall_sage')) return 25;
    if (id.includes('plant') || id.includes('fig')) return 35;
    if (id.includes('door_royal')) return 240;
    if (id.includes('door_glass')) return 120;
    if (id.includes('door_oak')) return 90;
    if (id.includes('door_cafe')) return 80;
    if (id.includes('door_french')) return 65;
    if (id.includes('entrance_mat')) return 20;
    if (id.includes('floor')) return 5;

    // Fallback by type
    if (item.type === 'stove') return 120;
    if (item.type === 'door') return 65;
    if (item.type === 'window') return 45;
    if (item.type === 'wall') return 35;
    if (item.type === 'table') return 40;
    if (item.type === 'chair') return 20;
    if (item.type === 'plant') return 35;
    if (item.type === 'floor') return 5;
    return 20;
  }

  // Calculate resale value (50% of base price, minimum 2 coins)
  getItemSellPrice(item: FurnitureItem): number {
    const base = this.getItemBasePrice(item);
    return Math.max(2, Math.floor(base * 0.5));
  }

  // Sell item from inventory
  sellInventoryItem(itemId: string, count: number = 1): { success: boolean; soldItem?: FurnitureItem; countSold?: number; coinsEarned?: number } {
    const entry = this.inventory.get(itemId);
    if (!entry || entry.quantity <= 0) {
      return { success: false };
    }

    const toSell = Math.min(count, entry.quantity);
    const unitPrice = this.getItemSellPrice(entry.item);
    const totalCoins = unitPrice * toSell;

    entry.quantity -= toSell;
    const soldItem = { ...entry.item };

    if (entry.quantity <= 0) {
      this.inventory.delete(itemId);
      if (this.selectedTool?.id === itemId) {
        this.selectedTool = null;
      }
    }

    this.coins += totalCoins;
    this.recordIncome('itemSales', totalCoins);
    this.saveGameState();

    if (this.onCoinsEarned) this.onCoinsEarned(totalCoins);
    if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));

    return { success: true, soldItem, countSold: toSell, coinsEarned: totalCoins };
  }

  placeItem(col: number, row: number, item: FurnitureItem) {
    const oldPrestige = this.calculatePrestige();
    const key = `${item.type === 'floor' ? 'floor' : 'item'}_${col}_${row}`;
    const basePrice = this.getItemBasePrice(item);
    const placed: PlacedItem = {
      instanceId: key,
      col,
      row,
      item: {
        ...item,
        originalPrice: item.originalPrice || basePrice,
        price: item.price > 0 && !item.isFromInventory ? item.price : basePrice,
        isFromInventory: undefined
      }
    };
    this.placedItems.set(key, placed);
    const newPrestige = this.calculatePrestige();
    if (newPrestige.maxRating > oldPrestige.maxRating) {
      const pt = IsoUtils.gridToScreen(col, row, this.originX, this.originY);
      this.spawnFloatingText(`⭐ Prestige Cap: ${newPrestige.maxRating.toFixed(1)} ⭐`, pt.x, pt.y - 20, '#38bdf8');
      if (this.onRatingChange) this.onRatingChange(this.rating);
    }
    this.saveGameState();
    return placed;
  }

  getItemAt(col: number, row: number): PlacedItem | null {
    const itemKey = `item_${col}_${row}`;
    return this.placedItems.get(itemKey) || null;
  }

  // Remove placed item and store into player inventory
  removeItemToInventory(itemToStash?: PlacedItem) {
    const target = itemToStash || this.selectedPlacedItem;
    if (!target) return;

    this.placedItems.delete(target.instanceId);
    
    // Add to inventory map
    const invKey = target.item.id;
    const basePrice = this.getItemBasePrice(target.item);
    const existing = this.inventory.get(invKey);
    if (existing) {
      existing.quantity += 1;
      existing.item.originalPrice = basePrice;
      existing.item.price = basePrice;
    } else {
      this.inventory.set(invKey, { 
        item: { ...target.item, originalPrice: basePrice, price: basePrice }, 
        quantity: 1 
      });
    }

    const newPrestige = this.calculatePrestige();
    if (this.rating > newPrestige.maxRating) {
      this.rating = newPrestige.maxRating;
      if (this.rating < 5.0) this.hasReachedFiveStars = false;
      if (this.onRatingChange) this.onRatingChange(this.rating);
    }

    this.selectedPlacedItem = null;
    this.activeMovingItem = null;
    this.saveGameState();
    if (this.onSelectedItemChange) this.onSelectedItemChange(null);
    if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
  }

  // Rotate selected item (90 degrees, or flip/swap angle)
  rotateSelectedItem() {
    if (!this.selectedPlacedItem) return;
    const { item } = this.selectedPlacedItem;

    if (item.type === 'chair') {
      // Toggle between front-facing and back-facing chair sprite
      if (item.imageSrc?.includes('chair_back.png')) {
        item.imageSrc = '/assets/furniture/chair.png';
        item.flipX = false;
      } else if (!item.flipX) {
        item.flipX = true;
      } else {
        item.imageSrc = '/assets/furniture/chair_back.png';
        item.flipX = false;
      }
    } else {
      // General 90 degree step
      item.rotation = ((item.rotation || 0) + 90) % 360;
      item.flipX = !item.flipX;
    }
    this.saveGameState();
  }

  // Pick up placed item to move to another tile
  startMoveItem() {
    if (!this.selectedPlacedItem) return;
    this.activeMovingItem = this.selectedPlacedItem;
    // Temporarily remove from placedItems map so player can place at new spot
    this.placedItems.delete(this.selectedPlacedItem.instanceId);
  }

  isCellWalkable(col: number, row: number): boolean {
    if (col < 0 || row < 0 || col >= this.gridSize || row >= this.gridSize) return false;
    for (const [key, placed] of this.placedItems) {
      if (key.startsWith('wall_') || key.startsWith('window_') || key.startsWith('door_')) {
        continue;
      }
      if (placed.col === col && placed.row === row && !placed.item.isWalkable) {
        return false;
      }
    }
    return true;
  }

  private findAvailableChair(): PlacedItem | null {
    for (const [, placed] of this.placedItems) {
      if (placed.item.type === 'chair') {
        const isOccupied = this.actors.some(a => a.assignedChairId === placed.instanceId);
        if (!isOccupied) return placed;
      }
    }
    return null;
  }

  getEntranceDoors(): { col: number; row: number; item?: FurnitureItem }[] {
    const doors: { col: number; row: number; item?: FurnitureItem }[] = [];
    for (const [key, placed] of this.placedItems) {
      if (key.startsWith('door_nw_')) {
        const r = parseInt(key.replace('door_nw_', ''), 10);
        doors.push({ col: 0, row: r, item: placed.item });
      } else if (key.startsWith('door_ne_')) {
        const c = parseInt(key.replace('door_ne_', ''), 10);
        doors.push({ col: c, row: 0, item: placed.item });
      } else if (placed.item.type === 'door') {
        doors.push({ col: placed.col, row: placed.row, item: placed.item });
      }
    }
    if (doors.length === 0) {
      const defaultIdx = Math.min(2, this.gridSize - 1);
      doors.push({ col: defaultIdx, row: 0 });
    }
    return doors;
  }

  getRandomEntranceDoor(): { col: number; row: number; item?: FurnitureItem } {
    const doors = this.getEntranceDoors();
    return doors[Math.floor(Math.random() * doors.length)];
  }

  private findAvailableTablePair(): { table: PlacedItem; chair1: PlacedItem; chair2: PlacedItem } | null {
    for (const [, table] of this.placedItems) {
      if (table.item.type !== 'table') continue;

      const adjacentChairs: PlacedItem[] = [];
      for (const [, chair] of this.placedItems) {
        if (chair.item.type !== 'chair') continue;
        const dist = Math.abs(chair.col - table.col) + Math.abs(chair.row - table.row);
        if (dist === 1) {
          const isOccupied = this.actors.some(a => a.assignedChairId === chair.instanceId);
          if (!isOccupied) {
            adjacentChairs.push(chair);
          }
        }
      }

      if (adjacentChairs.length >= 2) {
        return { table, chair1: adjacentChairs[0], chair2: adjacentChairs[1] };
      }
    }
    return null;
  }

  private spawnSoloCustomer(chair: PlacedItem, entranceCol: number, entranceRow: number, entrancePt: { x: number; y: number }) {
    if (this.onCustomerEnter) this.onCustomerEnter();

    const customerColors = ['#f3722c', '#f8961e', '#90be6d', '#43aa8b', '#577590', '#b5179e'];
    const randomColor = customerColors[Math.floor(Math.random() * customerColors.length)];

    const activeDishes = this.getActiveRecipes();
    const dish = activeDishes.length > 0 
      ? activeDishes[Math.floor(Math.random() * activeDishes.length)]
      : this.recipes[0];

    const customer: Actor = {
      id: `cust_${Date.now()}_${Math.floor(Math.random() * 100)}`,
      name: 'Guest',
      role: 'customer',
      col: entranceCol,
      row: entranceRow,
      screenX: entrancePt.x,
      screenY: entrancePt.y,
      entranceCol,
      entranceRow,
      state: 'walking_to_seat',
      stateTimer: 0,
      color: randomColor,
      hairColor: '#333333',
      energy: 100,
      patience: 100,
      patienceMax: 40.0,
      assignedChairId: chair.instanceId,
      assignedDish: dish,
      path: Pathfinding.findPath(
        { col: entranceCol, row: entranceRow },
        { col: chair.col, row: chair.row },
        (c, r) => this.isCellWalkable(c, r),
        this.gridSize
      )
    };

    this.actors.push(customer);
  }

  private spawnCoupleDiners(chair1: PlacedItem, chair2: PlacedItem, entranceCol: number, entranceRow: number, entrancePt: { x: number; y: number }) {
    if (this.onCustomerEnter) this.onCustomerEnter();

    const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];
    const c1Color = colors[Math.floor(Math.random() * colors.length)];
    const c2Color = colors[Math.floor(Math.random() * colors.length)];

    const id1 = `couple_${Date.now()}_1`;
    const id2 = `couple_${Date.now()}_2`;

    const activeDishes = this.getActiveRecipes();
    const dish1 = activeDishes.length > 0 ? activeDishes[Math.floor(Math.random() * activeDishes.length)] : this.recipes[0];
    const dish2 = activeDishes.length > 0 ? activeDishes[Math.floor(Math.random() * activeDishes.length)] : this.recipes[0];

    const customer1: Actor = {
      id: id1,
      name: 'Couple Guest A',
      role: 'customer',
      col: entranceCol,
      row: entranceRow,
      screenX: entrancePt.x,
      screenY: entrancePt.y,
      entranceCol,
      entranceRow,
      state: 'walking_to_seat',
      stateTimer: 0,
      color: c1Color,
      hairColor: '#2b2d42',
      energy: 100,
      patience: 100,
      patienceMax: 45.0,
      partnerId: id2,
      isCouple: true,
      talkBubbleTimer: 4.0 + Math.random() * 3.0,
      assignedChairId: chair1.instanceId,
      assignedDish: dish1,
      path: Pathfinding.findPath(
        { col: entranceCol, row: entranceRow },
        { col: chair1.col, row: chair1.row },
        (c, r) => this.isCellWalkable(c, r),
        this.gridSize
      )
    };

    const customer2: Actor = {
      id: id2,
      name: 'Couple Guest B',
      role: 'customer',
      col: entranceCol,
      row: entranceRow,
      screenX: entrancePt.x + 12,
      screenY: entrancePt.y + 6,
      entranceCol,
      entranceRow,
      state: 'walking_to_seat',
      stateTimer: 0,
      color: c2Color,
      hairColor: '#e07a5f',
      energy: 100,
      patience: 100,
      patienceMax: 45.0,
      partnerId: id1,
      isCouple: true,
      talkBubbleTimer: 6.0 + Math.random() * 3.0,
      assignedChairId: chair2.instanceId,
      assignedDish: dish2,
      path: Pathfinding.findPath(
        { col: entranceCol, row: entranceRow },
        { col: chair2.col, row: chair2.row },
        (c, r) => this.isCellWalkable(c, r),
        this.gridSize
      )
    };

    this.actors.push(customer1, customer2);
    this.spawnFloatingText('🥂 Dining Couple Arrived!', entrancePt.x, entrancePt.y - 32, '#f43f5e');
  }

  private spawnWalkawayCustomer(entranceCol: number, entranceRow: number, entrancePt: { x: number; y: number }, isCouple: boolean) {
    const customerColors = ['#f3722c', '#f8961e', '#90be6d', '#43aa8b', '#577590', '#b5179e'];
    const randomColor = customerColors[Math.floor(Math.random() * customerColors.length)];

    const walkawayActor: Actor = {
      id: `walkaway_${Date.now()}_${Math.floor(Math.random() * 100)}`,
      name: isCouple ? 'Missed Couple' : 'Missed Diner',
      role: 'customer',
      col: entranceCol,
      row: entranceRow,
      screenX: entrancePt.x,
      screenY: entrancePt.y,
      entranceCol,
      entranceRow,
      state: 'walkaway_no_seats',
      stateTimer: 1.8,
      walkawayTimer: 1.8,
      walkawayEmote: isCouple ? '💔 No Table for 2!' : '😤 No Tables!',
      color: randomColor,
      hairColor: '#333333',
      energy: 100,
      patience: 0,
      path: []
    };

    this.actors.push(walkawayActor);

    this.spawnFloatingText(
      isCouple ? '💔 Missed Couple (Need 2-Seat Table)' : '🪑 Missed Customer (No Seats)',
      entrancePt.x,
      entrancePt.y - 36,
      '#f87171'
    );
  }

  private spawnCustomer() {
    const isCoupleRoll = Math.random() < 0.40; // 40% chance of a couple/pair!
    const door = this.getRandomEntranceDoor();
    const entranceCol = door.col;
    const entranceRow = door.row;
    const entrancePt = IsoUtils.gridToScreen(entranceCol, entranceRow, this.originX, this.originY);

    if (isCoupleRoll) {
      const pair = this.findAvailableTablePair();
      if (pair) {
        this.spawnCoupleDiners(pair.chair1, pair.chair2, entranceCol, entranceRow, entrancePt);
        return;
      }
      // If couple cannot find a 2-seat table, check if at least a solo diner can enter
      const singleChair = this.findAvailableChair();
      if (singleChair) {
        this.spawnSoloCustomer(singleChair, entranceCol, entranceRow, entrancePt);
        return;
      }
      // No seats at all for couple!
      this.spawnWalkawayCustomer(entranceCol, entranceRow, entrancePt, true);
      return;
    }

    // Solo Diner roll
    const chair = this.findAvailableChair();
    if (chair) {
      this.spawnSoloCustomer(chair, entranceCol, entranceRow, entrancePt);
      return;
    }

    // No seats for solo diner!
    this.spawnWalkawayCustomer(entranceCol, entranceRow, entrancePt, false);
  }

  private updateSimulation(dt: number) {
    // 0. Update City Environment (clouds, vehicles, strollers)
    this.city.update(dt, this.canvas.width);

    // Periodic Auto-Save
    this.autoSaveTimer -= dt;
    if (this.autoSaveTimer <= 0) {
      this.autoSaveTimer = 8.0;
      this.saveGameState();
    }

    // Update Table Tips (15-second expiration countdown)
    for (let i = this.tableTips.length - 1; i >= 0; i--) {
      const tip = this.tableTips[i];
      tip.remainingTime -= dt;
      if (tip.remainingTime <= 0) {
        // Expired after 15 seconds without being clicked - diner tip is lost!
        const pt = IsoUtils.gridToScreen(tip.col, tip.row, this.originX, this.originY);
        this.adjustRating(-0.02, '-0.02 ⭐ Expired Tip', pt.x, pt.y - 24);
        this.tableTips.splice(i, 1);
      }
    }

    // Update Ingredient Mystery Gift Drops (25s expiration countdown)
    for (let i = this.ingredientDrops.length - 1; i >= 0; i--) {
      const drop = this.ingredientDrops[i];
      drop.remainingTime -= dt;
      if (drop.remainingTime <= 0) {
        this.ingredientDrops.splice(i, 1);
      }
    }

    // Update Floating Text animations (+1 Cash, etc.)
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 28 * dt;
      ft.lifetime -= dt;
      ft.alpha = Math.max(0, ft.lifetime / ft.maxLifetime);
      if (ft.lifetime <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Tactical Staff Wages / Shift Bill Cycle (every 60s)
    this.payrollTimer -= dt;
    if (this.payrollTimer <= 0) {
      this.payrollTimer = this.maxPayrollTimer;
      this.currentShiftNumber += 1;
      this.shiftFinances = this.createEmptyFinancialRecord();

      const staffList = this.getStaffList();
      const totalWages = this.getTotalShiftWages();
      if (staffList.length > 0) {
        // Full wage deduction allows coins to go negative into debt (e.g. 0 - 14 = -14)
        this.coins -= totalWages;
        staffList.forEach(s => {
          if (s.role === 'chef') this.recordExpense('chefWages', s.wage || 8);
          else if (s.role === 'waiter') this.recordExpense('waiterWages', s.wage || 5);
          else if (s.role === 'cleaner') this.recordExpense('cleanerWages', s.wage || 4);
        });
        this.saveGameState();

        const isDeficit = this.coins < 0;
        const msg = isDeficit
          ? `-${totalWages} 🪙 (Staff Wages - Debt: ${this.coins} 🪙)`
          : `-${totalWages} 🪙 (Staff Wages)`;
        this.spawnFloatingText(msg, this.canvas.width / 2, 90, '#f87171');
        if (this.onPayrollPaid) {
          this.onPayrollPaid(totalWages, staffList.length, isDeficit);
        }
      }
    }

    // 1. Spawning (interval dynamically speeds up as star rating climbs from 0.5 to 5.0)
    this.customerSpawnTimer -= dt;
    if (this.customerSpawnTimer <= 0) {
      const ratingFactor = (this.rating - 0.5) / 4.5;
      const baseDelay = 14.0 - ratingFactor * 8.5;
      this.customerSpawnTimer = baseDelay + Math.random() * 3.0;
      this.spawnCustomer();
    }

    // 2. Chef Cooking (cooking tickets bounded by number of functional stoves, stations each chef at their stove!)
    const stoves = Array.from(this.placedItems.values()).filter(p => p.item.type === 'stove');
    const chefs = this.actors.filter(a => a.role === 'chef');

    chefs.forEach((chef, index) => {
      // Station this chef in front of stove if one is available
      if (index < stoves.length) {
        const myStove = stoves[index];
        const frontNeighbors = [
          { col: myStove.col, row: myStove.row + 1 },
          { col: myStove.col + 1, row: myStove.row },
          { col: myStove.col, row: Math.max(0, myStove.row - 1) },
          { col: Math.max(0, myStove.col - 1), row: myStove.row }
        ].filter(n => this.isCellWalkable(n.col, n.row));

        if (frontNeighbors.length > 0) {
          const station = frontNeighbors[0];
          if (chef.path.length === 0 && (chef.col !== station.col || chef.row !== station.row)) {
            const p = Pathfinding.findPath(
              { col: chef.col, row: chef.row },
              station,
              (c, r) => this.isCellWalkable(c, r),
              this.gridSize
            );
            if (p.length > 0) {
              chef.path = p;
            } else {
              chef.col = station.col;
              chef.row = station.row;
              const pt = IsoUtils.gridToScreen(station.col, station.row, this.originX, this.originY);
              chef.screenX = pt.x;
              chef.screenY = pt.y;
            }
          }
        }
      }

      // Stoves constraint: Each chef requires their own stove to cook in parallel!
      if (index >= stoves.length) {
        chef.state = 'idle';
        return;
      }

      let myTicket = this.cookingTickets.find(t => !t.isReady && t.chefId === chef.id);
      if (!myTicket) {
        myTicket = this.cookingTickets.find(t => !t.isReady && !t.chefId);
        if (myTicket) {
          myTicket.chefId = chef.id;
          myTicket.stoveCol = stoves[index].col;
          myTicket.stoveRow = stoves[index].row;
        }
      }

      if (myTicket) {
        chef.state = 'cooking';
        myTicket.prepProgress += dt / myTicket.dish.prepTime;
        if (myTicket.prepProgress >= 1.0) {
          myTicket.isReady = true;
          myTicket.chefId = undefined;
          chef.state = 'idle';
          if (this.onSizzleSound) this.onSizzleSound();
        }
      } else {
        chef.state = 'idle';
      }
    });

    // 3. Waiter Logic (supports multiple waiters attending to diners concurrently)
    const waiters = this.actors.filter(a => a.role === 'waiter');
    for (const waiter of waiters) {
      this.updateWaiterAI(waiter, dt);
    }

    // 4. Cleaner Logic (cleans and sanitizes dirty tables)
    const cleaners = this.actors.filter(a => a.role === 'cleaner');
    for (const cleaner of cleaners) {
      this.updateCleanerAI(cleaner, dt);
    }

    // 5. Update Actor Positions at a natural, steady walk speed
    for (let i = this.actors.length - 1; i >= 0; i--) {
      const actor = this.actors[i];
      if (actor.screenX === 0 && actor.screenY === 0) {
        const pt = IsoUtils.gridToScreen(actor.col, actor.row, this.originX, this.originY);
        actor.screenX = pt.x;
        actor.screenY = pt.y;
      }

      if (actor.path.length > 0) {
        const next = actor.path[0];
        const nextScreen = IsoUtils.gridToScreen(next.col, next.row, this.originX, this.originY);
        const dx = nextScreen.x - actor.screenX;
        const dy = nextScreen.y - actor.screenY;
        const dist = Math.hypot(dx, dy);

        // Gentle, charming walking speed (Playfish Restaurant City style)
        // Workers: 56 px/sec (~0.8s per tile), Customers: 46 px/sec (~1.0s per tile)
        const walkSpeed = actor.role === 'customer' ? 46 : 56;
        const step = walkSpeed * dt;

        if (dist <= step || dist < 2.5) {
          actor.screenX = nextScreen.x;
          actor.screenY = nextScreen.y;
          actor.col = next.col;
          actor.row = next.row;
          actor.path.shift();
        } else {
          actor.screenX += (dx / dist) * step;
          actor.screenY += (dy / dist) * step;
        }
      } else {
        const targetScreen = IsoUtils.gridToScreen(actor.col, actor.row, this.originX, this.originY);
        actor.screenX = targetScreen.x;
        actor.screenY = targetScreen.y;
      }

      if (actor.role === 'customer') {
        const door = this.getRandomEntranceDoor();
        const exitCol = actor.entranceCol ?? door.col;
        const exitRow = actor.entranceRow ?? door.row;

        // Couples occasional conversation emotes while dining
        if (actor.isCouple && (actor.state === 'waiting_to_order' || actor.state === 'waiting_for_food' || actor.state === 'eating')) {
          if (actor.talkBubbleTimer !== undefined) {
            actor.talkBubbleTimer -= dt;
            if (actor.talkBubbleTimer <= 0) {
              actor.talkBubbleTimer = 5.0 + Math.random() * 6.0;
              const icons = ['❤️', '🍷', '🥂', '💬', '✨'];
              actor.talkBubbleIcon = icons[Math.floor(Math.random() * icons.length)];
              setTimeout(() => { if (actor) actor.talkBubbleIcon = undefined; }, 2200);
            }
          }
        }

        if (actor.state === 'walkaway_no_seats') {
          actor.stateTimer -= dt;
          if (actor.stateTimer <= 0) {
            actor.state = 'leaving';
            // Walk away out of the restaurant towards the street edge
            actor.path = [
              { col: exitCol, row: exitRow },
              { col: -1, row: exitRow }
            ];
          }
        } else if (actor.state === 'walking_to_seat' && actor.path.length === 0) {
          actor.state = 'waiting_to_order';
          actor.patienceMax = 40.0;
          actor.stateTimer = 40.0;
        } else if (actor.state === 'waiting_to_order') {
          actor.stateTimer -= dt;
          actor.patience = Math.max(0, (actor.stateTimer / (actor.patienceMax || 40.0)) * 100);
          if (actor.stateTimer <= 0) {
            this.adjustRating(-0.06, '-0.06 ⭐ Slow Waiter!', actor.screenX, actor.screenY - 30);
            this.spawnFloatingText('😤 Walked Out (Slow Waiter)!', actor.screenX, actor.screenY - 15, '#ef4444');
            actor.state = 'leaving';
            actor.assignedChairId = undefined;
            actor.path = Pathfinding.findPath(
              { col: actor.col, row: actor.row },
              { col: exitCol, row: exitRow },
              (c, r) => this.isCellWalkable(c, r),
              this.gridSize
            );
          }
        } else if (actor.state === 'waiting_for_food') {
          actor.stateTimer -= dt;
          actor.patience = Math.max(0, (actor.stateTimer / (actor.patienceMax || 55.0)) * 100);
          if (actor.stateTimer <= 0) {
            this.adjustRating(-0.08, '-0.08 ⭐ Kitchen Too Slow!', actor.screenX, actor.screenY - 30);
            this.spawnFloatingText('😡 Walked Out (Kitchen Too Slow)!', actor.screenX, actor.screenY - 15, '#ef4444');
            const ticketIdx = this.cookingTickets.findIndex(t => t.customerId === actor.id);
            if (ticketIdx !== -1) this.cookingTickets.splice(ticketIdx, 1);
            actor.state = 'leaving';
            actor.assignedChairId = undefined;
            actor.path = Pathfinding.findPath(
              { col: actor.col, row: actor.row },
              { col: exitCol, row: exitRow },
              (c, r) => this.isCellWalkable(c, r),
              this.gridSize
            );
          }
        } else if (actor.state === 'eating') {
          actor.stateTimer -= dt;
          if (actor.stateTimer <= 0) {
            const pay = actor.assignedDish ? actor.assignedDish.price : 3;
            this.coins += pay;
            const dishCat = actor.assignedDish?.category || 'main';
            if (dishCat === 'starter') this.recordIncome('starterSales', pay);
            else if (dishCat === 'main') this.recordIncome('mainSales', pay);
            else if (dishCat === 'dessert') this.recordIncome('dessertSales', pay);
            else if (dishCat === 'drink') this.recordIncome('drinkSales', pay);
            else this.recordIncome('mainSales', pay);
            this.totalMealsServed += 1;
            if (actor.assignedDish) {
              const matched = this.recipes.find(r => r.id === actor.assignedDish!.id);
              if (matched) {
                matched.servingsCount = (matched.servingsCount || 0) + 1;
              }
            }
            const xpEarned = Math.max(1, Math.floor(pay / 2));
            this.gainXp(xpEarned);
            if (this.onCoinsEarned) this.onCoinsEarned(pay);

            // Romantic couple bonus tip!
            if (actor.isCouple) {
              const coupleBonus = Math.max(2, Math.floor(pay * 0.5));
              this.coins += coupleBonus;
              this.recordIncome('bonuses', coupleBonus);
              this.spawnFloatingText(`+${coupleBonus} 🪙 Couple Tip! ❤️`, actor.screenX, actor.screenY - 45, '#f43f5e');
            }

            // Diner leaves a small tip coin on the table that expires in 15 seconds!
            this.spawnTableTip(actor.col, actor.row);

            // Rare culinary drop: 15% chance total for an authentic restaurant grind
            if (Math.random() < 0.15) {
              if (Math.random() < 0.35) {
                // Rare mystery gift on table
                this.spawnIngredientDrop(actor.col, actor.row);
              } else {
                // Direct ingredient drop from meal
                if (actor.assignedDish && actor.assignedDish.baseIngredients && actor.assignedDish.baseIngredients.length > 0) {
                  const targetReqs = actor.assignedDish.baseIngredients;
                  const chosen = targetReqs[Math.floor(Math.random() * targetReqs.length)];
                  this.addIngredient(chosen.ingredientId as IngredientId, 1, true, actor.screenX, actor.screenY - 26);
                } else {
                  const allIds = Object.keys(INGREDIENT_CATALOG) as IngredientId[];
                  const randId = allIds[Math.floor(Math.random() * allIds.length)];
                  this.addIngredient(randId, 1, true, actor.screenX, actor.screenY - 26);
                }
              }
            }

            // Table becomes dirty after meal
            for (const [, placed] of this.placedItems) {
              if (placed.item.type === 'table') {
                const dist = Math.abs(placed.col - actor.col) + Math.abs(placed.row - actor.row);
                if (dist === 1) {
                  placed.isDirty = true;
                  break;
                }
              }
            }

            // Boost star rating for satisfied diner (capped by restaurant prestige)!
            this.adjustRating(0.005, '+0.01 ⭐ Diner Delighted', actor.screenX, actor.screenY - 30);

            this.saveGameState();
            actor.state = 'leaving';
            actor.assignedChairId = undefined;
            actor.path = Pathfinding.findPath(
              { col: actor.col, row: actor.row },
              { col: exitCol, row: exitRow },
              (c, r) => this.isCellWalkable(c, r),
              this.gridSize
            );
          }
        } else if (actor.state === 'leaving' && actor.path.length === 0) {
          this.actors.splice(i, 1);
        }
      }
    }
  }

  private updateWaiterAI(waiter: Actor, dt: number) {
    // 1. If currently taking order, count down timer
    if (waiter.state === 'taking_order') {
      waiter.stateTimer -= dt;
      if (waiter.stateTimer <= 0) {
        const targetCust = this.actors.find(a => a.id === waiter.targetCustomerId);
        if (targetCust && targetCust.assignedDish) {
          targetCust.state = 'waiting_for_food';
          targetCust.patienceMax = 55.0;
          targetCust.stateTimer = 55.0; // 55s patience for cooking and delivery

          const stoves = Array.from(this.placedItems.values()).filter(p => p.item.type === 'stove');
          const stoveCol = stoves.length > 0 ? stoves[0].col : 1;
          const stoveRow = stoves.length > 0 ? stoves[0].row : 1;

          this.cookingTickets.push({
            ticketId: `t_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            customerId: targetCust.id,
            tableCol: targetCust.col,
            tableRow: targetCust.row,
            dish: targetCust.assignedDish,
            stoveCol,
            stoveRow,
            prepProgress: 0,
            isReady: false
          });
          if (this.onOrderSound) this.onOrderSound();
        }
        waiter.state = 'idle';
        waiter.targetCustomerId = undefined;
      }
      return;
    }

    // 2. If waiter is walking, let them finish moving
    if (waiter.path.length > 0) return;

    // 3. Arrived at destination! Process state transitions:
    if (waiter.state === 'walking_to_order') {
      waiter.state = 'taking_order';
      waiter.stateTimer = 1.6;
      if (this.onOrderSound) this.onOrderSound();
      return;
    }

    if (waiter.state === 'walking_to_stove') {
      const ticket = this.cookingTickets.find(t => t.isReady && (t.claimedByWaiterId === waiter.id || !t.claimedByWaiterId));
      if (ticket) {
        const ticketIdx = this.cookingTickets.indexOf(ticket);
        this.cookingTickets.splice(ticketIdx, 1);
        waiter.carriedDish = ticket.dish;
        waiter.targetCustomerId = ticket.customerId;
        waiter.state = 'walking_to_serve';

        const cust = this.actors.find(a => a.id === ticket.customerId);
        const targetCol = cust ? cust.col : ticket.tableCol;
        const targetRow = cust ? cust.row : ticket.tableRow;

        const serveNeighbors = [
          { col: targetCol, row: targetRow },
          { col: targetCol + 1, row: targetRow },
          { col: targetCol - 1, row: targetRow },
          { col: targetCol, row: targetRow + 1 },
          { col: targetCol, row: targetRow - 1 }
        ].filter(n => this.isCellWalkable(n.col, n.row));

        const serveDest = serveNeighbors.length > 0 ? serveNeighbors[0] : { col: targetCol, row: targetRow };
        waiter.path = Pathfinding.findPath(
          { col: waiter.col, row: waiter.row },
          serveDest,
          (c, r) => this.isCellWalkable(c, r),
          this.gridSize
        );
      } else {
        waiter.state = 'idle';
      }
      return;
    }

    if (waiter.state === 'walking_to_serve') {
      const targetCust = this.actors.find(a => a.id === waiter.targetCustomerId);
      if (targetCust) {
        targetCust.state = 'eating';
        targetCust.stateTimer = 8.5;
        if (this.onServeSound) this.onServeSound();
      }
      waiter.carriedDish = undefined;
      waiter.targetCustomerId = undefined;
      waiter.state = 'idle';
      return;
    }

    // 4. Waiter is IDLE: Task dispatching
    // Task A: Ready food in kitchen (claimed by only 1 waiter at a time!)
    const unclaimedReadyTicket = this.cookingTickets.find(t => t.isReady && !t.claimedByWaiterId);
    if (unclaimedReadyTicket && !waiter.carriedDish) {
      unclaimedReadyTicket.claimedByWaiterId = waiter.id;
      waiter.state = 'walking_to_stove';

      const stoves = Array.from(this.placedItems.values()).filter(p => p.item.type === 'stove');
      const targetStove = stoves.find(s => s.col === unclaimedReadyTicket.stoveCol && s.row === unclaimedReadyTicket.stoveRow) || stoves[0];
      const stoveNeighbors = targetStove ? [
        { col: targetStove.col, row: targetStove.row + 1 },
        { col: targetStove.col + 1, row: targetStove.row },
        { col: targetStove.col, row: Math.max(0, targetStove.row - 1) },
        { col: Math.max(0, targetStove.col - 1), row: targetStove.row }
      ].filter(n => this.isCellWalkable(n.col, n.row)) : [];

      const stoveDest = stoveNeighbors.length > 0 ? stoveNeighbors[0] : { col: 1, row: 1 };
      const path = Pathfinding.findPath(
        { col: waiter.col, row: waiter.row },
        stoveDest,
        (c, r) => this.isCellWalkable(c, r),
        this.gridSize
      );

      if (path.length > 0) {
        waiter.path = path;
      } else {
        waiter.col = stoveDest.col;
        waiter.row = stoveDest.row;
      }
      return;
    }

    // Task B: Customer waiting to order (not already targeted by another waiter!)
    const waitingCust = this.actors.find(a => 
      a.role === 'customer' && 
      a.state === 'waiting_to_order' && 
      !this.actors.some(w => w.role === 'waiter' && w.id !== waiter.id && w.targetCustomerId === a.id)
    );

    if (waitingCust) {
      waiter.targetCustomerId = waitingCust.id;
      waiter.state = 'walking_to_order';

      const custNeighbors = [
        { col: waitingCust.col + 1, row: waitingCust.row },
        { col: waitingCust.col - 1, row: waitingCust.row },
        { col: waitingCust.col, row: waitingCust.row + 1 },
        { col: waitingCust.col, row: waitingCust.row - 1 },
        { col: waitingCust.col, row: waitingCust.row }
      ].filter(n => this.isCellWalkable(n.col, n.row));

      const custDest = custNeighbors.length > 0 ? custNeighbors[0] : { col: waitingCust.col, row: waitingCust.row };
      const path = Pathfinding.findPath(
        { col: waiter.col, row: waiter.row },
        custDest,
        (c, r) => this.isCellWalkable(c, r),
        this.gridSize
      );

      if (path.length > 0) {
        waiter.path = path;
      } else {
        waiter.state = 'taking_order';
        waiter.stateTimer = 1.6;
        if (this.onOrderSound) this.onOrderSound();
      }
      return;
    }

    // Task C: Idle patrol / pacing
    waiter.stateTimer -= dt;
    if (waiter.stateTimer <= 0) {
      waiter.stateTimer = 3.5 + Math.random() * 3.5;
      const minBound = 1;
      const maxBound = Math.max(minBound + 1, this.gridSize - 2);
      const randCol = Math.floor(Math.random() * (maxBound - minBound)) + minBound;
      const randRow = Math.floor(Math.random() * (maxBound - minBound)) + minBound;
      if (this.isCellWalkable(randCol, randRow)) {
        waiter.path = Pathfinding.findPath(
          { col: waiter.col, row: waiter.row },
          { col: randCol, row: randRow },
          (c, r) => this.isCellWalkable(c, r),
          this.gridSize
        );
      }
    }
  }

  // Gourmet XP and leveling system (Authentic grind scaling)
  gainXp(amount: number) {
    this.xp += amount;
    while (this.xp >= this.nextLevelXp && this.level < 50) {
      this.xp -= this.nextLevelXp;
      this.level++;
      this.nextLevelXp = Math.floor(this.nextLevelXp * 2.1);
      const bonus = this.level * 15;
      this.coins += bonus;
      this.recordIncome('bonuses', bonus);
      this.adjustRating(0.04, '+0.04 ⭐ Level Up Prestige!', this.canvas.width / 2, 80);

      // Level-up reward: unlock ingredients for newly available dishes!
      const unlockedRecipes = this.recipes.filter(r => r.unlockLevel === this.level);
      if (unlockedRecipes.length > 0) {
        unlockedRecipes.forEach(rec => {
          if (rec.baseIngredients && rec.baseIngredients.length > 0) {
            const firstReq = rec.baseIngredients[0];
            this.addIngredient(firstReq.ingredientId as IngredientId, 1, false);
          }
        });
        this.spawnFloatingText(`🌟 Level Up! New fresh ingredients unlocked!`, this.canvas.width / 2, 110, '#ffd166');
      }

      if (this.onLevelUp) {
        this.onLevelUp(this.level, bonus);
      }
    }
    if (this.onXpGained) {
      this.onXpGained(amount, this.xp, this.nextLevelXp);
    }
    this.saveGameState();
  }

  // Restaurant Expansion System (Unlock a bigger restaurant over time)
  getNextExpansion(): ExpansionTier | null {
    return EXPANSION_TIERS.find(t => t.size === this.gridSize + 1) || null;
  }

  canExpand(): { can: boolean; reason?: string; nextTier?: ExpansionTier } {
    const nextTier = this.getNextExpansion();
    if (!nextTier) {
      return { can: false, reason: 'Max restaurant size reached (12×12)!' };
    }
    if (this.level < nextTier.minLevel) {
      return { can: false, reason: `Requires Level ${nextTier.minLevel}! (Currently Lv. ${this.level})`, nextTier };
    }
    if ((this.coins - nextTier.cost) < this.creditLimit) {
      return { can: false, reason: `Requires ${nextTier.cost} 🪙! (Exceeds debt limit of ${this.creditLimit} 🪙)`, nextTier };
    }
    return { can: true, nextTier };
  }

  expandRestaurant(): { success: boolean; message: string; newSize?: number } {
    const check = this.canExpand();
    if (!check.can || !check.nextTier) {
      return { success: false, message: check.reason || 'Cannot expand yet.' };
    }

    const nextTier = check.nextTier;
    this.coins -= nextTier.cost;
    this.recordExpense('expansions', nextTier.cost);
    this.gridSize = nextTier.size;

    // Expand flooring for new tiles
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const key = `floor_${c}_${r}`;
        if (!this.placedItems.has(key)) {
          this.placedItems.set(key, {
            instanceId: key,
            col: c,
            row: r,
            item: {
              id: 'wood_floor',
              name: 'Classic Parquet Floor',
              type: 'floor',
              price: 10,
              color: (c + r) % 2 === 0 ? '#deb887' : '#d2a679',
              isWalkable: true
            }
          });
        }
      }
    }

    this.handleResize();
    this.adjustRating(0.20, '+0.20 ⭐ Grand Expansion!', this.canvas.width / 2, 80);
    this.saveGameState();

    if (this.onRestaurantExpanded) {
      this.onRestaurantExpanded(this.gridSize, nextTier.name);
    }
    if (this.onCoinsEarned) {
      this.onCoinsEarned(0);
    }

    return {
      success: true,
      message: `🎉 Expanded to ${nextTier.name} (${nextTier.size}×${nextTier.size})!`,
      newSize: this.gridSize
    };
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw Vibrant Sunny Sky, Radiant Sun, Gentle Clouds, and Distant Horizon Skyline
    this.city.drawSkyAndBackground(this.ctx, this.canvas.width, this.canvas.height, this.originX, this.originY);

    // 2. Isometric Restaurant World with smooth Zoom Scaling
    this.ctx.save();
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    this.ctx.translate(centerX, centerY);
    this.ctx.scale(this.zoom, this.zoom);
    this.ctx.translate(-centerX, -centerY);

    interface Renderable {
      depth: number;
      draw: () => void;
    }
    const renderQueue: Renderable[] = [];

    // City Street & Sidewalk on the OTHER SIDE (behind the restaurant walls)
    renderQueue.push({
      depth: -150,
      draw: () => this.city.drawBackStreet(this.ctx, this.originX, this.originY, this.gridSize)
    });

    // Back Walls (Northwest & Northeast borders, prominent, crisp, and completely unobstructed)
    renderQueue.push({
      depth: -100,
      draw: () => this.drawRestaurantWalls()
    });

    // Active Restaurant Floor Tiles
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        const floor = this.placedItems.get(`floor_${c}_${r}`);
        const isHovered = this.hoveredCell?.col === c && this.hoveredCell?.row === r;
        renderQueue.push({
          depth: (c + r) * 10,
          draw: () => this.drawFloorTile(c, r, floor?.item.color || '#deb887', isHovered)
        });
      }
    }

    // Furniture
    for (const [, placed] of this.placedItems) {
      if (placed.item.type === 'floor') continue;
      renderQueue.push({
        depth: (placed.col + placed.row) * 100 + 10,
        draw: () => this.drawFurniture(placed)
      });
    }

    // Actors
    for (const actor of this.actors) {
      renderQueue.push({
        depth: (actor.col + actor.row) * 100 + 20,
        draw: () => this.drawActor(actor)
      });
    }

    // Render moving item preview if player is currently dragging an item
    if (this.activeMovingItem && this.hoveredCell) {
      const ghost = {
        ...this.activeMovingItem,
        col: this.hoveredCell.col,
        row: this.hoveredCell.row
      };
      renderQueue.push({
        depth: (this.hoveredCell.col + this.hoveredCell.row) * 100 + 30,
        draw: () => {
          this.ctx.save();
          this.ctx.globalAlpha = 0.75;
          this.drawFurniture(ghost);
          this.ctx.restore();
        }
      });
    }

    // Table Tip Coins (Rendered directly on top of tables)
    for (const tip of this.tableTips) {
      renderQueue.push({
        depth: (tip.col + tip.row) * 100 + 40,
        draw: () => this.drawTableTip(tip)
      });
    }

    // Mystery Ingredient Gift Boxes & Delivery Supply Crates
    for (const drop of this.ingredientDrops) {
      renderQueue.push({
        depth: (drop.col + drop.row) * 100 + 45,
        draw: () => this.drawIngredientDrop(drop)
      });
    }

    renderQueue.sort((a, b) => a.depth - b.depth);
    for (const entity of renderQueue) {
      entity.draw();
    }

    // Render floating pop-up texts (+1 Cash! 🪙)
    this.drawFloatingTexts();

    this.ctx.restore();
  }

  // Check if mouse is hovering over any specific wall segment (for wallpaper decoration)
  checkWallHover(mouseX: number, mouseY: number): { side: 'nw' | 'ne'; index: number } | null {
    const wallHeight = 110;
    const halfW = IsoUtils.TILE_WIDTH / 2;
    const halfH = IsoUtils.TILE_HEIGHT / 2;
    const cornerPt = IsoUtils.gridToScreen(0, 0, this.originX, this.originY);

    // 1. Northwest Wall Sections (col = 0, row = r)
    for (let r = 0; r < this.gridSize; r++) {
      const x1 = cornerPt.x - r * halfW;
      const y1 = cornerPt.y + r * halfH;
      const x2 = cornerPt.x - (r + 1) * halfW;

      // x2 is smaller than x1
      if (mouseX >= x2 && mouseX <= x1) {
        const bottomY = y1 - 0.5 * (mouseX - x1);
        if (mouseY >= bottomY - wallHeight && mouseY <= bottomY) {
          return { side: 'nw', index: r };
        }
      }
    }

    // 2. Northeast Wall Sections (row = 0, col = c)
    for (let c = 0; c < this.gridSize; c++) {
      const x1 = cornerPt.x + c * halfW;
      const y1 = cornerPt.y + c * halfH;
      const x2 = cornerPt.x + (c + 1) * halfW;

      // x1 is smaller than x2
      if (mouseX >= x1 && mouseX <= x2) {
        const bottomY = y1 + 0.5 * (mouseX - x1);
        if (mouseY >= bottomY - wallHeight && mouseY <= bottomY) {
          return { side: 'ne', index: c };
        }
      }
    }

    return null;
  }

  // Draw individual wall section with customizable wallpaper and Restaurant City architectural trim
  private drawWallSection(
    x1: number, y1: number, 
    x2: number, y2: number, 
    wallHeight: number, 
    wainscotH: number, 
    pattern: string, 
    side: 'nw' | 'ne',
    isHovered: boolean,
    hoverColor = '#38bdf8'
  ) {
    this.ctx.save();

    // 1. Clip to section quad
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x2, y2 - wallHeight);
    this.ctx.lineTo(x1, y1 - wallHeight);
    this.ctx.closePath();
    this.ctx.save();
    this.ctx.clip();

    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2) - wallHeight;

    // 2. Wallpaper styles
    if (pattern === 'stripes') {
      // Parisian Crimson & Cream Stripes
      this.ctx.fillStyle = '#fdf0d5';
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);

      this.ctx.fillStyle = '#780000';
      const stripeW = 8;
      for (let sx = minX - 10; sx < minX + IsoUtils.TILE_WIDTH + 10; sx += stripeW * 2) {
        this.ctx.fillRect(sx, minY - 10, stripeW, wallHeight + 40);
      }
    } else if (pattern === 'brick') {
      // Exposed Bistro Red Brick
      this.ctx.fillStyle = '#9a3412';
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);

      // Brick rows with mortar
      this.ctx.strokeStyle = '#431407';
      this.ctx.lineWidth = 1.5;
      const slope = side === 'nw' ? -0.5 : 0.5;
      for (let by = -wallHeight; by < 10; by += 12) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1 - 10, y1 + by - 10 * slope);
        this.ctx.lineTo(x2 + 10, y2 + by + 10 * slope);
        this.ctx.stroke();
      }
    } else if (pattern === 'damask') {
      // Royal Navy Damask with Gold Lattice
      const grad = this.ctx.createLinearGradient(x1, y1 - wallHeight, x2, y2);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e293b');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);

      // Gold diamond accents
      this.ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - wallHeight * 0.65;
      this.ctx.beginPath();
      this.ctx.moveTo(midX, midY - 9);
      this.ctx.lineTo(midX + 7, midY);
      this.ctx.lineTo(midX, midY + 9);
      this.ctx.lineTo(midX - 7, midY);
      this.ctx.closePath();
      this.ctx.fill();
    } else if (pattern === 'floral') {
      // Vintage Mint Rose
      this.ctx.fillStyle = '#d8f3dc';
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);

      // Cute pastel floral dots
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - wallHeight * 0.65;
      this.ctx.fillStyle = '#f43f5e';
      this.ctx.beginPath();
      this.ctx.arc(midX, midY, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = '#40916c';
      this.ctx.beginPath();
      this.ctx.arc(midX - 5, midY + 2, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (pattern === 'yellow') {
      // Sunny Cafe Beadboard
      const grad = this.ctx.createLinearGradient(x1, y1 - wallHeight, x2, y2);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(1, '#fde047');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);

      // White vertical beadboard lines
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      this.ctx.lineWidth = 1.8;
      for (let bx = minX - 10; bx < minX + IsoUtils.TILE_WIDTH + 10; bx += 9) {
        this.ctx.beginPath();
        this.ctx.moveTo(bx, minY - 10);
        this.ctx.lineTo(bx, Math.max(y1, y2) + 10);
        this.ctx.stroke();
      }
    } else if (pattern === 'modern') {
      // Obsidian Slate & Brass
      this.ctx.fillStyle = '#27272a';
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);

      // Brass horizontal accent line
      this.ctx.strokeStyle = '#eab308';
      this.ctx.lineWidth = 2.5;
      const slope = side === 'nw' ? -0.5 : 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(x1 - 10, y1 - wallHeight * 0.5 - 10 * slope);
      this.ctx.lineTo(x2 + 10, y2 - wallHeight * 0.5 + 10 * slope);
      this.ctx.stroke();
    } else {
      // Classic Sage Wainscot (Default)
      const grad = this.ctx.createLinearGradient(x2, y2 - wallHeight, x1, y1);
      grad.addColorStop(0, side === 'nw' ? '#588157' : '#3a5a40');
      grad.addColorStop(1, side === 'nw' ? '#3a5a40' : '#344e41');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(minX - 10, minY - 10, IsoUtils.TILE_WIDTH + 20, wallHeight + IsoUtils.TILE_HEIGHT + 20);
    }

    // 3. Lower Wainscoting Wood Paneling
    const woodColor = pattern === 'floral' ? '#f8fafc' : (pattern === 'modern' ? '#18181b' : (pattern === 'damask' ? '#1c1917' : (pattern === 'stripes' ? '#4a1c17' : '#6b4c35')));
    this.ctx.fillStyle = woodColor;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x2, y2 - wainscotH);
    this.ctx.lineTo(x1, y1 - wainscotH);
    this.ctx.closePath();
    this.ctx.fill();

    // Wainscoting inset beveled inner panel
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    const inset = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(x1 - (side === 'nw' ? inset : -inset), y1 - inset * 0.5 - 3);
    this.ctx.lineTo(x2 + (side === 'nw' ? inset : -inset), y2 - inset * 0.5 - 3);
    this.ctx.lineTo(x2 + (side === 'nw' ? inset : -inset), y2 - wainscotH + 3);
    this.ctx.lineTo(x1 - (side === 'nw' ? inset : -inset), y1 - wainscotH + 3);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore(); // remove clip

    // 4. Baseboard and Top Crown Molding for this section
    this.ctx.strokeStyle = '#2b1d12';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    // 3D Isometric Wall Top Cap (Solid architectural thickness)
    const capThick = 6;
    const dx = side === 'nw' ? 3.5 : -3.5;
    const dy = -1.75;
    this.ctx.fillStyle = '#1e293b';
    this.ctx.strokeStyle = '#0f172a';
    this.ctx.lineWidth = 1.2;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1 - wallHeight);
    this.ctx.lineTo(x2, y2 - wallHeight);
    this.ctx.lineTo(x2 - dx, y2 - wallHeight + dy - capThick);
    this.ctx.lineTo(x1 - dx, y1 - wallHeight + dy - capThick);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Crown molding highlight along inner edge
    this.ctx.strokeStyle = '#e2e8f0';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1 - wallHeight);
    this.ctx.lineTo(x2, y2 - wallHeight);
    this.ctx.stroke();

    // 5. Vertical Section Divider Pilaster Beam (authentic section look)
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(x2, y2 - wallHeight);
    this.ctx.stroke();

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    this.ctx.lineWidth = 1.2;
    this.ctx.beginPath();
    this.ctx.moveTo(x2 + 1, y2);
    this.ctx.lineTo(x2 + 1, y2 - wallHeight);
    this.ctx.stroke();

    // 6. Section Hover Outline
    if (isHovered) {
      this.ctx.strokeStyle = hoverColor;
      this.ctx.lineWidth = 3;
      this.ctx.shadowColor = hoverColor;
      this.ctx.shadowBlur = 10;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x2, y2 - wallHeight);
      this.ctx.lineTo(x1, y1 - wallHeight);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.fillStyle = hoverColor === '#ef233c'
        ? 'rgba(239, 35, 60, 0.28)'
        : (hoverColor === '#f59e0b' ? 'rgba(245, 158, 11, 0.24)' : 'rgba(56, 189, 248, 0.22)');
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  // Draw authentic Restaurant City segmented back walls with customizable wallpapers and removable windows
  private drawRestaurantWalls() {
    const wallHeight = 110;
    const wainscotH = 34;
    const halfW = IsoUtils.TILE_WIDTH / 2;
    const halfH = IsoUtils.TILE_HEIGHT / 2;
    const cornerPt = IsoUtils.gridToScreen(0, 0, this.originX, this.originY);

    this.ctx.save();

    const isWallTool = this.isBuildMode && (
      this.selectedTool?.type === 'wall' || 
      this.selectedTool?.type === 'window' || 
      this.selectedTool?.type === 'door' || 
      this.activeBuildTool === 'remove'
    );

    // 1. Northwest Wall Sections (col = 0, row = r)
    for (let r = 0; r < this.gridSize; r++) {
      const x1 = cornerPt.x - r * halfW;
      const y1 = cornerPt.y + r * halfH;
      const x2 = cornerPt.x - (r + 1) * halfW;
      const y2 = cornerPt.y + (r + 1) * halfH;

      const wallKey = `wall_nw_${r}`;
      const winKey = `window_nw_${r}`;
      const doorKey = `door_nw_${r}`;
      const placed = this.placedItems.get(wallKey);
      const winPlaced = this.placedItems.get(winKey);
      const doorPlaced = this.placedItems.get(doorKey);
      const pattern = placed?.item.pattern || 'sage';
      const isHovered = isWallTool && this.hoveredWall?.side === 'nw' && this.hoveredWall?.index === r;

      let hoverColor = '#38bdf8';
      if (this.activeBuildTool === 'remove') {
        hoverColor = (doorPlaced || winPlaced) ? '#ef233c' : '#f87171';
      } else if (this.selectedTool?.type === 'door') {
        hoverColor = '#10b981';
      } else if (this.selectedTool?.type === 'window') {
        hoverColor = '#f59e0b';
      }

      this.drawWallSection(x1, y1, x2, y2, wallHeight, wainscotH, pattern, 'nw', isHovered, hoverColor);

      // Render installed wall door or window
      if (doorPlaced) {
        const style = doorPlaced.item.pattern || 'french';
        this.drawWallDoor((x1 + x2) / 2, (y1 + y2) / 2, 'left', style);
      } else if (winPlaced) {
        const style = winPlaced.item.pattern || 'arched';
        this.drawWallWindow((x1 + x2) / 2, (y1 + y2) / 2 - wallHeight * 0.58, 'left', style);
      }
    }

    // 2. Northeast Wall Sections (row = 0, col = c)
    for (let c = 0; c < this.gridSize; c++) {
      const x1 = cornerPt.x + c * halfW;
      const y1 = cornerPt.y + c * halfH;
      const x2 = cornerPt.x + (c + 1) * halfW;
      const y2 = cornerPt.y + (c + 1) * halfH;

      const wallKey = `wall_ne_${c}`;
      const winKey = `window_ne_${c}`;
      const doorKey = `door_ne_${c}`;
      const placed = this.placedItems.get(wallKey);
      const winPlaced = this.placedItems.get(winKey);
      const doorPlaced = this.placedItems.get(doorKey);
      const pattern = placed?.item.pattern || 'sage';
      const isHovered = isWallTool && this.hoveredWall?.side === 'ne' && this.hoveredWall?.index === c;

      let hoverColor = '#38bdf8';
      if (this.activeBuildTool === 'remove') {
        hoverColor = (doorPlaced || winPlaced) ? '#ef233c' : '#f87171';
      } else if (this.selectedTool?.type === 'door') {
        hoverColor = '#10b981';
      } else if (this.selectedTool?.type === 'window') {
        hoverColor = '#f59e0b';
      }

      this.drawWallSection(x1, y1, x2, y2, wallHeight, wainscotH, pattern, 'ne', isHovered, hoverColor);

      // Render installed wall door or window
      if (doorPlaced) {
        const style = doorPlaced.item.pattern || 'french';
        this.drawWallDoor((x1 + x2) / 2, (y1 + y2) / 2, 'right', style);
      } else if (winPlaced) {
        const style = winPlaced.item.pattern || 'arched';
        this.drawWallWindow((x1 + x2) / 2, (y1 + y2) / 2 - wallHeight * 0.58, 'right', style);
      }
    }

    // 3. Center Corner Pillar Beam (at corner (0, 0))
    this.ctx.strokeStyle = '#1f2937';
    this.ctx.lineWidth = 3.5;
    this.ctx.beginPath();
    this.ctx.moveTo(cornerPt.x, cornerPt.y);
    this.ctx.lineTo(cornerPt.x, cornerPt.y - wallHeight);
    this.ctx.stroke();

    this.ctx.restore();
  }

  // Draw cute bistro wall windows with true isometric perspective shearing and customizable architectural styles
  private drawWallWindow(x: number, y: number, side: 'left' | 'right', style = 'arched') {
    this.ctx.save();
    this.ctx.translate(x, y);
    // True isometric shear (matching 2:1 isometric slope)
    if (side === 'left') {
      this.ctx.transform(1, -0.5, 0, 1, 0, 0);
    } else {
      this.ctx.transform(1, 0.5, 0, 1, 0, 0);
    }

    if (style === 'bay') {
      // Grand 3-Panel Bay Window
      const winW = 46;
      const winH = 48;
      const halfW = winW / 2;

      // Rich mahogany wooden frame
      this.ctx.fillStyle = '#3e1f08';
      this.ctx.strokeStyle = '#603813';
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW, -winH / 2, winW, winH, [8, 8, 2, 2]);
      this.ctx.fill();
      this.ctx.stroke();

      // Clear sky glass
      const skyGrad = this.ctx.createLinearGradient(0, -winH / 2, 0, winH / 2);
      skyGrad.addColorStop(0, '#70d6ff');
      skyGrad.addColorStop(1, '#e0fbfc');
      this.ctx.fillStyle = skyGrad;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW + 3, -winH / 2 + 3, winW - 6, winH - 6, [6, 6, 1, 1]);
      this.ctx.fill();

      // 3 vertical bay mullions
      this.ctx.strokeStyle = '#603813';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(-halfW / 3, -winH / 2 + 3);
      this.ctx.lineTo(-halfW / 3, winH / 2 - 3);
      this.ctx.moveTo(halfW / 3, -winH / 2 + 3);
      this.ctx.lineTo(halfW / 3, winH / 2 - 3);
      this.ctx.moveTo(-halfW + 3, 0);
      this.ctx.lineTo(halfW - 3, 0);
      this.ctx.stroke();

      // Deep Flower-box / planter sill
      this.ctx.fillStyle = '#4a2810';
      this.ctx.fillRect(-halfW - 3, winH / 2 - 3, winW + 6, 6);
      this.ctx.fillStyle = '#2d6a4f';
      this.ctx.fillRect(-halfW - 1, winH / 2 - 5, winW + 2, 3);
    } else if (style === 'stained') {
      // Rose Gothic Stained Glass
      const winW = 38;
      const winH = 52;
      const halfW = winW / 2;

      // Dark stone arch
      this.ctx.fillStyle = '#1e293b';
      this.ctx.strokeStyle = '#475569';
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW, -winH / 2, winW, winH, [16, 16, 2, 2]);
      this.ctx.fill();
      this.ctx.stroke();

      // Stained glass quadrants
      const gx = -halfW + 3;
      const gy = -winH / 2 + 3;
      const gw = winW - 6;
      const gh = winH - 6;

      // Top arch quadrant (amber)
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(gx, gy, gw, gh * 0.4);
      // Bottom left (ruby red)
      this.ctx.fillStyle = '#ef233c';
      this.ctx.fillRect(gx, gy + gh * 0.4, gw * 0.5, gh * 0.6);
      // Bottom right (cobalt blue)
      this.ctx.fillStyle = '#2563eb';
      this.ctx.fillRect(gx + gw * 0.5, gy + gh * 0.4, gw * 0.5, gh * 0.6);
      // Center rosette jewel (emerald)
      this.ctx.fillStyle = '#10b981';
      this.ctx.beginPath();
      this.ctx.arc(0, gy + gh * 0.4, 5, 0, Math.PI * 2);
      this.ctx.fill();

      // Dark lead cames
      this.ctx.strokeStyle = '#0f172a';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(0, gy);
      this.ctx.lineTo(0, gy + gh);
      this.ctx.moveTo(gx, gy + gh * 0.4);
      this.ctx.lineTo(gx + gw, gy + gh * 0.4);
      this.ctx.stroke();

      // Stone sill
      this.ctx.fillStyle = '#334155';
      this.ctx.fillRect(-halfW - 2, winH / 2 - 2, winW + 4, 4);
    } else if (style === 'modern') {
      // Modern Loft Picture Window
      const winW = 44;
      const winH = 54;
      const halfW = winW / 2;

      // Slim matte black iron frame
      this.ctx.fillStyle = '#18181b';
      this.ctx.strokeStyle = '#27272a';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW, -winH / 2, winW, winH, [3, 3, 2, 2]);
      this.ctx.fill();
      this.ctx.stroke();

      // Sleek twilight glass
      const skyGrad = this.ctx.createLinearGradient(0, -winH / 2, 0, winH / 2);
      skyGrad.addColorStop(0, '#0284c7');
      skyGrad.addColorStop(1, '#bae6fd');
      this.ctx.fillStyle = skyGrad;
      this.ctx.fillRect(-halfW + 2, -winH / 2 + 2, winW - 4, winH - 4);

      // Iron grid mullions (2 cols, 3 rows)
      this.ctx.strokeStyle = '#18181b';
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -winH / 2 + 2);
      this.ctx.lineTo(0, winH / 2 - 2);
      this.ctx.moveTo(-halfW + 2, -winH / 6);
      this.ctx.lineTo(halfW - 2, -winH / 6);
      this.ctx.moveTo(-halfW + 2, winH / 6);
      this.ctx.lineTo(halfW - 2, winH / 6);
      this.ctx.stroke();

      // Brass sill
      this.ctx.fillStyle = '#eab308';
      this.ctx.fillRect(-halfW - 1, winH / 2 - 2, winW + 2, 3);
    } else if (style === 'shutter') {
      // Rustic Shutter Cottage Window
      const winW = 32;
      const winH = 46;
      const halfW = winW / 2;

      // French Blue Shutters
      this.ctx.fillStyle = '#2563eb';
      this.ctx.strokeStyle = '#1d4ed8';
      this.ctx.lineWidth = 1.5;
      // Left shutter
      this.ctx.fillRect(-halfW - 8, -winH / 2 + 2, 7, winH - 4);
      this.ctx.strokeRect(-halfW - 8, -winH / 2 + 2, 7, winH - 4);
      // Right shutter
      this.ctx.fillRect(halfW + 1, -winH / 2 + 2, 7, winH - 4);
      this.ctx.strokeRect(halfW + 1, -winH / 2 + 2, 7, winH - 4);

      // White enameled frame
      this.ctx.fillStyle = '#ffffff';
      this.ctx.strokeStyle = '#cbd5e1';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW, -winH / 2, winW, winH, [8, 8, 2, 2]);
      this.ctx.fill();
      this.ctx.stroke();

      // Glass & crossbars
      const skyGrad = this.ctx.createLinearGradient(0, -winH / 2, 0, winH / 2);
      skyGrad.addColorStop(0, '#93c5fd');
      skyGrad.addColorStop(1, '#eff6ff');
      this.ctx.fillStyle = skyGrad;
      this.ctx.fillRect(-halfW + 2, -winH / 2 + 2, winW - 4, winH - 4);

      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -winH / 2 + 2);
      this.ctx.lineTo(0, winH / 2 - 2);
      this.ctx.moveTo(-halfW + 2, 0);
      this.ctx.lineTo(halfW - 2, 0);
      this.ctx.stroke();

      // Terracotta sill
      this.ctx.fillStyle = '#9a3412';
      this.ctx.fillRect(-halfW - 2, winH / 2 - 2, winW + 4, 4);
    } else {
      // Classic Arched Bistro Window (Default)
      const winW = 38;
      const winH = 50;
      const halfW = winW / 2;

      // Outer wooden window frame
      this.ctx.fillStyle = '#fefae0';
      this.ctx.strokeStyle = '#bc6c25';
      this.ctx.lineWidth = 2.5;

      this.ctx.beginPath();
      this.ctx.roundRect(-halfW, -winH / 2, winW, winH, [12, 12, 3, 3]);
      this.ctx.fill();
      this.ctx.stroke();

      // Sky glass
      const skyGrad = this.ctx.createLinearGradient(0, -winH / 2, 0, winH / 2);
      skyGrad.addColorStop(0, '#90e0ef');
      skyGrad.addColorStop(1, '#caf0f8');
      this.ctx.fillStyle = skyGrad;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW + 3, -winH / 2 + 3, winW - 6, winH - 6, [10, 10, 2, 2]);
      this.ctx.fill();

      // Window cross panes
      this.ctx.strokeStyle = '#dda15e';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(0, -winH / 2 + 3);
      this.ctx.lineTo(0, winH / 2 - 3);
      this.ctx.moveTo(-halfW + 3, 0);
      this.ctx.lineTo(halfW - 3, 0);
      this.ctx.stroke();

      // Window Sill ledge
      this.ctx.fillStyle = '#603813';
      this.ctx.fillRect(-halfW - 3, winH / 2 - 2, winW + 6, 4);
    }

    this.ctx.restore();
  }

  // Draw 3D Architectural Wall Door attached to restaurant back walls (Full Complete Door)
  private drawWallDoor(x: number, y: number, side: 'left' | 'right', style = 'french') {
    this.ctx.save();
    this.ctx.translate(x, y);
    if (side === 'left') {
      this.ctx.transform(1, -0.5, 0, 1, 0, 0);
    } else {
      this.ctx.transform(1, 0.5, 0, 1, 0, 0);
    }

    const doorW = 40;
    const doorH = 94;
    const halfW = doorW / 2;

    // A. Doorway Wall Recess / Outside Daylight Opening
    const outGrad = this.ctx.createLinearGradient(0, -doorH, 0, 0);
    outGrad.addColorStop(0, '#70d6ff');
    outGrad.addColorStop(0.65, '#e0fbfc');
    outGrad.addColorStop(0.85, '#cbd5e1');
    outGrad.addColorStop(1, '#94a3b8');
    this.ctx.fillStyle = outGrad;
    this.ctx.beginPath();
    this.ctx.roundRect(-halfW, -doorH, doorW, doorH, [6, 6, 0, 0]);
    this.ctx.fill();

    // B. Architectural Styles (Full, Complete Doorways!)
    if (style === 'royal') {
      // 1. Imperial Golden Door (Majestic Double Royal Mahogany Doors with Gold Filigree)
      // Heavy Gold Leaf Outer Frame
      this.ctx.fillStyle = '#b45309';
      this.ctx.strokeStyle = '#f59e0b';
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW - 2, -doorH - 4, doorW + 4, doorH + 4, [8, 8, 0, 0]);
      this.ctx.stroke();

      // Ornate Gold Baroque Crown / Pediment
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.beginPath();
      this.ctx.moveTo(-halfW - 4, -doorH - 4);
      this.ctx.lineTo(0, -doorH - 14);
      this.ctx.lineTo(halfW + 4, -doorH - 4);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = '#fbbf24';
      this.ctx.stroke();

      // Sapphire Crest Gem
      this.ctx.fillStyle = '#1e3a8a';
      this.ctx.beginPath();
      this.ctx.arc(0, -doorH - 7, 3.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Jamb Trim
      this.ctx.fillStyle = '#78350f';
      this.ctx.fillRect(-halfW, -doorH, 3, doorH);
      this.ctx.fillRect(halfW - 3, -doorH, 3, doorH);

      // FULL DOUBLE DOORS: Left Leaf & Right Leaf!
      const leafW = halfW - 3;
      const leafH = doorH - 6;

      // Left Leaf (-halfW + 3 to -0.5)
      this.ctx.fillStyle = '#451a03';
      this.ctx.fillRect(-halfW + 3, -doorH + 2, leafW, leafH);
      this.ctx.strokeStyle = '#d97706';
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeRect(-halfW + 3, -doorH + 2, leafW, leafH);

      // Left Gold Filigree Insets
      this.ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
      this.ctx.fillRect(-halfW + 5, -doorH + 6, leafW - 4, 34);
      this.ctx.fillRect(-halfW + 5, -doorH + 44, leafW - 4, 40);

      // Left Lion Head Brass Knocker
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.beginPath();
      this.ctx.arc(-halfW + leafW - 3, -doorH / 2 + 2, 2.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Right Leaf (+0.5 to halfW - 3)
      this.ctx.fillStyle = '#451a03';
      this.ctx.fillRect(0.5, -doorH + 2, leafW, leafH);
      this.ctx.strokeStyle = '#d97706';
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeRect(0.5, -doorH + 2, leafW, leafH);

      // Right Gold Filigree Insets
      this.ctx.fillStyle = 'rgba(245, 158, 11, 0.22)';
      this.ctx.fillRect(2.5, -doorH + 6, leafW - 4, 34);
      this.ctx.fillRect(2.5, -doorH + 44, leafW - 4, 40);

      // Right Lion Head Brass Knocker
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.beginPath();
      this.ctx.arc(3.5, -doorH / 2 + 2, 2.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Double Polished Brass Kickplate across the bottom
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(-halfW + 3, -8, doorW - 6, 6);

    } else if (style === 'oak') {
      // 2. Rustic Oak Arch Door (Full Heavy Timber Arch Door filling the entire doorway!)
      // Heavy Arch Frame
      this.ctx.fillStyle = '#3e1f08';
      this.ctx.strokeStyle = '#78350f';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.arc(0, -doorH + halfW, halfW + 1, Math.PI, 0);
      this.ctx.lineTo(halfW + 1, 0);
      this.ctx.lineTo(-halfW - 1, 0);
      this.ctx.closePath();
      this.ctx.stroke();

      // Dark jambs
      this.ctx.fillStyle = '#271202';
      this.ctx.fillRect(-halfW, -doorH + halfW, 2.5, doorH - halfW);
      this.ctx.fillRect(halfW - 2.5, -doorH + halfW, 2.5, doorH - halfW);

      // FULL OAK DOOR PANEL (spanning the entire opening width!)
      const fullDoorW = doorW - 5;
      const fullDoorH = doorH - halfW - 2;

      // Arched top section of door panel
      this.ctx.fillStyle = '#854d0e';
      this.ctx.beginPath();
      this.ctx.arc(0, -doorH + halfW, halfW - 2.5, Math.PI, 0);
      this.ctx.fill();

      // Rectangular lower section of door panel
      this.ctx.fillRect(-halfW + 2.5, -doorH + halfW, fullDoorW, fullDoorH);

      // Full-length vertical oak wood planks across the ENTIRE door width!
      this.ctx.strokeStyle = '#543109';
      this.ctx.lineWidth = 1.2;
      const plankCount = 4;
      const plankW = fullDoorW / plankCount;
      for (let p = 1; p < plankCount; p++) {
        const px = -halfW + 2.5 + p * plankW;
        this.ctx.beginPath();
        this.ctx.moveTo(px, -doorH + halfW - Math.sqrt(Math.max(0, (halfW - 2.5) ** 2 - (px) ** 2)));
        this.ctx.lineTo(px, -2);
        this.ctx.stroke();
      }

      // Horizontal black forged-iron strap hinges spanning across the door!
      this.ctx.fillStyle = '#1c1917';
      // Upper strap
      this.ctx.fillRect(-halfW + 2.5, -doorH + halfW + 10, fullDoorW - 4, 3.5);
      // Lower strap
      this.ctx.fillRect(-halfW + 2.5, -16, fullDoorW - 4, 3.5);

      // Iron hinge studs
      this.ctx.fillStyle = '#57534e';
      this.ctx.fillRect(-halfW + 5, -doorH + halfW + 11, 2, 2);
      this.ctx.fillRect(-halfW + 5, -15, 2, 2);

      // Heavy Iron Ring Knocker & escutcheon plate at center
      this.ctx.fillStyle = '#292524';
      this.ctx.fillRect(-3, -doorH / 2 + 2, 6, 6);
      this.ctx.strokeStyle = '#1c1917';
      this.ctx.lineWidth = 1.6;
      this.ctx.beginPath();
      this.ctx.arc(0, -doorH / 2 + 7, 3.5, 0, Math.PI * 2);
      this.ctx.stroke();

    } else if (style === 'glass') {
      // 3. Modern Loft Glass Door (Full-Width Commercial Storefront Glass Entryway!)
      // Sleek black aluminum frame
      this.ctx.fillStyle = '#0f172a';
      this.ctx.strokeStyle = '#334155';
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW - 1, -doorH - 2, doorW + 2, doorH + 2, [3, 3, 0, 0]);
      this.ctx.stroke();

      // Aluminum jambs
      this.ctx.fillStyle = '#1e293b';
      this.ctx.fillRect(-halfW, -doorH, 2.5, doorH);
      this.ctx.fillRect(halfW - 2.5, -doorH, 2.5, doorH);

      // FULL GLASS DOOR PANEL spanning across the doorway!
      const glassW = doorW - 5;
      const glassH = doorH - 4;
      this.ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
      this.ctx.strokeStyle = '#0284c7';
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.rect(-halfW + 2.5, -doorH + 2, glassW, glassH);
      this.ctx.fill();
      this.ctx.stroke();

      // Dynamic diagonal glass reflection sheens
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.beginPath();
      this.ctx.moveTo(-halfW + 4, -doorH + 6);
      this.ctx.lineTo(-halfW + 14, -doorH + 6);
      this.ctx.lineTo(-halfW + 6, -doorH + 46);
      this.ctx.lineTo(-halfW + 4, -doorH + 36);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.moveTo(halfW - 14, -doorH + 30);
      this.ctx.lineTo(halfW - 4, -doorH + 30);
      this.ctx.lineTo(halfW - 6, -doorH + 65);
      this.ctx.lineTo(halfW - 16, -doorH + 65);
      this.ctx.closePath();
      this.ctx.fill();

      // Frosted safety band across the middle
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      this.ctx.fillRect(-halfW + 2.5, -doorH / 2 - 4, glassW, 8);

      // Stainless Steel Vertical Tubular Pull Handle
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.fillRect(halfW - 7, -doorH / 2 - 16, 2.5, 32);
      this.ctx.fillStyle = '#64748b';
      this.ctx.fillRect(halfW - 9, -doorH / 2 - 14, 2, 2);
      this.ctx.fillRect(halfW - 9, -doorH / 2 + 12, 2, 2);

    } else if (style === 'cafe') {
      // 4. Pastel Cafe Awning Door (Full Parisian Bistro Door with Striped Awning!)
      // Wooden Door Trim
      this.ctx.fillStyle = '#5c3a21';
      this.ctx.fillRect(-halfW - 2, -doorH, 3, doorH);
      this.ctx.fillRect(halfW - 1, -doorH, 3, doorH);

      // Awning Canopy over the doorway
      const awnH = 14;
      const awnY = -doorH - 3;
      this.ctx.fillStyle = '#ef233c';
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW - 5, awnY, doorW + 10, awnH, [4, 4, 1, 1]);
      this.ctx.fill();

      // Striped awning ridges
      this.ctx.fillStyle = '#ffffff';
      for (let ax = -halfW - 3; ax < halfW + 4; ax += 8) {
        this.ctx.fillRect(ax, awnY, 4, awnH);
      }

      // Scalloped bottom fringe
      this.ctx.fillStyle = '#ef233c';
      for (let ax = -halfW - 3; ax <= halfW + 3; ax += 6) {
        this.ctx.beginPath();
        this.ctx.arc(ax, awnY + awnH, 3, 0, Math.PI);
        this.ctx.fill();
      }

      // FULL CAFE DOOR PANEL spanning the entire doorway!
      const cafeW = doorW - 5;
      const cafeH = doorH - 4;
      this.ctx.fillStyle = '#264653';
      this.ctx.fillRect(-halfW + 2.5, -doorH + 2, cafeW, cafeH);
      this.ctx.strokeStyle = '#1d3557';
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeRect(-halfW + 2.5, -doorH + 2, cafeW, cafeH);

      // Upper Display Window with gold "OPEN" lettering
      const winH = 34;
      this.ctx.fillStyle = '#a8dadc';
      this.ctx.fillRect(-halfW + 5, -doorH + 6, cafeW - 5, winH);
      this.ctx.strokeStyle = '#f59e0b';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(-halfW + 5, -doorH + 6, cafeW - 5, winH);

      this.ctx.fillStyle = '#e76f51';
      this.ctx.font = 'bold 8px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('OPEN', 0, -doorH + 25);

      // Lower Wainscot Panel with molding
      this.ctx.strokeStyle = '#1d3557';
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeRect(-halfW + 5, -doorH + 46, cafeW - 5, cafeH - 50);

      // Brass mail slot
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(-6, -doorH + 52, 12, 3);

      // Brass Handle Lever
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(halfW - 8, -doorH / 2 + 10, 4, 2.5);
      this.ctx.beginPath();
      this.ctx.arc(halfW - 8, -doorH / 2 + 11, 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Brass chime bell hanging at doorway
      this.ctx.fillStyle = '#d97706';
      this.ctx.beginPath();
      this.ctx.moveTo(0, -doorH + 2);
      this.ctx.lineTo(3.5, -doorH + 8);
      this.ctx.lineTo(-3.5, -doorH + 8);
      this.ctx.closePath();
      this.ctx.fill();

    } else {
      // 5. Classic French Door (default: Elegant Full Double French Doors with 12 Glass Panes!)
      // White/Cream outer molded frame
      this.ctx.fillStyle = '#f8fafc';
      this.ctx.strokeStyle = '#cbd5e1';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW - 2, -doorH - 4, doorW + 4, doorH + 4, [6, 6, 0, 0]);
      this.ctx.stroke();

      // Top Dental Molding Header
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.fillRect(-halfW - 4, -doorH - 6, doorW + 8, 3.5);

      // Transom Window spanning the full top
      this.ctx.fillStyle = '#e0f2fe';
      this.ctx.strokeStyle = '#94a3b8';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.roundRect(-halfW + 2, -doorH - 2, doorW - 4, 12, [3, 3, 0, 0]);
      this.ctx.fill();
      this.ctx.stroke();

      // Transom vertical mullion
      this.ctx.beginPath();
      this.ctx.moveTo(0, -doorH - 2);
      this.ctx.lineTo(0, -doorH + 10);
      this.ctx.stroke();

      // FULL DOUBLE FRENCH DOORS: Left Leaf AND Right Leaf!
      const leafW = halfW - 3;
      const leafH = doorH - 14;

      // --- Left Leaf (-halfW + 2.5 to -0.5) ---
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(-halfW + 2.5, -doorH + 12, leafW, leafH);
      this.ctx.strokeStyle = '#cbd5e1';
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeRect(-halfW + 2.5, -doorH + 12, leafW, leafH);

      // 6 Glass Panes in Left Leaf (2 cols x 3 rows)
      const paneW = (leafW - 5) / 2;
      const paneH = 18;
      for (let rP = 0; rP < 3; rP++) {
        const py = -doorH + 16 + rP * (paneH + 3);
        for (let cP = 0; cP < 2; cP++) {
          const px = -halfW + 4.5 + cP * (paneW + 2);
          this.ctx.fillStyle = '#bae6fd';
          this.ctx.fillRect(px, py, paneW, paneH);
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          this.ctx.fillRect(px + 1, py + 1, paneW - 2, 2);
        }
      }

      // Left Brass Lever Handle (pointing to center)
      this.ctx.fillStyle = '#d97706';
      this.ctx.fillRect(-3.5, -doorH / 2 + 10, 2.5, 6);
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.fillRect(-5.5, -doorH / 2 + 12, 4, 2);

      // --- Right Leaf (+0.5 to halfW - 2.5) ---
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0.5, -doorH + 12, leafW, leafH);
      this.ctx.strokeStyle = '#cbd5e1';
      this.ctx.lineWidth = 1.2;
      this.ctx.strokeRect(0.5, -doorH + 12, leafW, leafH);

      // 6 Glass Panes in Right Leaf (2 cols x 3 rows)
      for (let rP = 0; rP < 3; rP++) {
        const py = -doorH + 16 + rP * (paneH + 3);
        for (let cP = 0; cP < 2; cP++) {
          const px = 2.5 + cP * (paneW + 2);
          this.ctx.fillStyle = '#bae6fd';
          this.ctx.fillRect(px, py, paneW, paneH);
          this.ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          this.ctx.fillRect(px + 1, py + 1, paneW - 2, 2);
        }
      }

      // Right Brass Lever Handle (pointing to center)
      this.ctx.fillStyle = '#d97706';
      this.ctx.fillRect(1, -doorH / 2 + 10, 2.5, 6);
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.fillRect(1.5, -doorH / 2 + 12, 4, 2);

      // Hanging Brass Chime at top center
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.beginPath();
      this.ctx.arc(0, -doorH + 14, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // C. Ground Threshold Sill
    this.ctx.fillStyle = '#475569';
    this.ctx.fillRect(-halfW - 2, -2, doorW + 4, 3);
    this.ctx.fillStyle = '#cbd5e1';
    this.ctx.fillRect(-halfW - 1, -2, doorW + 2, 1);

    this.ctx.restore();
  }

  private drawFloorTile(col: number, row: number, color: string, isHovered: boolean) {
    const pt = IsoUtils.gridToScreen(col, row, this.originX, this.originY);
    const halfW = IsoUtils.TILE_WIDTH / 2;
    const halfH = IsoUtils.TILE_HEIGHT / 2;

    this.ctx.beginPath();
    this.ctx.moveTo(pt.x, pt.y);
    this.ctx.lineTo(pt.x + halfW, pt.y + halfH);
    this.ctx.lineTo(pt.x, pt.y + IsoUtils.TILE_HEIGHT);
    this.ctx.lineTo(pt.x - halfW, pt.y + halfH);
    this.ctx.closePath();

    this.ctx.fillStyle = isHovered ? '#38bdf8' : color;
    this.ctx.fill();

    this.ctx.strokeStyle = isHovered ? '#0284c7' : 'rgba(0, 0, 0, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Check if this floor tile is connected to a wall entrance door
    let doorPlaced: PlacedItem | undefined;
    if (row === 0) {
      doorPlaced = this.placedItems.get(`door_ne_${col}`);
    }
    if (col === 0 && !doorPlaced) {
      doorPlaced = this.placedItems.get(`door_nw_${row}`);
    }

    if (doorPlaced) {
      const style = doorPlaced.item.pattern || 'french';
      const matW = halfW - 10;
      const matH = halfH - 5;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(pt.x, pt.y + 6);
      this.ctx.lineTo(pt.x + matW, pt.y + 6 + matH);
      this.ctx.lineTo(pt.x, pt.y + 6 + IsoUtils.TILE_HEIGHT - 8);
      this.ctx.lineTo(pt.x - matW, pt.y + 6 + matH);
      this.ctx.closePath();

      let matColor = '#991b1b'; // rich ruby red
      let matBorder = '#fbbf24'; // warm gold
      if (style === 'royal') {
        matColor = '#1e3a8a';
        matBorder = '#f59e0b';
      } else if (style === 'glass') {
        matColor = '#18181b';
        matBorder = '#38bdf8';
      } else if (style === 'oak') {
        matColor = '#451a03';
        matBorder = '#d97706';
      } else if (style === 'cafe') {
        matColor = '#c1121f';
        matBorder = '#fdf0d5';
      }

      this.ctx.fillStyle = matColor;
      this.ctx.fill();
      this.ctx.strokeStyle = matBorder;
      this.ctx.lineWidth = 1.8;
      this.ctx.stroke();

      // Golden welcome inscription
      this.ctx.fillStyle = matBorder;
      this.ctx.font = 'bold 8.5px Inter, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('WELCOME', pt.x, pt.y + 4 + matH);

      this.ctx.restore();
    }
  }

  private drawFurniture(placed: PlacedItem) {
    const pt = IsoUtils.gridToScreen(placed.col, placed.row, this.originX, this.originY);
    const { item } = placed;
    // Tile diamond center is at (pt.x, pt.y + 21)
    const baseCenterX = pt.x;
    const baseCenterY = pt.y + IsoUtils.TILE_HEIGHT / 2;

    if (item.imageSrc) {
      const img = this.assets.getImage(item.imageSrc);
      if (img.complete && img.naturalWidth > 0) {
        // Scaled to fit 84px diamond tiles perfectly
        let width = 74;
        let height = 74;
        let yOffset = 0;

        if (item.type === 'chair') {
          width = 50;
          height = 62;
          yOffset = 4;
        } else if (item.type === 'table') {
          width = 68;
          height = 64;
          yOffset = 2;
        } else if (item.type === 'stove') {
          width = 70;
          height = 72;
          yOffset = 4;
        }

        // Draw so bottom of furniture sits directly on the diamond tile floor center
        const drawX = baseCenterX - width / 2;
        const drawY = baseCenterY - height + yOffset;

        // Ground shadow beneath furniture
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
        this.ctx.beginPath();
        this.ctx.ellipse(baseCenterX, baseCenterY - 2, width * 0.35, 9, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Selection indicator if this item is clicked
        if (this.selectedPlacedItem?.instanceId === placed.instanceId) {
          this.ctx.save();
          this.ctx.strokeStyle = '#ffd166';
          this.ctx.lineWidth = 3;
          this.ctx.shadowColor = '#ffd166';
          this.ctx.shadowBlur = 12;
          this.ctx.beginPath();
          this.ctx.ellipse(baseCenterX, baseCenterY - 2, width * 0.45, 12, 0, 0, Math.PI * 2);
          this.ctx.stroke();
          this.ctx.restore();
        }

        if (item.flipX) {
          this.ctx.save();
          this.ctx.translate(baseCenterX, 0);
          this.ctx.scale(-1, 1);
          this.ctx.drawImage(img, -width / 2, drawY, width, height);
          this.ctx.restore();
        } else {
          this.ctx.drawImage(img, drawX, drawY, width, height);
        }

        // Draw dirty dishes & used glasses on tabletop if table needs cleaning
        if (placed.item.type === 'table' && placed.isDirty) {
          this.ctx.save();
          // Dirty used plate
          this.ctx.fillStyle = '#cbd5e1';
          this.ctx.strokeStyle = '#94a3b8';
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.ellipse(baseCenterX + 8, baseCenterY - 24, 7, 3.5, 0, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.stroke();

          // Crumbs
          this.ctx.fillStyle = '#78350f';
          this.ctx.beginPath();
          this.ctx.arc(baseCenterX + 6, baseCenterY - 24, 1, 0, Math.PI * 2);
          this.ctx.arc(baseCenterX + 10, baseCenterY - 23, 1.2, 0, Math.PI * 2);
          this.ctx.arc(baseCenterX - 8, baseCenterY - 25, 1, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
        return;
      }
    }

    if (item.type === 'plant') {
      const topY = baseCenterY - 34;
      this.ctx.fillStyle = '#e76f51';
      this.ctx.beginPath();
      this.ctx.moveTo(baseCenterX - 11, baseCenterY - 8);
      this.ctx.lineTo(baseCenterX + 11, baseCenterY - 8);
      this.ctx.lineTo(baseCenterX + 8, baseCenterY + 5);
      this.ctx.lineTo(baseCenterX - 8, baseCenterY + 5);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.fillStyle = '#2a9d8f';
      this.ctx.beginPath();
      this.ctx.arc(baseCenterX, topY + 10, 18, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawActor(actor: Actor) {
    const x = actor.screenX;
    // Ground foot position is at tile center
    const footY = actor.screenY + IsoUtils.TILE_HEIGHT / 2;

    // Draw customized Chibi Sprite if available
    if (actor.avatarSrc) {
      const img = this.assets.getImage(actor.avatarSrc);
      if (img.complete && img.naturalWidth > 0) {
        // Soft character foot shadow on floor
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        this.ctx.beginPath();
        this.ctx.ellipse(x, footY - 2, 16, 7, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw Chibi character anchored at feet (scaled nicely to 56x68)
        const spriteWidth = 56;
        const spriteHeight = 68;
        this.ctx.drawImage(img, x - spriteWidth / 2, footY - spriteHeight + 2, spriteWidth, spriteHeight);

        // Carried gourmet plate on tray
        if (actor.carriedDish) {
          this.drawDishPlatter(x + 18, footY - 32, actor.carriedDish);
        }

        // Cleaner animated dusting & sparkle
        if (actor.role === 'cleaner' && actor.state === 'cleaning') {
          const sw = Math.sin(performance.now() / 70) * 4;
          this.ctx.font = '12px sans-serif';
          this.ctx.fillText('✨', x + 10 + sw, footY - 22);
          this.ctx.fillText('🧹', x + 8, footY - 14);
        }

        // Staff Role Badge indicator badge above head for instant identification
        if (actor.role === 'chef' || actor.role === 'waiter' || actor.role === 'cleaner') {
          this.drawStaffRoleBadge(x, footY - spriteHeight - 2, actor.role);
        }
        return;
      }
    }

    // Default Chibi drawing for Staff and Customers
    // Foot Shadow
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    this.ctx.beginPath();
    this.ctx.ellipse(x, footY - 2, 14, 6, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Body
    this.ctx.fillStyle = actor.color;
    this.ctx.beginPath();
    this.ctx.roundRect(x - 10, footY - 28, 20, 22, 6);
    this.ctx.fill();

    // Uniform Detailing for Staff (distinct from casual customers)
    if (actor.role === 'chef') {
      // Crisp white chef double-breasted coat
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.roundRect(x - 9, footY - 28, 18, 20, 4);
      this.ctx.fill();
      // Red neckerchief
      this.ctx.fillStyle = '#dc2626';
      this.ctx.beginPath();
      this.ctx.arc(x, footY - 26, 3, 0, Math.PI * 2);
      this.ctx.fill();
      // Double row of jacket buttons
      this.ctx.fillStyle = '#475569';
      for (let by = footY - 22; by <= footY - 12; by += 4) {
        this.ctx.beginPath();
        this.ctx.arc(x - 3, by, 1, 0, Math.PI * 2);
        this.ctx.arc(x + 3, by, 1, 0, Math.PI * 2);
        this.ctx.fill();
      }
    } else if (actor.role === 'waiter') {
      // Crisp white shirt
      this.ctx.fillStyle = '#f8fafc';
      this.ctx.beginPath();
      this.ctx.roundRect(x - 8, footY - 28, 16, 20, 4);
      this.ctx.fill();
      // Formal black vest
      this.ctx.fillStyle = '#0f172a';
      this.ctx.beginPath();
      this.ctx.moveTo(x - 8, footY - 28);
      this.ctx.lineTo(x - 2, footY - 18);
      this.ctx.lineTo(x - 8, footY - 8);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.moveTo(x + 8, footY - 28);
      this.ctx.lineTo(x + 2, footY - 18);
      this.ctx.lineTo(x + 8, footY - 8);
      this.ctx.fill();
      // Red Bowtie
      this.ctx.fillStyle = '#ef4444';
      this.ctx.beginPath();
      this.ctx.arc(x - 2.5, footY - 26, 2, 0, Math.PI * 2);
      this.ctx.arc(x + 2.5, footY - 26, 2, 0, Math.PI * 2);
      this.ctx.fill();
      // Golden waiter badge
      this.ctx.fillStyle = '#fbbf24';
      this.ctx.beginPath();
      this.ctx.arc(x + 4, footY - 20, 1.5, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (actor.role === 'cleaner') {
      // Work dungarees / overalls with brass buckles
      this.ctx.fillStyle = '#1e3a8a';
      this.ctx.beginPath();
      this.ctx.roundRect(x - 7, footY - 24, 14, 16, 3);
      this.ctx.fill();
      // Brass suspender buckles
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.fillRect(x - 5, footY - 25, 2.5, 2.5);
      this.ctx.fillRect(x + 2.5, footY - 25, 2.5, 2.5);
    }

    // Head
    this.ctx.fillStyle = '#fceade';
    this.ctx.beginPath();
    this.ctx.arc(x, footY - 36, 12, 0, Math.PI * 2);
    this.ctx.fill();

    // Headwear & Hair
    if (actor.role === 'chef') {
      // Big puffy Chef Toque
      this.ctx.fillStyle = '#ffffff';
      this.ctx.strokeStyle = '#cbd5e1';
      this.ctx.lineWidth = 1;
      // Headband
      this.ctx.beginPath();
      this.ctx.roundRect(x - 9, footY - 49, 18, 6, 2);
      this.ctx.fill();
      this.ctx.stroke();
      // Puffy crown
      this.ctx.beginPath();
      this.ctx.arc(x - 6, footY - 54, 7, 0, Math.PI * 2);
      this.ctx.arc(x, footY - 58, 8, 0, Math.PI * 2);
      this.ctx.arc(x + 6, footY - 54, 7, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
    } else if (actor.role === 'cleaner') {
      // Yellow bandana/cap with knot
      this.ctx.fillStyle = '#facc15';
      this.ctx.beginPath();
      this.ctx.arc(x, footY - 42, 10, Math.PI, Math.PI * 2);
      this.ctx.fill();
      // Bandana tie knot
      this.ctx.beginPath();
      this.ctx.arc(x + 10, footY - 38, 3, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Normal hair for waiter & customers
      this.ctx.fillStyle = actor.hairColor;
      this.ctx.beginPath();
      this.ctx.arc(x, footY - 40, 12, Math.PI, Math.PI * 2);
      this.ctx.fill();
    }

    // Eyes
    this.ctx.fillStyle = '#222222';
    this.ctx.beginPath();
    this.ctx.arc(x - 3.5, footY - 35, 2, 0, Math.PI * 2);
    this.ctx.arc(x + 3.5, footY - 35, 2, 0, Math.PI * 2);
    this.ctx.fill();

    // Staff Role Badge
    if (actor.role === 'chef' || actor.role === 'waiter' || actor.role === 'cleaner') {
      this.drawStaffRoleBadge(x, footY - 52, actor.role);
    }

    // Carried Plate for Waiters
    if (actor.carriedDish) {
      this.drawDishPlatter(x + 16, footY - 28, actor.carriedDish);
    }

    // Cleaner animated dusting & sparkle
    if (actor.role === 'cleaner' && actor.state === 'cleaning') {
      const sw = Math.sin(performance.now() / 70) * 4;
      this.ctx.font = '12px sans-serif';
      this.ctx.fillText('✨', x + 10 + sw, footY - 22);
      this.ctx.fillText('🧹', x + 8, footY - 14);
    }

    // 1. Walkaway No Seats Speech Bubble
    if (actor.role === 'customer' && actor.state === 'walkaway_no_seats') {
      const bubbleW = 94;
      const bubbleH = 26;
      const bubbleX = x - bubbleW / 2;
      const bubbleY = footY - 65;

      this.ctx.save();
      this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
      this.ctx.shadowBlur = 6;
      this.ctx.shadowOffsetY = 2;

      this.ctx.fillStyle = '#fee2e2';
      this.ctx.strokeStyle = '#ef4444';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 8);
      this.ctx.fill();
      this.ctx.stroke();

      // Tail
      this.ctx.beginPath();
      this.ctx.moveTo(x - 3, bubbleY + bubbleH);
      this.ctx.lineTo(x, bubbleY + bubbleH + 5);
      this.ctx.lineTo(x + 3, bubbleY + bubbleH);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();

      this.ctx.font = 'bold 11px sans-serif';
      this.ctx.fillStyle = '#991b1b';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(actor.walkawayEmote || '😤 No Tables!', x, bubbleY + bubbleH / 2);
    }

    // 2. Couple conversation heart / wine emote
    if (actor.isCouple && actor.talkBubbleIcon) {
      const iconX = x + 16;
      const iconY = footY - 64;
      this.ctx.save();
      this.ctx.font = '16px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(actor.talkBubbleIcon, iconX, iconY);
      this.ctx.restore();
    }

    // 3. Customer Thought Bubbles with real dish artwork & visual patience gauge
    if (actor.role === 'customer' && actor.assignedDish) {
      const patiencePct = (actor.patienceMax && actor.patienceMax > 0)
        ? Math.max(0, Math.min(1.0, actor.stateTimer / actor.patienceMax))
        : undefined;

      if (actor.state === 'waiting_to_order' || actor.state === 'waiting_for_food') {
        this.drawDishBubble(x, footY - 60, actor.assignedDish, actor.state === 'waiting_for_food', false, patiencePct);
      } else if (actor.state === 'eating') {
        this.drawDishBubble(x, footY - 60, actor.assignedDish, false, true);
      }
    }
  }

  // Draw speech bubble with real illustrated food artwork or emoji + circular patience gauge
  private drawDishBubble(x: number, y: number, dish: Recipe, isWaiting: boolean, isEating = false, patiencePct?: number) {
    const bubbleSize = 40;
    this.ctx.save();
    this.ctx.shadowColor = 'rgba(0,0,0,0.3)';
    this.ctx.shadowBlur = 8;
    this.ctx.shadowOffsetY = 2;

    // Bubble body
    this.ctx.fillStyle = isEating ? '#dcfce7' : '#ffffff';
    this.ctx.strokeStyle = isEating ? '#22c55e' : (dish.level > 1 ? '#f59e0b' : '#cbd5e1');
    this.ctx.lineWidth = dish.level > 1 ? 2.5 : 2;
    this.ctx.beginPath();
    this.ctx.roundRect(x - bubbleSize / 2, y, bubbleSize, bubbleSize, 12);
    this.ctx.fill();
    this.ctx.stroke();

    // Tail
    this.ctx.beginPath();
    this.ctx.moveTo(x - 4, y + bubbleSize);
    this.ctx.lineTo(x, y + bubbleSize + 6);
    this.ctx.lineTo(x + 4, y + bubbleSize);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();

    // Food thumbnail inside bubble
    let rendered = false;
    if (dish.imageSrc) {
      const img = this.assets.getImage(dish.imageSrc);
      if (img.complete && img.naturalWidth > 0) {
        const pad = 6;
        this.ctx.drawImage(img, x - bubbleSize / 2 + pad, y + pad, bubbleSize - pad * 2, bubbleSize - pad * 2);
        rendered = true;
      }
    }
    if (!rendered && dish.emoji) {
      this.ctx.save();
      this.ctx.font = '20px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(dish.emoji, x, y + bubbleSize / 2);
      this.ctx.restore();
    }

    // Level indicator badge if upgraded
    if (dish.level > 1) {
      this.ctx.save();
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.beginPath();
      this.ctx.roundRect(x - bubbleSize / 2 - 2, y - 4, 16, 11, 4);
      this.ctx.fill();
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 8px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(`L${dish.level}`, x - bubbleSize / 2 + 6, y + 2);
      this.ctx.restore();
    }

    // Circular Patience Gauge on top-right of bubble
    if (isWaiting && patiencePct !== undefined) {
      const ringX = x + bubbleSize / 2;
      const ringY = y - 1;
      const radius = 8;
      const pct = Math.max(0, Math.min(1.0, patiencePct));

      this.ctx.save();
      // Disc background
      this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      this.ctx.beginPath();
      this.ctx.arc(ringX, ringY, radius + 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Progress arc
      const color = pct > 0.5 ? '#22c55e' : (pct > 0.25 ? '#f59e0b' : '#ef4444');
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2.5;
      this.ctx.beginPath();
      this.ctx.arc(ringX, ringY, radius, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2, false);
      this.ctx.stroke();

      // Critical indicator icon when impatient
      if (pct <= 0.25) {
        this.ctx.font = '9px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('😠', ringX, ringY);
      } else if (pct <= 0.5) {
        this.ctx.font = '8px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('⏳', ringX, ringY);
      }
      this.ctx.restore();
    } else if (isWaiting) {
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.beginPath();
      this.ctx.arc(x + bubbleSize / 2 - 2, y + 2, 5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  // Draw silver tray with miniature gourmet dish
  private drawDishPlatter(x: number, y: number, dish: Recipe) {
    this.ctx.save();
    // Silver platter
    this.ctx.fillStyle = '#e2e8f0';
    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, 16, 7, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Dish miniature
    let rendered = false;
    if (dish.imageSrc) {
      const img = this.assets.getImage(dish.imageSrc);
      if (img.complete && img.naturalWidth > 0) {
        this.ctx.drawImage(img, x - 12, y - 12, 24, 24);
        rendered = true;
      }
    }
    if (!rendered && dish.emoji) {
      this.ctx.font = '15px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(dish.emoji, x, y - 4);
    }
    this.ctx.restore();
  }

  private setupListeners() {
    window.addEventListener('resize', () => this.handleResize());
    this.canvas.style.cursor = 'grab';

    // Click-and-Drag Pan Screen
    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.hasDragged = false;
      this.startMouseX = e.clientX;
      this.startMouseY = e.clientY;
      this.startPanX = this.panOffsetX;
      this.startPanY = this.panOffsetY;
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      this.isPanning = false;
      this.canvas.style.cursor = this.isBuildMode ? 'default' : 'grab';
    });

    // Touch support for screen panning and pinch-to-zoom
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartPanX = 0;
    let touchStartPanY = 0;
    let initialPinchDist = 0;
    let initialPinchZoom = 1.0;

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartPanX = this.panOffsetX;
        touchStartPanY = this.panOffsetY;
      } else if (e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        initialPinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        initialPinchZoom = this.zoom;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        const dx = (e.touches[0].clientX - touchStartX) / this.zoom;
        const dy = (e.touches[0].clientY - touchStartY) / this.zoom;
        this.panOffsetX = touchStartPanX + dx;
        this.panOffsetY = touchStartPanY + dy;
        this.originX = this.baseOriginX + this.panOffsetX;
        this.originY = this.baseOriginY + this.panOffsetY;
      } else if (e.touches.length === 2 && initialPinchDist > 0) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const scaleFactor = currentDist / initialPinchDist;
        this.setZoom(initialPinchZoom * scaleFactor);
      }
    }, { passive: true });

    // Mouse Wheel Zoom
    this.canvas.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    }, { passive: false });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const rawMouseX = e.clientX - rect.left;
      const rawMouseY = e.clientY - rect.top;

      // Handle screen dragging
      if (this.isMouseDown) {
        const dx = (e.clientX - this.startMouseX) / this.zoom;
        const dy = (e.clientY - this.startMouseY) / this.zoom;
        if (Math.hypot(dx, dy) > 4) {
          this.hasDragged = true;
          this.isPanning = true;
          this.panOffsetX = this.startPanX + dx;
          this.panOffsetY = this.startPanY + dy;
          this.originX = this.baseOriginX + this.panOffsetX;
          this.originY = this.baseOriginY + this.panOffsetY;
          this.canvas.style.cursor = 'grabbing';
          this.hoveredWall = null;
          this.hoveredCell = null;
          return;
        }
      }

      // Convert screen pixels to zoomed isometric world coordinates
      const worldPos = this.screenToWorld(rawMouseX, rawMouseY);
      const mouseX = worldPos.x;
      const mouseY = worldPos.y;

      if (!this.isPanning) {
        this.canvas.style.cursor = this.isBuildMode ? 'default' : 'grab';
      }

      // Check hover over table tip coins to show interactive pointer cursor
      let isOverTip = false;
      for (const tip of this.tableTips) {
        const pt = IsoUtils.gridToScreen(tip.col, tip.row, this.originX, this.originY);
        const coinX = pt.x;
        const coinY = pt.y - 24;
        if (Math.hypot(mouseX - coinX, mouseY - coinY) <= 20) {
          isOverTip = true;
          break;
        }
      }

      // Check hover over ingredient mystery drops / supply crates
      let isOverDrop = false;
      for (const drop of this.ingredientDrops) {
        const pt = IsoUtils.gridToScreen(drop.col, drop.row, this.originX, this.originY);
        const dropY = pt.y - 18;
        if (Math.hypot(mouseX - pt.x, mouseY - dropY) <= 24) {
          isOverDrop = true;
          break;
        }
      }

      if (isOverTip || isOverDrop) {
        this.canvas.style.cursor = 'pointer';
      }

      // Check wall sections when wallpaper, window, door, or remove tool is selected in build mode
      const isWallTargetTool = 
        this.selectedTool?.type === 'wall' || 
        this.selectedTool?.type === 'window' || 
        this.selectedTool?.type === 'door' || 
        this.activeBuildTool === 'remove';

      if (this.isBuildMode && isWallTargetTool) {
        const wallHover = this.checkWallHover(mouseX, mouseY);
        if (wallHover) {
          this.hoveredWall = wallHover;
          this.hoveredCell = null;
          return;
        }
      }
      this.hoveredWall = null;

      const grid = IsoUtils.screenToGrid(mouseX, mouseY, this.originX, this.originY);
      if (grid.col >= 0 && grid.col < this.gridSize && grid.row >= 0 && grid.row < this.gridSize) {
        this.hoveredCell = grid;
      } else {
        this.hoveredCell = null;
      }
    });

    this.canvas.addEventListener('click', (e: MouseEvent) => {
      if (this.hasDragged) {
        this.hasDragged = false;
        return;
      }

      const rect = this.canvas.getBoundingClientRect();
      const rawClickX = e.clientX - rect.left;
      const rawClickY = e.clientY - rect.top;
      const worldPos = this.screenToWorld(rawClickX, rawClickY);
      const clickX = worldPos.x;
      const clickY = worldPos.y;

      // 1. Tip collection check (highest priority: works in normal & build mode!)
      for (let i = this.tableTips.length - 1; i >= 0; i--) {
        const tip = this.tableTips[i];
        const pt = IsoUtils.gridToScreen(tip.col, tip.row, this.originX, this.originY);
        const coinX = pt.x;
        const coinY = pt.y - 24;
        if (Math.hypot(clickX - coinX, clickY - coinY) <= 22) {
          const reward = tip.value;
          this.tableTips.splice(i, 1);
          this.coins += reward;
          this.recordIncome('tableTips', reward);
          this.adjustRating(0.002, '+0.01 ⭐ Prompt Service', coinX, coinY - 24);
          this.saveGameState();

          // Spawn floating "+1 Cash! 🪙" text
          this.spawnFloatingText(`+${reward} Cash! 🪙`, coinX, coinY - 10, '#fde047');

          // Rare bonus ingredient reward from prompt tip collection (8% chance)
          if (Math.random() < 0.08) {
            const allIds = Object.keys(INGREDIENT_CATALOG) as IngredientId[];
            const randId = allIds[Math.floor(Math.random() * allIds.length)];
            this.addIngredient(randId, 1, true, coinX, coinY - 32);
          }

          if (this.onTipCollected) {
            this.onTipCollected(reward);
          } else if (this.onCoinsEarned) {
            this.onCoinsEarned(reward);
          }
          return;
        }
      }

      // 1b. Ingredient drop & supply crate collection check (works in normal & build mode!)
      for (let i = this.ingredientDrops.length - 1; i >= 0; i--) {
        const drop = this.ingredientDrops[i];
        const pt = IsoUtils.gridToScreen(drop.col, drop.row, this.originX, this.originY);
        const dropY = pt.y - 18;
        if (Math.hypot(clickX - pt.x, clickY - dropY) <= 26) {
          this.collectIngredientDrop(drop.id);
          return;
        }
      }

      if (!this.isBuildMode) return;

      // Wallpaper, Window & Door Management on Wall Sections
      if (this.hoveredWall) {
        const side = this.hoveredWall.side;
        const index = this.hoveredWall.index;
        const winKey = `window_${side}_${index}`;
        const wallKey = `wall_${side}_${index}`;
        const doorKey = `door_${side}_${index}`;

        // 1. Remove Tool: Remove door or window from this wall section and store into inventory!
        if (this.activeBuildTool === 'remove') {
          const doorPlaced = this.placedItems.get(doorKey);
          const winPlaced = this.placedItems.get(winKey);

          if (doorPlaced) {
            this.placedItems.delete(doorKey);
            const invKey = doorPlaced.item.id;
            const basePrice = this.getItemBasePrice(doorPlaced.item);
            const existing = this.inventory.get(invKey);
            if (existing) {
              existing.quantity += 1;
              existing.item.originalPrice = basePrice;
              existing.item.price = basePrice;
            } else {
              this.inventory.set(invKey, { 
                item: { ...doorPlaced.item, originalPrice: basePrice, price: basePrice }, 
                quantity: 1 
              });
            }
            this.saveGameState();
            if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            if (this.onItemRemoved) this.onItemRemoved(doorPlaced.item.name);
            return;
          }

          if (winPlaced) {
            this.placedItems.delete(winKey);
            const invKey = winPlaced.item.id;
            const basePrice = this.getItemBasePrice(winPlaced.item);
            const existing = this.inventory.get(invKey);
            if (existing) {
              existing.quantity += 1;
              existing.item.originalPrice = basePrice;
              existing.item.price = basePrice;
            } else {
              this.inventory.set(invKey, { 
                item: { ...winPlaced.item, originalPrice: basePrice, price: basePrice }, 
                quantity: 1 
              });
            }
            this.saveGameState();
            if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            if (this.onItemRemoved) this.onItemRemoved(winPlaced.item.name);
            return;
          }

          if (this.onDoorInstalled) this.onDoorInstalled('no_item_on_wall');
          return;
        }

        // 2. Wallpaper Tool
        if (this.selectedTool && this.selectedTool.type === 'wall') {
          const isCash = this.selectedTool.currency === 'cash';
          const cost = isCash ? (this.selectedTool.cashPrice || 0) : this.selectedTool.price;
          const hasFunds = isCash ? (this.cash >= cost) : ((this.coins - cost) >= this.creditLimit);

          if (hasFunds) {
            if (isCash) {
              this.cash -= cost;
              if (this.onCashChanged) this.onCashChanged(this.cash);
            } else {
              this.coins -= cost;
              this.recordExpense('decorWallpapers', cost);
              if (this.onCoinsEarned) this.onCoinsEarned(0);
            }
            this.placedItems.set(wallKey, {
              instanceId: wallKey,
              col: side === 'ne' ? index : 0,
              row: side === 'nw' ? index : 0,
              item: { ...this.selectedTool }
            });
            this.saveGameState();
            if (this.onWallpaperApplied) this.onWallpaperApplied(this.selectedTool.name);
          } else {
            if (this.onWallpaperApplied) {
              this.onWallpaperApplied(isCash ? `insufficient_cash:${this.selectedTool.name}` : `insufficient_coins:${this.selectedTool.name}`);
            }
          }
          return;
        }

        // 3. Window Tool
        if (this.selectedTool && this.selectedTool.type === 'window') {
          const tool = this.selectedTool;
          const isFromInv = tool.isFromInventory;
          const toolPrice = isFromInv ? 0 : tool.price;
          if (isFromInv || (this.coins - toolPrice >= this.creditLimit)) {
            this.coins -= toolPrice;
            if (!isFromInv) this.recordExpense('decorWallpapers', toolPrice);

            // If placing from inventory, decrement inventory
            if (isFromInv && this.inventory.has(tool.id)) {
              const entry = this.inventory.get(tool.id)!;
              entry.quantity -= 1;
              if (entry.quantity <= 0) {
                this.inventory.delete(tool.id);
                this.selectedTool = null;
              }
              if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            }

            // If a door already existed on this section, remove & return door to inventory!
            const oldDoor = this.placedItems.get(doorKey);
            if (oldDoor) {
              this.placedItems.delete(doorKey);
              const invKey = oldDoor.item.id;
              const oldBase = this.getItemBasePrice(oldDoor.item);
              const existing = this.inventory.get(invKey);
              if (existing) {
                existing.quantity += 1;
                existing.item.originalPrice = oldBase;
                existing.item.price = oldBase;
              } else {
                this.inventory.set(invKey, { 
                  item: { ...oldDoor.item, originalPrice: oldBase, price: oldBase }, 
                  quantity: 1 
                });
              }
              if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            }

            // If a window already existed on this section, save old window to inventory!
            const oldWin = this.placedItems.get(winKey);
            if (oldWin && oldWin.item.id !== tool.id) {
              const invKey = oldWin.item.id;
              const oldBase = this.getItemBasePrice(oldWin.item);
              const existing = this.inventory.get(invKey);
              if (existing) {
                existing.quantity += 1;
                existing.item.originalPrice = oldBase;
                existing.item.price = oldBase;
              } else {
                this.inventory.set(invKey, { 
                  item: { ...oldWin.item, originalPrice: oldBase, price: oldBase }, 
                  quantity: 1 
                });
              }
              if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            }

            const winBase = this.getItemBasePrice(tool);
            this.placedItems.set(winKey, {
              instanceId: winKey,
              col: side === 'ne' ? index : 0,
              row: side === 'nw' ? index : 0,
              item: { ...tool, price: winBase, originalPrice: winBase, isFromInventory: undefined }
            });
            this.saveGameState();
            if (this.onCoinsEarned) this.onCoinsEarned(0);
            if (this.onWindowInstalled) this.onWindowInstalled(tool.name);
          } else {
            if (this.onWindowInstalled) this.onWindowInstalled(`insufficient_coins:${tool.name}`);
          }
          return;
        }

        // 4. Door Tool (Attach architectural door to wall section!)
        if (this.selectedTool && this.selectedTool.type === 'door') {
          const tool = this.selectedTool;
          const isFromInv = tool.isFromInventory;
          const toolPrice = isFromInv ? 0 : tool.price;
          if (isFromInv || (this.coins - toolPrice >= this.creditLimit)) {
            this.coins -= toolPrice;
            if (!isFromInv) this.recordExpense('decorWallpapers', toolPrice);

            // If placing from inventory, decrement inventory
            if (isFromInv && this.inventory.has(tool.id)) {
              const entry = this.inventory.get(tool.id)!;
              entry.quantity -= 1;
              if (entry.quantity <= 0) {
                this.inventory.delete(tool.id);
                this.selectedTool = null;
              }
              if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            }

            // If a window existed on this wall section, remove & return window to inventory!
            const oldWin = this.placedItems.get(winKey);
            if (oldWin) {
              this.placedItems.delete(winKey);
              const invKey = oldWin.item.id;
              const oldBase = this.getItemBasePrice(oldWin.item);
              const existing = this.inventory.get(invKey);
              if (existing) {
                existing.quantity += 1;
                existing.item.originalPrice = oldBase;
                existing.item.price = oldBase;
              } else {
                this.inventory.set(invKey, { 
                  item: { ...oldWin.item, originalPrice: oldBase, price: oldBase }, 
                  quantity: 1 
                });
              }
              if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            }

            // If a door already existed on this section, save old door to inventory!
            const oldDoor = this.placedItems.get(doorKey);
            if (oldDoor && oldDoor.item.id !== tool.id) {
              const invKey = oldDoor.item.id;
              const oldBase = this.getItemBasePrice(oldDoor.item);
              const existing = this.inventory.get(invKey);
              if (existing) {
                existing.quantity += 1;
                existing.item.originalPrice = oldBase;
                existing.item.price = oldBase;
              } else {
                this.inventory.set(invKey, { 
                  item: { ...oldDoor.item, originalPrice: oldBase, price: oldBase }, 
                  quantity: 1 
                });
              }
              if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
            }

            const doorBase = this.getItemBasePrice(tool);
            this.placedItems.set(doorKey, {
              instanceId: doorKey,
              col: side === 'ne' ? index : 0,
              row: side === 'nw' ? index : 0,
              item: { ...tool, price: doorBase, originalPrice: doorBase, isFromInventory: undefined, isWalkable: true }
            });
            this.saveGameState();
            if (this.onCoinsEarned) this.onCoinsEarned(0);
            if (this.onDoorInstalled) this.onDoorInstalled(tool.name);
          } else {
            if (this.onDoorInstalled) this.onDoorInstalled(`insufficient_coins:${tool.name}`);
          }
          return;
        }

        return;
      }

      if (!this.hoveredCell) return;
      const { col, row } = this.hoveredCell;

      // Prevent placing wall-only items on the floor
      if (this.selectedTool?.type === 'door') {
        if (this.onDoorInstalled) this.onDoorInstalled('click_wall_to_install');
        return;
      }
      if (this.selectedTool?.type === 'wall' || this.selectedTool?.type === 'window') {
        return;
      }

      // A. If currently carrying an item with the Move tool, place it down here
      if (this.activeMovingItem) {
        const placed = this.placeItem(col, row, this.activeMovingItem.item);
        this.selectedPlacedItem = placed;
        this.activeMovingItem = null;
        if (this.onSelectedItemChange) this.onSelectedItemChange(placed);
        return;
      }

      // B. If placing from Catalog or Inventory
      if (this.selectedTool) {
        const tool = this.selectedTool;
        const isFromInv = tool.isFromInventory;
        const isCash = tool.currency === 'cash';
        const toolPrice = isFromInv ? 0 : (isCash ? (tool.cashPrice || 0) : tool.price);
        const hasFunds = isFromInv || (isCash ? (this.cash >= toolPrice) : ((this.coins - toolPrice) >= this.creditLimit));

        if (hasFunds) {
          if (!isFromInv) {
            if (isCash) {
              this.cash -= toolPrice;
              if (this.onCashChanged) this.onCashChanged(this.cash);
            } else {
              this.coins -= toolPrice;
              if (tool.type === 'table') this.recordExpense('furnitureTables', toolPrice);
              else if (tool.type === 'chair') this.recordExpense('furnitureChairs', toolPrice);
              else if (tool.type === 'stove') this.recordExpense('kitchenStoves', toolPrice);
              else this.recordExpense('decorWallpapers', toolPrice);
              if (this.onCoinsEarned) this.onCoinsEarned(0);
            }
          }

          if (isFromInv && this.inventory.has(tool.id)) {
            const entry = this.inventory.get(tool.id)!;
            entry.quantity -= 1;
            if (entry.quantity <= 0) {
              this.inventory.delete(tool.id);
              this.selectedTool = null;
            }
            if (this.onInventoryUpdate) this.onInventoryUpdate(Array.from(this.inventory.values()));
          }
          const basePrice = this.getItemBasePrice(tool);
          const placed = this.placeItem(col, row, { 
            ...tool, 
            price: basePrice, 
            originalPrice: basePrice,
            isFromInventory: undefined 
          });
          this.selectedPlacedItem = placed;
          this.saveGameState();
          if (this.onSelectedItemChange) this.onSelectedItemChange(placed);
        } else {
          if (this.onWallpaperApplied) {
            this.onWallpaperApplied(isCash ? `insufficient_cash:${tool.name}` : `insufficient_coins:${tool.name}`);
          }
        }
        return;
      }


      const clickedItem = this.getItemAt(col, row);
      if (!clickedItem) {
        this.selectedPlacedItem = null;
        if (this.onSelectedItemChange) this.onSelectedItemChange(null);
        return;
      }

      // C. Action Tools: Click tool button first, then click any item on the floor
      if (this.activeBuildTool === 'remove') {
        this.selectedPlacedItem = clickedItem;
        this.removeItemToInventory(clickedItem);
        if (this.onItemRemoved) this.onItemRemoved(clickedItem.item.name);
        return;
      }

      if (this.activeBuildTool === 'rotate') {
        this.selectedPlacedItem = clickedItem;
        this.rotateSelectedItem();
        if (this.onItemRotated) this.onItemRotated(clickedItem.item.name);
        return;
      }

      if (this.activeBuildTool === 'move') {
        this.selectedPlacedItem = clickedItem;
        this.startMoveItem();
        return;
      }

      // Default: select the item
      this.selectedPlacedItem = clickedItem;
      if (this.onSelectedItemChange) this.onSelectedItemChange(clickedItem);
    });
  }

  spawnTableTip(custCol: number, custRow: number) {
    let tipCol = custCol;
    let tipRow = custRow;

    // Search adjacent tiles (cardinal directions) for a placed table
    for (const [, placed] of this.placedItems) {
      if (placed.item.type === 'table') {
        const dist = Math.abs(placed.col - custCol) + Math.abs(placed.row - custRow);
        if (dist === 1) {
          tipCol = placed.col;
          tipRow = placed.row;
          break;
        }
      }
    }

    // If a tip already exists on this table, refresh to 15s and stack +1 cash
    const existing = this.tableTips.find(t => t.col === tipCol && t.row === tipRow);
    if (existing) {
      existing.remainingTime = 15.0;
      existing.maxTime = 15.0;
      existing.value += 1;
      return;
    }

    this.tableTips.push({
      id: `tip_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      col: tipCol,
      row: tipRow,
      remainingTime: 15.0,
      maxTime: 15.0,
      value: 1,
      createdAt: performance.now()
    });
  }

  spawnFloatingText(text: string, x: number, y: number, color = '#fde047') {
    this.floatingTexts.push({
      id: `ft_${Date.now()}_${Math.random()}`,
      text,
      x,
      y,
      startY: y,
      color,
      alpha: 1.0,
      lifetime: 1.2,
      maxLifetime: 1.2
    });
  }

  private drawTableTip(tip: TableTip) {
    const pt = IsoUtils.gridToScreen(tip.col, tip.row, this.originX, this.originY);
    const now = performance.now();
    // Sitting flat on the tabletop surface (no floating / bobbing)
    const coinX = pt.x;
    const coinY = pt.y - 24;

    const isUrgent = tip.remainingTime <= 3.0;
    const blink = isUrgent ? Math.sin(now / 90) > 0 : true;

    this.ctx.save();
    if (!blink) {
      this.ctx.globalAlpha = 0.35;
    }

    // 1. Soft miniature contact shadow flat on the tabletop
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    this.ctx.beginPath();
    this.ctx.ellipse(coinX, coinY + 1.6, 6.5, 3.2, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // 2. Small 3D Coin Edge (thickness resting directly on table)
    this.ctx.fillStyle = '#b45309'; // Bronze-gold edge
    this.ctx.beginPath();
    this.ctx.ellipse(coinX, coinY + 1.0, 5.2, 2.7, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // 3. Small Coin Top Surface (isometric flat gold ellipse)
    const grad = this.ctx.createRadialGradient(coinX - 1.5, coinY - 0.8, 0.5, coinX, coinY, 5.0);
    grad.addColorStop(0, '#fef9c3');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#b45309');
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.ellipse(coinX, coinY, 5.2, 2.6, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Subtle inner gold rim
    this.ctx.strokeStyle = '#fef08a';
    this.ctx.lineWidth = 0.6;
    this.ctx.beginPath();
    this.ctx.ellipse(coinX, coinY, 4.0, 2.0, 0, 0, Math.PI * 2);
    this.ctx.stroke();

    // Subtle glint sparkle every 2.5 seconds to attract the eye naturally
    const glintPhase = ((now + tip.col * 700 + tip.row * 500) % 2500) / 2500;
    if (glintPhase < 0.12) {
      const glintAlpha = Math.sin((glintPhase / 0.12) * Math.PI);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${glintAlpha * 0.9})`;
      this.ctx.beginPath();
      this.ctx.arc(coinX - 1.8, coinY - 0.8, 1.1, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  private drawIngredientDrop(drop: IngredientDrop) {
    const pt = IsoUtils.gridToScreen(drop.col, drop.row, this.originX, this.originY);
    const now = performance.now();
    const bob = Math.sin((now + drop.col * 400 + drop.row * 300) / 220) * 4.0;
    const isUrgent = drop.remainingTime <= 4.0;
    const blink = isUrgent ? Math.sin(now / 90) > 0 : true;

    this.ctx.save();
    if (!blink) {
      this.ctx.globalAlpha = 0.35;
    }

    // 1. Soft contact shadow on the floor (scales as box bobs up and down)
    const shadowScale = Math.max(0.6, 1.0 - (bob + 4.0) / 20);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    this.ctx.beginPath();
    this.ctx.ellipse(pt.x, pt.y - 2, 16 * shadowScale, 8 * shadowScale, 0, 0, Math.PI * 2);
    this.ctx.fill();

    const boxX = pt.x;
    const boxY = pt.y - 18 + bob;

    if (drop.isCrate) {
      // COURIER SUPPLY CRATE (Rustic wooden crate with metal bands and glowing badge)
      const auraGrad = this.ctx.createRadialGradient(boxX, boxY, 4, boxX, boxY, 26);
      auraGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      auraGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      this.ctx.fillStyle = auraGrad;
      this.ctx.beginPath();
      this.ctx.arc(boxX, boxY, 26, 0, Math.PI * 2);
      this.ctx.fill();

      // Crate Base (Isometric Cube / Crate)
      const w = 18;
      const h = 14;
      // Top face
      this.ctx.fillStyle = '#d97706';
      this.ctx.beginPath();
      this.ctx.moveTo(boxX, boxY - h);
      this.ctx.lineTo(boxX + w, boxY - h + 9);
      this.ctx.lineTo(boxX, boxY - h + 18);
      this.ctx.lineTo(boxX - w, boxY - h + 9);
      this.ctx.closePath();
      this.ctx.fill();

      // Left face
      this.ctx.fillStyle = '#b45309';
      this.ctx.beginPath();
      this.ctx.moveTo(boxX - w, boxY - h + 9);
      this.ctx.lineTo(boxX, boxY - h + 18);
      this.ctx.lineTo(boxX, boxY + 12);
      this.ctx.lineTo(boxX - w, boxY + 3);
      this.ctx.closePath();
      this.ctx.fill();

      // Right face
      this.ctx.fillStyle = '#92400e';
      this.ctx.beginPath();
      this.ctx.moveTo(boxX, boxY - h + 18);
      this.ctx.lineTo(boxX + w, boxY - h + 9);
      this.ctx.lineTo(boxX + w, boxY + 3);
      this.ctx.lineTo(boxX, boxY + 12);
      this.ctx.closePath();
      this.ctx.fill();

      // Metal straps & border
      this.ctx.strokeStyle = '#475569';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Emoji icon on crate
      this.ctx.font = '16px "Segoe UI Emoji", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('📦', boxX, boxY - 4);

      // Floating Mini Badge
      this.ctx.font = 'bold 9px "Outfit", sans-serif';
      this.ctx.fillStyle = '#38bdf8';
      this.ctx.strokeStyle = '#0f172a';
      this.ctx.lineWidth = 2.5;
      this.ctx.strokeText('CRATE', boxX, boxY - 22);
      this.ctx.fillText('CRATE', boxX, boxY - 22);
    } else {
      // DINER GRATITUDE MYSTERY GIFT BOX
      const auraGrad = this.ctx.createRadialGradient(boxX, boxY, 3, boxX, boxY, 22);
      auraGrad.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
      auraGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
      this.ctx.fillStyle = auraGrad;
      this.ctx.beginPath();
      this.ctx.arc(boxX, boxY, 22, 0, Math.PI * 2);
      this.ctx.fill();

      // Gift Box Top face
      const w = 14;
      const h = 12;
      this.ctx.fillStyle = '#ef4444'; // Radiant Red
      this.ctx.beginPath();
      this.ctx.moveTo(boxX, boxY - h);
      this.ctx.lineTo(boxX + w, boxY - h + 7);
      this.ctx.lineTo(boxX, boxY - h + 14);
      this.ctx.lineTo(boxX - w, boxY - h + 7);
      this.ctx.closePath();
      this.ctx.fill();

      // Left face
      this.ctx.fillStyle = '#dc2626';
      this.ctx.beginPath();
      this.ctx.moveTo(boxX - w, boxY - h + 7);
      this.ctx.lineTo(boxX, boxY - h + 14);
      this.ctx.lineTo(boxX, boxY + 8);
      this.ctx.lineTo(boxX - w, boxY + 1);
      this.ctx.closePath();
      this.ctx.fill();

      // Right face
      this.ctx.fillStyle = '#b91c1c';
      this.ctx.beginPath();
      this.ctx.moveTo(boxX, boxY - h + 14);
      this.ctx.lineTo(boxX + w, boxY - h + 7);
      this.ctx.lineTo(boxX + w, boxY + 1);
      this.ctx.lineTo(boxX, boxY + 8);
      this.ctx.closePath();
      this.ctx.fill();

      // Golden Ribbon
      this.ctx.strokeStyle = '#fbbf24';
      this.ctx.lineWidth = 2.0;
      this.ctx.beginPath();
      this.ctx.moveTo(boxX, boxY - h);
      this.ctx.lineTo(boxX, boxY + 8);
      this.ctx.stroke();

      // Small Golden Bow on Top
      this.ctx.fillStyle = '#f59e0b';
      this.ctx.beginPath();
      this.ctx.arc(boxX, boxY - h, 3.5, 0, Math.PI * 2);
      this.ctx.fill();

      // Floating Mini Badge
      this.ctx.font = 'bold 9px "Outfit", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = '#fde047';
      this.ctx.strokeStyle = '#0f172a';
      this.ctx.lineWidth = 2.5;
      this.ctx.strokeText('GIFT 🎁', boxX, boxY - 20);
      this.ctx.fillText('GIFT 🎁', boxX, boxY - 20);
    }

    this.ctx.restore();
  }

  private drawFloatingTexts() {
    if (this.floatingTexts.length === 0) return;
    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    for (const ft of this.floatingTexts) {
      this.ctx.globalAlpha = Math.max(0, Math.min(1, ft.alpha));
      this.ctx.font = 'bold 15px "Outfit", "Segoe UI", sans-serif';

      // Drop outline
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      this.ctx.lineWidth = 3.5;
      this.ctx.strokeText(ft.text, ft.x, ft.y);

      // Bright fill
      this.ctx.fillStyle = ft.color;
      this.ctx.fillText(ft.text, ft.x, ft.y);
    }
    this.ctx.restore();
  }

  getStaffList(): Actor[] {
    return this.actors.filter(a => a.role === 'chef' || a.role === 'waiter' || a.role === 'cleaner');
  }

  getStaffWage(role: StaffRole): number {
    switch (role) {
      case 'chef': return 8;
      case 'waiter': return 5;
      case 'cleaner': return 4;
      default: return 5;
    }
  }

  getStaffHireCost(role: StaffRole): number {
    switch (role) {
      case 'chef': return 25;
      case 'waiter': return 18;
      case 'cleaner': return 14;
      default: return 18;
    }
  }

  getStaffAvatar(role: StaffRole, nameOrIndex?: string | number): string {
    const list = STAFF_AVATARS[role] || [];
    if (!list || list.length === 0) return '';
    if (typeof nameOrIndex === 'string') {
      const lower = nameOrIndex.toLowerCase();
      if (lower.includes('marco')) return '/assets/characters/chef_marco.png';
      if (lower.includes('pierre')) return '/assets/characters/chef_pierre.png';
      if (lower.includes('clara')) return '/assets/characters/waiter_clara.png';
      if (lower.includes('lucas')) return '/assets/characters/waiter_lucas.png';
      if (lower.includes('sam')) return '/assets/characters/cleaner_sam.png';

      let hash = 0;
      for (let i = 0; i < nameOrIndex.length; i++) {
        hash = (hash << 5) - hash + nameOrIndex.charCodeAt(i);
        hash |= 0;
      }
      return list[Math.abs(hash) % list.length];
    }
    if (typeof nameOrIndex === 'number') {
      return list[Math.abs(nameOrIndex) % list.length];
    }
    return list[0];
  }

  private drawStaffRoleBadge(x: number, y: number, role: StaffRole) {
    this.ctx.save();
    const icon = role === 'chef' ? '👨‍🍳' : (role === 'waiter' ? '🛎️' : '🧹');
    this.ctx.font = '10px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    // Tiny rounded background pill
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    this.ctx.beginPath();
    this.ctx.roundRect(x - 9, y - 8, 18, 16, 8);
    this.ctx.fill();
    this.ctx.strokeStyle = role === 'chef' ? '#f59e0b' : (role === 'waiter' ? '#38bdf8' : '#34d399');
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    this.ctx.fillText(icon, x, y);
    this.ctx.restore();
  }

  getTotalShiftWages(): number {
    const staff = this.getStaffList();
    return staff.reduce((acc, s) => acc + (s.wage ?? this.getStaffWage(s.role as StaffRole)), 0);
  }

  repositionStackedStaff() {
    const stoves = Array.from(this.placedItems.values()).filter(p => p.item.type === 'stove');
    const chefs = this.actors.filter(a => a.role === 'chef');
    const waiters = this.actors.filter(a => a.role === 'waiter');
    const cleaners = this.actors.filter(a => a.role === 'cleaner');

    const occupiedTiles = new Set<string>();

    // 1. Station chefs at distinct stoves
    chefs.forEach((chef, idx) => {
      let station: { col: number; row: number } | null = null;
      if (idx < stoves.length) {
        const stove = stoves[idx];
        const frontNeighbors = [
          { col: stove.col, row: stove.row + 1 },
          { col: stove.col + 1, row: stove.row },
          { col: stove.col, row: Math.max(0, stove.row - 1) },
          { col: Math.max(0, stove.col - 1), row: stove.row }
        ].filter(n => this.isCellWalkable(n.col, n.row));

        if (frontNeighbors.length > 0) {
          station = frontNeighbors[0];
        }
      }

      if (!station) {
        for (let r = 0; r < 2; r++) {
          for (let c = 0; c < this.gridSize; c++) {
            const key = `${c},${r}`;
            if (this.isCellWalkable(c, r) && !occupiedTiles.has(key)) {
              station = { col: c, row: r };
              break;
            }
          }
          if (station) break;
        }
      }

      if (station) {
        chef.col = station.col;
        chef.row = station.row;
        const pt = IsoUtils.gridToScreen(station.col, station.row, this.originX, this.originY);
        chef.screenX = pt.x;
        chef.screenY = pt.y;
        chef.path = [];
        occupiedTiles.add(`${station.col},${station.row}`);
      }
    });

    // 2. Disperse waiters into distinct dining aisle tiles
    waiters.forEach((waiter) => {
      let placedTile: { col: number; row: number } | null = null;
      for (let r = 1; r < this.gridSize - 1; r++) {
        for (let c = 1; c < this.gridSize - 1; c++) {
          const key = `${c},${r}`;
          if (this.isCellWalkable(c, r) && !occupiedTiles.has(key)) {
            placedTile = { col: c, row: r };
            break;
          }
        }
        if (placedTile) break;
      }

      if (placedTile) {
        waiter.col = placedTile.col;
        waiter.row = placedTile.row;
        const pt = IsoUtils.gridToScreen(placedTile.col, placedTile.row, this.originX, this.originY);
        waiter.screenX = pt.x;
        waiter.screenY = pt.y;
        waiter.path = [];
        occupiedTiles.add(`${placedTile.col},${placedTile.row}`);
      }
    });

    // 3. Disperse cleaners
    cleaners.forEach(cleaner => {
      let placedTile: { col: number; row: number } | null = null;
      for (let r = this.gridSize - 2; r >= 1; r--) {
        for (let c = this.gridSize - 2; c >= 1; c--) {
          const key = `${c},${r}`;
          if (this.isCellWalkable(c, r) && !occupiedTiles.has(key)) {
            placedTile = { col: c, row: r };
            break;
          }
        }
        if (placedTile) break;
      }

      if (placedTile) {
        cleaner.col = placedTile.col;
        cleaner.row = placedTile.row;
        const pt = IsoUtils.gridToScreen(placedTile.col, placedTile.row, this.originX, this.originY);
        cleaner.screenX = pt.x;
        cleaner.screenY = pt.y;
        cleaner.path = [];
        occupiedTiles.add(`${placedTile.col},${placedTile.row}`);
      }
    });
  }

  hireStaff(role: StaffRole): { success: boolean; message: string; staff?: Actor } {
    const cost = this.getStaffHireCost(role);
    if ((this.coins - cost) < this.creditLimit) {
      return { success: false, message: `Debt limit reached (${this.creditLimit} 🪙)! Need ${cost} 🪙 to hire.` };
    }

    const currentStaff = this.getStaffList();
    const maxStaff = Math.max(6, this.gridSize + 2);
    if (currentStaff.length >= maxStaff) {
      return { success: false, message: `Staff roster full (${maxStaff} max). Expand restaurant to hire more staff!` };
    }

    this.coins -= cost;
    this.recordExpense('staffHiring', cost);

    const names: Record<StaffRole, string[]> = {
      chef: ['Chef Pierre', 'Chef Gordon', 'Chef Lucia', 'Chef Mateo', 'Chef Remy', 'Chef Julia'],
      waiter: ['Lucas', 'Emma', 'Oliver', 'Mia', 'Liam', 'Zoe', 'Noah', 'Harper'],
      cleaner: ['Bruno', 'Bella', 'Sam', 'Nora', 'Toby', 'Daisy']
    };

    const roleNames = names[role] || ['Staff'];
    const chosenName = roleNames[Math.floor(Math.random() * roleNames.length)] + ` #${currentStaff.length + 1}`;

    const door = this.getRandomEntranceDoor();
    const startCol = door.col;
    const startRow = door.row;
    const pt = IsoUtils.gridToScreen(startCol, startRow, this.originX, this.originY);

    const colors: Record<StaffRole, string> = {
      chef: '#ffffff',
      waiter: '#1d3557',
      cleaner: '#059669'
    };

    const currentRoleCount = currentStaff.filter(s => s.role === role).length;
    const assignedAvatar = this.getStaffAvatar(role, chosenName || currentRoleCount);

    const newStaff: Actor = {
      id: `${role}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: chosenName,
      role: role,
      col: startCol,
      row: startRow,
      screenX: pt.x,
      screenY: pt.y,
      path: [],
      state: 'idle',
      stateTimer: 0,
      avatarSrc: assignedAvatar,
      color: colors[role] || '#3b82f6',
      hairColor: '#475569',
      energy: 100,
      patience: 100,
      wage: this.getStaffWage(role)
    };

    this.actors.push(newStaff);
    this.repositionStackedStaff();
    this.saveGameState();

    if (this.onStaffUpdated) {
      this.onStaffUpdated(this.getStaffList());
    }
    if (this.onCoinsEarned) {
      this.onCoinsEarned(0);
    }

    return { success: true, message: `Hired ${chosenName}! (+${this.getStaffWage(role)} 🪙/shift wage)`, staff: newStaff };
  }

  sackStaff(staffId: string): { success: boolean; message: string } {
    const idx = this.actors.findIndex(a => a.id === staffId);
    if (idx === -1) {
      return { success: false, message: 'Staff member not found.' };
    }

    const staffMember = this.actors[idx];
    const wageSaved = staffMember.wage ?? this.getStaffWage(staffMember.role as StaffRole);
    this.actors.splice(idx, 1);
    this.saveGameState();

    if (this.onStaffUpdated) {
      this.onStaffUpdated(this.getStaffList());
    }

    return { success: true, message: `Sacked ${staffMember.name}. Saved ${wageSaved} 🪙/shift in payroll!` };
  }

  private updateCleanerAI(cleaner: Actor, dt: number) {
    if (cleaner.path.length > 0) return;

    if (cleaner.state === 'cleaning') {
      cleaner.stateTimer -= dt;
      if (cleaner.stateTimer <= 0) {
        if (cleaner.targetTableCol !== undefined && cleaner.targetTableRow !== undefined) {
          for (const [, placed] of this.placedItems) {
            if (placed.item.type === 'table' && placed.col === cleaner.targetTableCol && placed.row === cleaner.targetTableRow) {
              placed.isDirty = false;
              break;
            }
          }
        }
        this.adjustRating(0.003, '+0.01 ⭐ Clean Table', cleaner.screenX, cleaner.screenY - 24);
        // Rare busboy kitchen salvage (6% chance)
        if (Math.random() < 0.06) {
          const allIds = Object.keys(INGREDIENT_CATALOG) as IngredientId[];
          const randId = allIds[Math.floor(Math.random() * allIds.length)];
          this.addIngredient(randId, 1, true, cleaner.screenX, cleaner.screenY - 30);
        }
        cleaner.state = 'idle';
        cleaner.targetTableCol = undefined;
        cleaner.targetTableRow = undefined;
      }
      return;
    }

    if (cleaner.state === 'walking_to_clean') {
      cleaner.state = 'cleaning';
      cleaner.stateTimer = 2.2;
      return;
    }

    // Look for a dirty table
    for (const [, placed] of this.placedItems) {
      if (placed.item.type === 'table' && placed.isDirty) {
        const isTargeted = this.actors.some(
          a => a.role === 'cleaner' && a.id !== cleaner.id && a.targetTableCol === placed.col && a.targetTableRow === placed.row
        );
        if (!isTargeted) {
          const neighbors = [
            { col: placed.col + 1, row: placed.row },
            { col: placed.col - 1, row: placed.row },
            { col: placed.col, row: placed.row + 1 },
            { col: placed.col, row: placed.row - 1 }
          ].filter(n => this.isCellWalkable(n.col, n.row));

          if (neighbors.length > 0) {
            const dest = neighbors[0];
            const path = Pathfinding.findPath(
              { col: cleaner.col, row: cleaner.row },
              dest,
              (c, r) => this.isCellWalkable(c, r),
              this.gridSize
            );
            if (path.length > 0) {
              cleaner.targetTableCol = placed.col;
              cleaner.targetTableRow = placed.row;
              cleaner.path = path;
              cleaner.state = 'walking_to_clean';
              return;
            }
          }
        }
      }
    }
  }

  private startLoop() {
    const loop = (timestamp: number) => {
      if (!this.lastTime) this.lastTime = timestamp;
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
      this.lastTime = timestamp;

      this.updateSimulation(dt);
      this.render();

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
