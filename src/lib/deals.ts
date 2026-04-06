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

// April 2026 deals — Dell Spring Sale, Best Buy Spring Sale, post-Amazon Big Spring Sale holdovers
export const deals: Deal[] = [
  {
    id: 1,
    title: "Apple MacBook Air 13.6\" M5 (2026)",
    description: "M5 10-core chip, 16GB RAM, 512GB SSD — lowest price yet",
    originalPrice: 1099,
    dealPrice: 950,
    discount: 14,
    store: "Amazon",
    category: "Laptops",
    url: "https://www.amazon.com/dp/B0DZMBA5M5",
    postedAt: "2026-04-06T10:00:00Z",
  },
  {
    id: 2,
    title: "Dell 14 Plus Copilot+ PC",
    description: "Intel Ultra 5 226V, 16GB RAM, 512GB SSD — Dell Spring Sale",
    originalPrice: 1070,
    dealPrice: 700,
    discount: 35,
    store: "Dell",
    category: "Laptops",
    url: "https://www.dell.com/en-us/shop/deals/pc-laptop-deals",
    postedAt: "2026-04-01T10:00:00Z",
    hot: true,
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Wireless Headphones",
    description: "Premium ANC over-ear headphones, 30-hour battery — 39% off",
    originalPrice: 398,
    dealPrice: 243,
    discount: 39,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0BX2L8PBT",
    postedAt: "2026-04-06T09:00:00Z",
    hot: true,
  },
  {
    id: 4,
    title: "Sennheiser Momentum 4 Wireless Headphones",
    description: "Premium over-ear ANC headphones, 60-hour battery, adaptive noise cancellation",
    originalPrice: 449.95,
    dealPrice: 199.95,
    discount: 56,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0BCV72HN5",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 5,
    title: "Bose QuietComfort Ultra Headphones",
    description: "Best-in-class ANC, immersive 3D audio, 24-hour battery",
    originalPrice: 429,
    dealPrice: 299,
    discount: 30,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0CCZ1L489",
    postedAt: "2026-04-06T09:00:00Z",
  },
  {
    id: 6,
    title: "CyberPower Championship Special II Gaming PC",
    description: "Ryzen 7 7800X3D, RTX 5070 Ti, 32GB RAM, 2TB SSD — massive $996 off",
    originalPrice: 2819,
    dealPrice: 1823,
    discount: 35,
    store: "CyberPowerPC",
    category: "Gaming",
    url: "https://www.cyberpowerpc.com/system/Championship-Special-II",
    postedAt: "2026-04-06T10:00:00Z",
    hot: true,
  },
  {
    id: 7,
    title: "Alienware 16X Aurora Gaming Laptop",
    description: "Intel Ultra 9 275HX, 32GB RAM, 2TB SSD, RTX 5060 — Dell Spring Sale",
    originalPrice: 2500,
    dealPrice: 1950,
    discount: 22,
    store: "Dell",
    category: "Laptops",
    url: "https://www.dell.com/en-us/shop/deals/pc-laptop-deals",
    postedAt: "2026-04-01T10:00:00Z",
    hot: true,
  },
  {
    id: 8,
    title: "ASUS XG27ACS 27\" 1440p 180Hz Monitor",
    description: "ROG quality, USB-C, ELMB Sync, 97% DCI-P3 — best value 1440p monitor",
    originalPrice: 299,
    dealPrice: 199,
    discount: 33,
    store: "Amazon",
    category: "Monitors",
    url: "https://www.amazon.com/dp/B0DZXG27AC",
    postedAt: "2026-04-06T08:00:00Z",
  },
  {
    id: 9,
    title: "Acer Nitro V 16\" Gaming Laptop",
    description: "16\" WUXGA 180Hz, Intel Ultra 7 240H, RTX 5060, 32GB DDR5, 512GB SSD",
    originalPrice: 1099.99,
    dealPrice: 900,
    discount: 18,
    store: "BJ's Wholesale",
    category: "Laptops",
    url: "https://www.bjs.com/product/acer-nitro-v-16",
    postedAt: "2026-04-06T10:00:00Z",
  },
  {
    id: 10,
    title: "HP OmniBook 3 16\" Snapdragon X Laptop",
    description: "Snapdragon X processor, 16GB RAM, 512GB SSD — great all-day battery",
    originalPrice: 599,
    dealPrice: 429,
    discount: 28,
    store: "Walmart",
    category: "Laptops",
    url: "https://www.walmart.com/ip/HP-OmniBook-3-16",
    postedAt: "2026-04-06T09:00:00Z",
  },
  {
    id: 11,
    title: "NVIDIA RTX 5060 Ti",
    description: "Excellent 1440p gaming GPU, latest-gen ray tracing and DLSS 4",
    originalPrice: 449.99,
    dealPrice: 360,
    discount: 20,
    store: "Best Buy",
    category: "Gaming",
    url: "https://www.bestbuy.com/site/gpu/rtx5060ti",
    postedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: 12,
    title: "Apple AirTag 4-Pack",
    description: "Precision tracking, replaceable battery — Best Buy Deal of the Day",
    originalPrice: 99,
    dealPrice: 59.99,
    discount: 39,
    store: "Best Buy",
    category: "Smart Home",
    url: "https://www.bestbuy.com/site/apple-airtag-4-pack/6461349.p",
    postedAt: "2026-04-06T08:00:00Z",
    hot: true,
  },
  {
    id: 13,
    title: "WD_BLACK SN850X 2TB NVMe SSD",
    description: "PCIe Gen4, up to 7,300 MB/s read speeds, ideal for gaming",
    originalPrice: 259.99,
    dealPrice: 106.99,
    discount: 59,
    store: "Amazon",
    category: "Storage",
    url: "https://www.amazon.com/dp/B0B7CKVCCV",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 14,
    title: "SanDisk Creator Pro 2TB Portable SSD",
    description: "Fast external storage for creators, compact and durable design",
    originalPrice: 339.99,
    dealPrice: 230.99,
    discount: 32,
    store: "Best Buy",
    category: "Storage",
    url: "https://www.bestbuy.com/site/sandisk-creator-pro-2tb",
    postedAt: "2026-04-06T08:00:00Z",
  },
  {
    id: 15,
    title: "Garmin Forerunner 265",
    description: "AMOLED GPS running watch, training metrics, 13-day battery life",
    originalPrice: 350,
    dealPrice: 267,
    discount: 24,
    store: "Amazon",
    category: "Wearables",
    url: "https://www.amazon.com/dp/B0BS1N4TDP",
    postedAt: "2026-04-06T09:00:00Z",
  },
  {
    id: 16,
    title: "Apple Watch Ultra 2",
    description: "Titanium case, precision dual-frequency GPS, 36-hour battery",
    originalPrice: 799,
    dealPrice: 499,
    discount: 38,
    store: "Amazon",
    category: "Wearables",
    url: "https://www.amazon.com/dp/B0CHX4JGWL",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 17,
    title: "Google Nest Wi-Fi Pro (Linen)",
    description: "Tri-band Wi-Fi 6E mesh router with built-in smart home hub",
    originalPrice: 199.99,
    dealPrice: 89.99,
    discount: 55,
    store: "Amazon",
    category: "Networking",
    url: "https://www.amazon.com/dp/B0BVD5RFN8",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 18,
    title: "KTC H27T22C 27\" 1440p 200Hz Monitor",
    description: "97% DCI-P3, VA panel, 200Hz — best budget 1440p gaming monitor",
    originalPrice: 219,
    dealPrice: 140,
    discount: 36,
    store: "Amazon",
    category: "Monitors",
    url: "https://www.amazon.com/dp/B0DZKTC27G",
    postedAt: "2026-04-06T08:00:00Z",
    hot: true,
  },
  {
    id: 19,
    title: "Apple AirPods Pro 3",
    description: "Improved ANC, adaptive audio, USB-C charging case",
    originalPrice: 249,
    dealPrice: 199,
    discount: 20,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0DZP0DSPRO",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 20,
    title: "Razer Naga V2 Hyperspeed Wireless Gaming Mouse",
    description: "19 programmable buttons, up to 400 hours battery, HyperSpeed wireless",
    originalPrice: 99.99,
    dealPrice: 64.97,
    discount: 35,
    store: "Amazon",
    category: "Gaming",
    url: "https://www.amazon.com/dp/B0DZRAZRNV",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 21,
    title: "Alienware Area-51 18\" Gaming Laptop",
    description: "18-inch display, top-tier specs for serious gamers — Dell Spring Sale",
    originalPrice: 2720,
    dealPrice: 2399.99,
    discount: 12,
    store: "Dell",
    category: "Laptops",
    url: "https://www.dell.com/en-us/shop/deals/pc-laptop-deals",
    postedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: 22,
    title: "TG90° 10000mAh Power Bank with Built-in Cables",
    description: "Slim portable charger with built-in USB-C and Lightning cables",
    originalPrice: 39.99,
    dealPrice: 10.99,
    discount: 73,
    store: "Amazon",
    category: "Phones",
    url: "https://www.amazon.com/dp/B0DZTG90PB",
    postedAt: "2026-04-01T09:00:00Z",
    hot: true,
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
