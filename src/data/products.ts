export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  origin: string;
  weight: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export const categories = [
  "All",
  "Oils & Vinegars",
  "Honey & Preserves",
  "Chocolates & Confections",
  "Spices & Seasonings",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Truffle-Infused Olive Oil",
    description: "Premium extra virgin olive oil infused with black truffle from Umbria, Italy.",
    longDescription: "Our Truffle-Infused Olive Oil is crafted from hand-picked olives in the rolling hills of Umbria, Italy. Each bottle is infused with genuine black truffle (Tuber melanosporum), creating an extraordinary depth of earthy, luxurious flavor. Perfect for drizzling over pasta, risotto, or finishing dishes with an elegant touch. Cold-pressed within hours of harvest for maximum flavor and aroma.",
    price: 42.99,
    category: "Oils & Vinegars",
    origin: "Umbria, Italy",
    weight: "250ml",
    image: "🫒",
    rating: 4.8,
    reviews: 124,
    tags: ["truffle", "olive oil", "italian", "premium"],
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
    image: "🍇",
    rating: 4.9,
    reviews: 87,
    tags: ["balsamic", "aged", "traditional", "modena"],
  },
  {
    id: 3,
    name: "Mānuka Honey UMF 20+",
    description: "Rare, high-potency Mānuka honey from New Zealand's pristine forests.",
    longDescription: "Sourced from the remote native Mānuka forests of New Zealand's North Island, this UMF 20+ certified honey represents the pinnacle of Mānuka quality. Harvested during the brief 4-week flowering season, each batch is independently tested and certified for its unique methylglyoxal (MGO) content. With its rich, complex flavor profile featuring notes of eucalyptus, caramel, and subtle earthiness, this honey is both a culinary treasure and a wellness staple.",
    price: 124.99,
    category: "Honey & Preserves",
    origin: "North Island, New Zealand",
    weight: "250g",
    image: "🍯",
    rating: 4.9,
    reviews: 203,
    tags: ["manuka", "honey", "new zealand", "umf", "wellness"],
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
    image: "🍫",
    rating: 4.7,
    reviews: 156,
    tags: ["chocolate", "dark", "single-origin", "criollo", "bean-to-bar"],
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
    image: "🌸",
    rating: 4.8,
    reviews: 92,
    tags: ["saffron", "persian", "spice", "premium", "hand-harvested"],
  },
  {
    id: 6,
    name: "Wild Lavender Honey Conserve",
    description: "Artisan preserve made with wildflower honey and Provençal lavender.",
    longDescription: "This exquisite conserve is crafted in small batches using wildflower honey from the lavender fields of Provence, France, combined with hand-picked lavender blossoms harvested at peak fragrance. Slowly cooked in copper pans using a traditional French recipe, the result is a jewel-like preserve with delicate floral notes and the natural sweetness of raw honey. Wonderful on warm brioche, stirred into yogurt, or paired with aged goat cheese.",
    price: 22.99,
    category: "Honey & Preserves",
    origin: "Provence, France",
    weight: "220g jar",
    image: "💜",
    rating: 4.6,
    reviews: 68,
    tags: ["lavender", "honey", "preserve", "provençal", "artisan"],
  },
];
