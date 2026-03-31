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
  "Monitors",
  "Headphones",
  "Storage",
  "Phones",
  "Tablets",
  "Smart Home",
  "Keyboards",
  "Accessories",
] as const;

export type Category = (typeof categories)[number];

export const deals: Deal[] = [
  {
    id: 1,
    title: "Apple MacBook Air M4 15\" 16GB/512GB",
    description: "Latest M4 chip, 15-inch Liquid Retina display, 18hr battery life",
    originalPrice: 1499,
    dealPrice: 1249,
    discount: 17,
    store: "Amazon",
    category: "Laptops",
    url: "https://amazon.com",
    postedAt: "2026-03-31T08:00:00Z",
    hot: true,
  },
  {
    id: 2,
    title: "Sony WH-1000XM6 Wireless Headphones",
    description: "Industry-leading noise cancellation, 40hr battery, multipoint connection",
    originalPrice: 399,
    dealPrice: 278,
    discount: 30,
    store: "Best Buy",
    category: "Headphones",
    url: "https://bestbuy.com",
    postedAt: "2026-03-31T07:30:00Z",
    hot: true,
  },
  {
    id: 3,
    title: "Samsung 990 EVO Plus 2TB NVMe SSD",
    description: "PCIe 5.0 x4, up to 10,000 MB/s read, TLC NAND",
    originalPrice: 189,
    dealPrice: 119,
    discount: 37,
    store: "Amazon",
    category: "Storage",
    url: "https://amazon.com",
    postedAt: "2026-03-31T06:00:00Z",
    hot: true,
  },
  {
    id: 4,
    title: 'LG 27GP950-B 27" 4K 144Hz Gaming Monitor',
    description: "Nano IPS, 1ms response, HDMI 2.1, HDR600, G-Sync Compatible",
    originalPrice: 799,
    dealPrice: 549,
    discount: 31,
    store: "B&H Photo",
    category: "Monitors",
    url: "https://bhphotovideo.com",
    postedAt: "2026-03-30T22:00:00Z",
  },
  {
    id: 5,
    title: "Apple iPad Air M3 11\" 128GB WiFi",
    description: "M3 chip, Liquid Retina display, Apple Pencil Pro support",
    originalPrice: 599,
    dealPrice: 499,
    discount: 17,
    store: "Amazon",
    category: "Tablets",
    url: "https://amazon.com",
    postedAt: "2026-03-30T20:00:00Z",
  },
  {
    id: 6,
    title: "Logitech MX Keys S Wireless Keyboard",
    description: "Smart backlighting, USB-C, multi-device, quiet typing",
    originalPrice: 109,
    dealPrice: 79,
    discount: 28,
    store: "Amazon",
    category: "Keyboards",
    url: "https://amazon.com",
    postedAt: "2026-03-30T18:00:00Z",
  },
  {
    id: 7,
    title: "Google Pixel 9 Pro 256GB Unlocked",
    description: "Tensor G5, 6.7\" LTPO OLED, 50MP triple camera, 7 years updates",
    originalPrice: 999,
    dealPrice: 749,
    discount: 25,
    store: "Best Buy",
    category: "Phones",
    url: "https://bestbuy.com",
    postedAt: "2026-03-30T16:00:00Z",
    hot: true,
  },
  {
    id: 8,
    title: 'Dell UltraSharp U3224KB 32" 6K IPS Monitor',
    description: "6K resolution, IPS Black, Thunderbolt 4, built-in KVM",
    originalPrice: 1899,
    dealPrice: 1399,
    discount: 26,
    store: "Dell",
    category: "Monitors",
    url: "https://dell.com",
    postedAt: "2026-03-30T14:00:00Z",
  },
  {
    id: 9,
    title: "Amazon Echo Hub 8\" Smart Home Controller",
    description: "8-inch touchscreen, Zigbee/Thread/Matter, wall-mountable",
    originalPrice: 179,
    dealPrice: 109,
    discount: 39,
    store: "Amazon",
    category: "Smart Home",
    url: "https://amazon.com",
    postedAt: "2026-03-30T12:00:00Z",
  },
  {
    id: 10,
    title: "Samsung Galaxy Tab S10 Ultra 256GB",
    description: "14.6\" Dynamic AMOLED 2X, Snapdragon 8 Elite, S Pen included",
    originalPrice: 1199,
    dealPrice: 899,
    discount: 25,
    store: "Samsung",
    category: "Tablets",
    url: "https://samsung.com",
    postedAt: "2026-03-30T10:00:00Z",
  },
  {
    id: 11,
    title: "Anker 737 Power Bank 24,000mAh 140W",
    description: "140W USB-C output, smart display, charge a MacBook Pro",
    originalPrice: 109,
    dealPrice: 69,
    discount: 37,
    store: "Amazon",
    category: "Accessories",
    url: "https://amazon.com",
    postedAt: "2026-03-29T22:00:00Z",
  },
  {
    id: 12,
    title: "Apple AirPods Pro 3 with USB-C",
    description: "H3 chip, adaptive audio, conversation awareness, IP54",
    originalPrice: 249,
    dealPrice: 189,
    discount: 24,
    store: "Amazon",
    category: "Headphones",
    url: "https://amazon.com",
    postedAt: "2026-03-29T20:00:00Z",
  },
  {
    id: 13,
    title: "ASUS ROG Ally X Handheld Gaming PC",
    description: "Ryzen Z2 Extreme, 1080p 120Hz, 80Wh battery, Windows 11",
    originalPrice: 799,
    dealPrice: 599,
    discount: 25,
    store: "Best Buy",
    category: "Laptops",
    url: "https://bestbuy.com",
    postedAt: "2026-03-29T18:00:00Z",
  },
  {
    id: 14,
    title: "Ring Battery Doorbell Pro + Echo Pop Bundle",
    description: "Head-to-toe HD video, 3D motion detection, Alexa integration",
    originalPrice: 279,
    dealPrice: 159,
    discount: 43,
    store: "Amazon",
    category: "Smart Home",
    url: "https://amazon.com",
    postedAt: "2026-03-29T15:00:00Z",
    hot: true,
  },
  {
    id: 15,
    title: "Keychron Q1 Max 75% Wireless Mechanical Keyboard",
    description: "QMK/VIA, Gateron Jupiter Brown, aluminum, 2.4GHz/BT/USB-C",
    originalPrice: 219,
    dealPrice: 169,
    discount: 23,
    store: "Amazon",
    category: "Keyboards",
    url: "https://amazon.com",
    postedAt: "2026-03-29T12:00:00Z",
  },
  {
    id: 16,
    title: "WD Black SN850X 4TB NVMe SSD",
    description: "PCIe Gen4, 7,300 MB/s read, game mode 2.0, heatsink included",
    originalPrice: 349,
    dealPrice: 229,
    discount: 34,
    store: "Newegg",
    category: "Storage",
    url: "https://newegg.com",
    postedAt: "2026-03-29T10:00:00Z",
  },
  {
    id: 17,
    title: 'Lenovo ThinkPad X1 Carbon Gen 13 14" Laptop',
    description: "Intel Core Ultra 9, 32GB RAM, 1TB SSD, 2.8K OLED, 1.09kg",
    originalPrice: 2149,
    dealPrice: 1599,
    discount: 26,
    store: "Lenovo",
    category: "Laptops",
    url: "https://lenovo.com",
    postedAt: "2026-03-28T22:00:00Z",
  },
  {
    id: 18,
    title: "Bose QuietComfort Ultra Earbuds",
    description: "Immersive audio, CustomTune, 6hr battery, spatial audio",
    originalPrice: 299,
    dealPrice: 209,
    discount: 30,
    store: "Best Buy",
    category: "Headphones",
    url: "https://bestbuy.com",
    postedAt: "2026-03-28T20:00:00Z",
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
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
