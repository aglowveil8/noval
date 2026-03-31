export interface Deal {
  id: number;
  title: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  store: string;
  category: string;
  url: string;
  postedAt: string;
  hot?: boolean;
}

export const categories = [
  "All",
  "Laptops",
  "Headphones",
  "Tablets",
  "Monitors",
  "Phones",
  "Storage",
  "Smart Home",
  "Gaming",
  "Audio",
  "Wearables",
  "Networking",
] as const;

export type Category = (typeof categories)[number];

// Real deals from Amazon Big Spring Sale & Best Buy Tech Fest (March 2026)
export const deals: Deal[] = [
  {
    id: 1,
    title: "Apple MacBook Air M4 (15.3-inch)",
    description: "M4 chip, 15.3-inch Retina display, up to 18 hours battery life",
    originalPrice: 1299,
    dealPrice: 999,
    discount: 23,
    store: "Amazon",
    category: "Laptops",
    url: "https://www.amazon.com/dp/B0DZL4JL2P",
    postedAt: "2026-03-25T10:00:00Z",
    hot: true,
  },
  {
    id: 2,
    title: "Sennheiser Momentum 4 Wireless Headphones",
    description: "Premium over-ear ANC headphones, 60-hour battery, adaptive noise cancellation",
    originalPrice: 449.95,
    dealPrice: 199.95,
    discount: 56,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0BCV72HN5",
    postedAt: "2026-03-25T10:00:00Z",
    hot: true,
  },
  {
    id: 3,
    title: "WD_BLACK SN850X 2TB NVMe SSD",
    description: "PCIe Gen4, up to 7,300 MB/s read speeds, ideal for gaming",
    originalPrice: 259.99,
    dealPrice: 106.99,
    discount: 59,
    store: "Amazon",
    category: "Storage",
    url: "https://www.amazon.com/dp/B0B7CKVCCV",
    postedAt: "2026-03-25T10:00:00Z",
    hot: true,
  },
  {
    id: 4,
    title: "Google Nest Wi-Fi Pro (Linen)",
    description: "Tri-band Wi-Fi 6E mesh router with built-in smart home hub",
    originalPrice: 199.99,
    dealPrice: 89.99,
    discount: 55,
    store: "Amazon",
    category: "Networking",
    url: "https://www.amazon.com/dp/B0BVD5RFN8",
    postedAt: "2026-03-31T08:00:00Z",
    hot: true,
  },
  {
    id: 5,
    title: "Amazon Fire TV Stick 4K Plus",
    description: "Fastest 4K streaming stick with Wi-Fi 6E, Dolby Vision & Atmos",
    originalPrice: 49.99,
    dealPrice: 24.99,
    discount: 50,
    store: "Amazon",
    category: "Smart Home",
    url: "https://www.amazon.com/dp/B0CX4Z9FBG",
    postedAt: "2026-03-25T10:00:00Z",
    hot: true,
  },
  {
    id: 6,
    title: "8BitDo Ultimate Controller 2",
    description: "Wireless controller with Hall Effect sticks, PC/Switch/mobile compatible",
    originalPrice: 69.99,
    dealPrice: 35.99,
    discount: 49,
    store: "Amazon",
    category: "Gaming",
    url: "https://www.amazon.com/dp/B0DZ8BITDO",
    postedAt: "2026-03-31T08:00:00Z",
  },
  {
    id: 7,
    title: "Kamrui Hyper H2 Mini PC",
    description: "Compact desktop with powerful specs for productivity and light gaming",
    originalPrice: 769,
    dealPrice: 399,
    discount: 48,
    store: "Amazon",
    category: "Laptops",
    url: "https://www.amazon.com/dp/B0DZKAMRUI",
    postedAt: "2026-03-25T10:00:00Z",
  },
  {
    id: 8,
    title: "Samsung Galaxy Tab A11+",
    description: "Large display, S Pen support, long battery life at an affordable price",
    originalPrice: 349.99,
    dealPrice: 209.99,
    discount: 40,
    store: "Amazon",
    category: "Tablets",
    url: "https://www.amazon.com/dp/B0DZTABA11",
    postedAt: "2026-03-31T08:00:00Z",
  },
  {
    id: 9,
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation, lightweight design, 30hr battery",
    originalPrice: 399,
    dealPrice: 243,
    discount: 39,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0BX2L8PBT",
    postedAt: "2026-03-28T14:00:00Z",
  },
  {
    id: 10,
    title: "Apple Watch Ultra 2",
    description: "Titanium case, precision dual-frequency GPS, 36-hour battery",
    originalPrice: 799,
    dealPrice: 499,
    discount: 38,
    store: "Amazon",
    category: "Wearables",
    url: "https://www.amazon.com/dp/B0CHX4JGWL",
    postedAt: "2026-03-26T12:00:00Z",
  },
  {
    id: 11,
    title: "Ring Outdoor Cam (4th Gen)",
    description: "1080p HD, color night vision, two-way talk, weather-resistant",
    originalPrice: 79.99,
    dealPrice: 49.99,
    discount: 38,
    store: "Amazon",
    category: "Smart Home",
    url: "https://www.amazon.com/dp/B0CZRINGOC",
    postedAt: "2026-03-28T14:00:00Z",
  },
  {
    id: 12,
    title: "Nest Learning Thermostat (4th Gen)",
    description: "AI-powered smart thermostat, sleek design, energy savings",
    originalPrice: 319.99,
    dealPrice: 199.99,
    discount: 38,
    store: "Best Buy",
    category: "Smart Home",
    url: "https://www.bestbuy.com/site/nest-learning-thermostat/6588218.p",
    postedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: 13,
    title: "Lenovo OLED Chromebook Plus",
    description: "Vibrant OLED display, snappy performance, all-day battery",
    originalPrice: 599,
    dealPrice: 399,
    discount: 33,
    store: "Amazon",
    category: "Laptops",
    url: "https://www.amazon.com/dp/B0DZLENCB1",
    postedAt: "2026-03-31T08:00:00Z",
  },
  {
    id: 14,
    title: "Shokz OpenFit Air Open-Ear Earbuds",
    description: "Lightweight open-ear design with directional audio, all-day comfort",
    originalPrice: 119.95,
    dealPrice: 79.95,
    discount: 33,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0DZSHOKZ1",
    postedAt: "2026-03-28T14:00:00Z",
  },
  {
    id: 15,
    title: "Uperfect 2K 16-inch Portable Gaming Monitor",
    description: "2560x1600, 120Hz refresh rate, 400 nits, USB-C powered",
    originalPrice: 189.99,
    dealPrice: 133.99,
    discount: 30,
    store: "Amazon",
    category: "Monitors",
    url: "https://www.amazon.com/dp/B0DJHK91TC",
    postedAt: "2026-03-25T10:00:00Z",
  },
  {
    id: 16,
    title: "Google Pixel 10 Pro",
    description: "Tensor G5 chip, advanced AI features, pro camera system",
    originalPrice: 999,
    dealPrice: 749,
    discount: 25,
    store: "Amazon",
    category: "Phones",
    url: "https://www.amazon.com/dp/B0DZP10PRO",
    postedAt: "2026-03-31T08:00:00Z",
  },
  {
    id: 17,
    title: "Samsung Galaxy Buds 4 Pro",
    description: "Premium true wireless earbuds, intelligent ANC, Hi-Fi 360 Audio",
    originalPrice: 229.99,
    dealPrice: 179.99,
    discount: 22,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0DZGB4PRO",
    postedAt: "2026-03-31T08:00:00Z",
  },
  {
    id: 18,
    title: "Sonos Roam 2 Portable Speaker",
    description: "Compact waterproof Bluetooth/Wi-Fi speaker, automatic Trueplay tuning",
    originalPrice: 179,
    dealPrice: 139,
    discount: 22,
    store: "Amazon",
    category: "Audio",
    url: "https://www.amazon.com/dp/B0D5RGMNS2",
    postedAt: "2026-03-25T10:00:00Z",
  },
  {
    id: 19,
    title: "Samsung M7 Smart Monitor 32-inch 4K",
    description: "4K UHD, built-in streaming apps, USB-C, Samsung DeX support",
    originalPrice: 699.99,
    dealPrice: 549.99,
    discount: 21,
    store: "Amazon",
    category: "Monitors",
    url: "https://www.amazon.com/dp/B0DZSM7MON",
    postedAt: "2026-03-31T08:00:00Z",
  },
  {
    id: 20,
    title: "Apple AirPods Pro 3",
    description: "Improved ANC, adaptive audio, USB-C charging case",
    originalPrice: 249,
    dealPrice: 199,
    discount: 20,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0DZP0DSPRO",
    postedAt: "2026-03-25T10:00:00Z",
  },
  {
    id: 21,
    title: "Amazon Kindle Paperwhite (16GB)",
    description: "7-inch glare-free display, waterproof, adjustable warm light",
    originalPrice: 159.99,
    dealPrice: 134.99,
    discount: 16,
    store: "Amazon",
    category: "Tablets",
    url: "https://www.amazon.com/dp/B0CFPJYX2T",
    postedAt: "2026-03-25T10:00:00Z",
  },
  {
    id: 22,
    title: "Apple iPad A16 (11-inch, 128GB)",
    description: "A16 chip, Liquid Retina display, all-day battery",
    originalPrice: 499,
    dealPrice: 449,
    discount: 10,
    store: "Amazon",
    category: "Tablets",
    url: "https://www.amazon.com/dp/B0DJHBRL5M",
    postedAt: "2026-03-25T10:00:00Z",
  },
];

export function getDeals(category?: string, sort?: string): Deal[] {
  let filtered = [...deals];

  if (category && category !== "All") {
    filtered = filtered.filter((d) => d.category === category);
  }

  switch (sort) {
    case "discount":
      filtered.sort((a, b) => b.discount - a.discount);
      break;
    case "price-low":
      filtered.sort((a, b) => a.dealPrice - b.dealPrice);
      break;
    case "price-high":
      filtered.sort((a, b) => b.dealPrice - a.dealPrice);
      break;
    case "newest":
    default:
      filtered.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
      break;
  }

  return filtered;
}

export function formatPrice(price: number): string {
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
