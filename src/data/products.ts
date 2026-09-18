export interface Review {
  id: number;
  productId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'shipping';
  minOrder: number;
  description: string;
  expiresAt?: string;
}

export type BadgeType = 'new' | 'sale' | 'bestseller' | 'limited';

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  origin: string;
  weight: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  badge?: BadgeType;
  stock: number;
  reviewList?: Review[];
}

export const categories = [
  "All",
  "Oils & Vinegars",
  "Honey & Preserves",
  "Chocolates & Confections",
  "Spices & Seasonings",
];

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minOrder: 30,
    description: '10% off your first order',
  },
  {
    code: 'SAVE5',
    discount: 5,
    type: 'fixed',
    minOrder: 25,
    description: '$5 off orders over $25',
  },
  {
    code: 'FREESHIP',
    discount: 0,
    type: 'shipping',
    minOrder: 50,
    description: 'Free shipping on orders over $50',
  },
  {
    code: 'GOLD20',
    discount: 20,
    type: 'percentage',
    minOrder: 100,
    description: '20% off orders over $100',
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Truffle-Infused Olive Oil",
    description: "Premium extra virgin olive oil infused with black truffle from Umbria, Italy.",
    longDescription: "Our Truffle-Infused Olive Oil is crafted from hand-picked olives in the rolling hills of Umbria, Italy. Each bottle is infused with genuine black truffle (Tuber melanosporum), creating an extraordinary depth of earthy, luxurious flavor. Perfect for drizzling over pasta, risotto, or finishing dishes with an elegant touch. Cold-pressed within hours of harvest for maximum flavor and aroma.",
    price: 42.99,
    originalPrice: 49.99,
    discount: 14,
    category: "Oils & Vinegars",
    origin: "Umbria, Italy",
    weight: "250ml",
    image: "https://image.qwenlm.ai/generated-images/f4390f1e-bd84-4802-adff-5a5d77db0bfb/_result.png",
    rating: 4.8,
    reviews: 124,
    tags: ["truffle", "olive oil", "italian", "premium"],
    badge: "bestseller",
    stock: 45,
    reviewList: [
      {
        id: 1,
        productId: 1,
        userName: "Maria S.",
        userAvatar: "👩‍🍳",
        rating: 5,
        date: "2026-01-15",
        comment: "Absolutely divine! The truffle aroma is incredible and transforms any dish into a gourmet experience.",
        helpful: 24,
      },
      {
        id: 2,
        productId: 1,
        userName: "James L.",
        userAvatar: "👨‍💼",
        rating: 5,
        date: "2026-01-10",
        comment: "Best truffle oil I've ever used. The quality is unmatched and you can taste the difference immediately.",
        helpful: 18,
      },
      {
        id: 3,
        productId: 1,
        userName: "Sophie R.",
        userAvatar: "👩‍🎨",
        rating: 4,
        date: "2026-01-05",
        comment: "Excellent quality, though I wish the bottle was a bit larger. The flavor is outstanding though!",
        helpful: 12,
      },
    ],
  },
  {
    id: 2,
    name: "25-Year Aged Balsamic Vinegar",
    description: "Traditional Modena balsamic aged in wooden barrels for a quarter century.",
    longDescription: "This exceptional Aceto Balsamico Tradizionale di Modena has been aged for 25 years in a succession of barrels made from oak, cherry, chestnut, mulberry, and juniper. The result is a thick, syrupy vinegar with complex notes of fig, molasses, and dark cherry. Only a few hundred bottles are produced each year. Ideal for aged cheeses, strawberries, or as the crown jewel of any dish.",
    price: 89.99,
    category: "Oils & Vinegars",
    origin: "Modena, Italy",
    weight: "100ml",
    image: "https://image.qwenlm.ai/generated-images/8046cf83-ba56-41c6-a3e2-1af42da36c9f/_result.png",
    rating: 4.9,
    reviews: 87,
    tags: ["balsamic", "aged", "traditional", "modena"],
    badge: "limited",
    stock: 8,
    reviewList: [
      {
        id: 4,
        productId: 2,
        userName: "Antonio B.",
        userAvatar: "👨‍🍳",
        rating: 5,
        date: "2026-01-18",
        comment: "This is liquid gold! The complexity and depth of flavor is extraordinary. Worth every penny.",
        helpful: 31,
      },
      {
        id: 5,
        productId: 2,
        userName: "Emma W.",
        userAvatar: "👩‍💼",
        rating: 5,
        date: "2026-01-12",
        comment: "I've been searching for authentic aged balsamic for years. This is the real deal!",
        helpful: 22,
      },
    ],
  },
  {
    id: 3,
    name: "Mānuka Honey UMF 20+",
    description: "Rare, high-potency Mānuka honey from New Zealand's pristine forests.",
    longDescription: "Sourced from the remote native Mānuka forests of New Zealand's North Island, this UMF 20+ certified honey represents the pinnacle of Mānuka quality. Harvested during the brief 4-week flowering season, each batch is independently tested and certified for its unique methylglyoxal (MGO) content. With its rich, complex flavor profile featuring notes of eucalyptus, caramel, and subtle earthiness, this honey is both a culinary treasure and a wellness staple.",
    price: 124.99,
    originalPrice: 149.99,
    discount: 17,
    category: "Honey & Preserves",
    origin: "North Island, New Zealand",
    weight: "250g",
    image: "https://image.qwenlm.ai/generated-images/d6f7751c-fcc2-4d2e-aa75-4be8b27d9fe8/_result.png",
    rating: 4.9,
    reviews: 203,
    tags: ["manuka", "honey", "new zealand", "umf", "wellness"],
    badge: "sale",
    stock: 32,
    reviewList: [
      {
        id: 6,
        productId: 3,
        userName: "Dr. Sarah K.",
        userAvatar: "👩‍⚕️",
        rating: 5,
        date: "2026-01-20",
        comment: "Authentic UMF 20+ Mānuka honey. I use it daily for its health benefits and the taste is exceptional.",
        helpful: 45,
      },
      {
        id: 7,
        productId: 3,
        userName: "Michael T.",
        userAvatar: "👨‍💻",
        rating: 5,
        date: "2026-01-14",
        comment: "The quality is outstanding. You can tell this is genuine New Zealand Mānuka honey.",
        helpful: 28,
      },
      {
        id: 8,
        productId: 3,
        userName: "Lisa M.",
        userAvatar: "👩‍🎨",
        rating: 4,
        date: "2026-01-08",
        comment: "Great honey, though quite expensive. But the quality justifies the price.",
        helpful: 15,
      },
    ],
  },
  {
    id: 4,
    name: "Single-Origin Dark Chocolate 85%",
    description: "Bean-to-bar chocolate from rare Criollo cacao beans of Madagascar.",
    longDescription: "Our master chocolatier has crafted this extraordinary 85% dark chocolate using rare Criollo cacao beans from the Sambirano Valley in Madagascar. The beans are slowly roasted, stone-ground for 72 hours, and tempered by hand to develop an exceptionally smooth texture. Tasting notes include bright red fruit, warm spice, and a long, satisfying finish with hints of tobacco and dried cherry. Each bar is wrapped in hand-foil and numbered.",
    price: 18.99,
    category: "Chocolates & Confections",
    origin: "Sambirano Valley, Madagascar",
    weight: "80g bar",
    image: "https://image.qwenlm.ai/generated-images/0a7ed82d-7be5-4e3d-9751-b54c26a7/_result.png",
    rating: 4.7,
    reviews: 156,
    tags: ["chocolate", "dark", "single-origin", "criollo", "bean-to-bar"],
    badge: "new",
    stock: 67,
    reviewList: [
      {
        id: 9,
        productId: 4,
        userName: "Pierre D.",
        userAvatar: "👨‍🍳",
        rating: 5,
        date: "2026-01-19",
        comment: "Exceptional chocolate! The flavor complexity is remarkable for 85% cacao.",
        helpful: 19,
      },
      {
        id: 10,
        productId: 4,
        userName: "Anna C.",
        userAvatar: "👩‍💼",
        rating: 4,
        date: "2026-01-11",
        comment: "Very good dark chocolate, smooth and rich. Perfect for chocolate connoisseurs.",
        helpful: 14,
      },
    ],
  },
  {
    id: 5,
    name: "Persian Saffron Threads",
    description: "Hand-harvested Grade A+ saffron from the fields of Khorasan.",
    longDescription: "These precious crimson threads come from the ancient saffron fields of Khorasan province in northeastern Iran, the world's premier saffron-growing region. Each thread is hand-plucked at dawn from Crocus sativus flowers during the brief autumn harvest. Our Grade A+ saffron delivers an intense golden hue, powerful aroma, and complex flavor with honey-like sweetness and subtle metallic notes. Perfect for paella, risotto, Persian rice, and saffron-infused desserts.",
    price: 34.99,
    category: "Spices & Seasonings",
    origin: "Khorasan, Iran",
    weight: "4g",
    image: "https://image.qwenlm.ai/generated-images/98e0f85c-4f80-4841-88cc-13ed253578df/_result.png",
    rating: 4.8,
    reviews: 92,
    tags: ["saffron", "persian", "spice", "premium", "hand-harvested"],
    badge: "bestseller",
    stock: 28,
    reviewList: [
      {
        id: 11,
        productId: 5,
        userName: "Reza M.",
        userAvatar: "👨‍🍳",
        rating: 5,
        date: "2026-01-17",
        comment: "Authentic Persian saffron! The color and aroma are incredible. Makes the best rice dishes.",
        helpful: 26,
      },
      {
        id: 12,
        productId: 5,
        userName: "Claire F.",
        userAvatar: "👩‍🎨",
        rating: 5,
        date: "2026-01-09",
        comment: "The quality is outstanding. A little goes a long way. Perfect for special occasions.",
        helpful: 18,
      },
    ],
  },
  {
    id: 6,
    name: "Wild Lavender Honey Conserve",
    description: "Artisan preserve made with wildflower honey and Provençal lavender.",
    longDescription: "This exquisite conserve is crafted in small batches using wildflower honey from the lavender fields of Provence, France, combined with hand-picked lavender blossoms harvested at peak fragrance. Slowly cooked in copper pans using a traditional French recipe, the result is a jewel-like preserve with delicate floral notes and the natural sweetness of raw honey. Wonderful on warm brioche, stirred into yogurt, or paired with aged goat cheese.",
    price: 22.99,
    originalPrice: 27.99,
    discount: 18,
    category: "Honey & Preserves",
    origin: "Provence, France",
    weight: "220g jar",
    image: "https://image.qwenlm.ai/generated-images/b14ab4de-f5b5-47e1-ba52-78b5bfe8d57a/_result.png",
    rating: 4.6,
    reviews: 68,
    tags: ["lavender", "honey", "preserve", "provençal", "artisan"],
    badge: "sale",
    stock: 5,
    reviewList: [
      {
        id: 13,
        productId: 6,
        userName: "Marie L.",
        userAvatar: "👩‍🍳",
        rating: 5,
        date: "2026-01-16",
        comment: "Absolutely divine! The lavender flavor is delicate and perfect. My new favorite spread.",
        helpful: 21,
      },
      {
        id: 14,
        productId: 6,
        userName: "Thomas B.",
        userAvatar: "👨‍💼",
        rating: 4,
        date: "2026-01-07",
        comment: "Beautiful conserve with authentic Provençal flavor. Great on toast with butter.",
        helpful: 13,
      },
    ],
  },
];
