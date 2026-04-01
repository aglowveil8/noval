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

// April 2026 deals — Dell Spring Sale, post-Amazon Big Spring Sale holdovers, Best Buy Spring Sale
export const deals: Deal[] = [
  {
    id: 1,
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
    id: 2,
    title: "Samsung Odyssey G50D 32\" 1440p 180Hz Monitor",
    description: "QHD gaming monitor, 180Hz refresh rate, 1ms response time",
    originalPrice: 429.99,
    dealPrice: 229,
    discount: 47,
    store: "Amazon",
    category: "Monitors",
    url: "https://www.amazon.com/dp/B0D5G50D32",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 3,
    title: "JBL Charge 6 Waterproof Bluetooth Speaker",
    description: "Portable wireless speaker, IP67 waterproof, 24-hour battery",
    originalPrice: 199.95,
    dealPrice: 109.95,
    discount: 45,
    store: "Amazon",
    category: "Audio",
    url: "https://www.amazon.com/dp/B0DZJBLCH6",
    postedAt: "2026-04-01T09:00:00Z",
    hot: true,
  },
  {
    id: 4,
    title: "Apple AirPods Pro 3",
    description: "Improved ANC, adaptive audio, USB-C charging case — holiday pricing returns",
    originalPrice: 249,
    dealPrice: 199,
    discount: 20,
    store: "Amazon",
    category: "Headphones",
    url: "https://www.amazon.com/dp/B0DZP0DSPRO",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 5,
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
    id: 6,
    title: "Asus ROG Strix Scope II 96 Wireless Keyboard",
    description: "Mechanical gaming keyboard, tri-mode wireless, hot-swappable switches",
    originalPrice: 209.99,
    dealPrice: 129.99,
    discount: 38,
    store: "Amazon",
    category: "Gaming",
    url: "https://www.amazon.com/dp/B0DZROGKB1",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 7,
    title: "Apple Watch Ultra 2",
    description: "Titanium case, precision dual-frequency GPS, 36-hour battery",
    originalPrice: 799,
    dealPrice: 499,
    discount: 38,
    store: "Amazon",
    category: "Wearables",
    url: "https://www.amazon.com/dp/B0CHX4JGWL",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 8,
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
    id: 9,
    title: "MSI Ventus RTX 5070",
    description: "High-performance GPU for 4K gaming, 12GB GDDR7",
    originalPrice: 699.99,
    dealPrice: 649.99,
    discount: 7,
    store: "Newegg",
    category: "Gaming",
    url: "https://www.newegg.com/msi-ventus-rtx5070",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 10,
    title: "Acer Nitro 27\" 1440p 180Hz Gaming Monitor",
    description: "0.5ms response time, 95% DCI-P3, HDR10 support",
    originalPrice: 299.99,
    dealPrice: 159.99,
    discount: 47,
    store: "Amazon",
    category: "Monitors",
    url: "https://www.amazon.com/dp/B0DZNITRO27",
    postedAt: "2026-04-01T08:00:00Z",
    hot: true,
  },
  {
    id: 11,
    title: "Lenovo IdeaTab 11\" 2.5K with Pen + Folio Case",
    description: "11-inch 2.5K IPS touchscreen tablet, includes stylus pen and folio case",
    originalPrice: 249.99,
    dealPrice: 179.99,
    discount: 28,
    store: "Amazon",
    category: "Tablets",
    url: "https://www.amazon.com/dp/B0DZLENTAB",
    postedAt: "2026-04-01T09:00:00Z",
  },
  {
    id: 12,
    title: "Apple USB-C to MagSafe 3 Charging Cable (2m)",
    description: "Official Apple 2-meter MagSafe 3 charging cable for MacBook",
    originalPrice: 49,
    dealPrice: 22.99,
    discount: 53,
    store: "Amazon",
    category: "Laptops",
    url: "https://www.amazon.com/dp/B0DZMAGSF3",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 13,
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
    id: 14,
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
    id: 15,
    title: "Corsair Vanguard Pro 96 Gaming Keyboard",
    description: "Wired mechanical keyboard, magnetic switches, per-key RGB",
    originalPrice: 229.99,
    dealPrice: 160,
    discount: 30,
    store: "Amazon",
    category: "Gaming",
    url: "https://www.amazon.com/dp/B0DZCORSKB",
    postedAt: "2026-04-01T09:00:00Z",
  },
  {
    id: 16,
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
  },
  {
    id: 18,
    title: "Insignia 55\" 4K Ultra HD Fire TV",
    description: "55-inch 4K display with built-in Fire TV, Alexa voice control",
    originalPrice: 349.99,
    dealPrice: 179.99,
    discount: 49,
    store: "Amazon",
    category: "Smart Home",
    url: "https://www.amazon.com/dp/B0DZINSIGN",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 19,
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
    id: 20,
    title: "Sonos Roam 2 Portable Speaker",
    description: "Compact waterproof Bluetooth/Wi-Fi speaker, automatic Trueplay tuning",
    originalPrice: 179,
    dealPrice: 139,
    discount: 22,
    store: "Amazon",
    category: "Audio",
    url: "https://www.amazon.com/dp/B0D5RGMNS2",
    postedAt: "2026-04-01T08:00:00Z",
  },
  {
    id: 21,
    title: "Apple iPad A16 (11-inch, 128GB)",
    description: "A16 chip, Liquid Retina display — $50 off matching best price of 2026",
    originalPrice: 499,
    dealPrice: 449,
    discount: 10,
    store: "Amazon",
    category: "Tablets",
    url: "https://www.amazon.com/dp/B0DJHBRL5M",
    postedAt: "2026-04-01T08:00:00Z",
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
