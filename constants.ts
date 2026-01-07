import { Product, ChartDataPoint, Testimonial } from './types';

export const NAV_LINKS = [
  { name: '交易区', href: '#' },
  { name: '数据分析', href: '#' },
  { name: '真伪鉴定', href: '#ai-verify' },
  { name: '智能估价', href: '#ai-appraisal' },
  { name: '发售', href: '#' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vintage 90s Nirvana 'In Utero' Tour Tee",
    category: 'T-Shirts',
    price: 250,
    imageUrl: 'https://picsum.photos/seed/product1/500/600',
    seller: {
      name: 'RetroGems',
      avatarUrl: 'https://picsum.photos/seed/avatar1/40/40',
    },
  },
  {
    id: 2,
    name: '80s Faded & Distressed Denim Jacket',
    category: 'Jackets',
    price: 480,
    imageUrl: 'https://picsum.photos/seed/product2/500/600',
     seller: {
      name: 'DenimDreams',
      avatarUrl: 'https://picsum.photos/seed/avatar2/40/40',
    },
  },
  {
    id: 3,
    name: 'Rare 2001 Etnies Skate Shoes - Good Condition',
    category: 'Footwear',
    price: 720,
    imageUrl: 'https://picsum.photos/seed/product3/500/600',
     seller: {
      name: 'SkateVault',
      avatarUrl: 'https://picsum.photos/seed/avatar3/40/40',
    },
  },
  {
    id: 4,
    name: 'Atelier Boz Gothic Lolita Dress',
    category: 'Dresses',
    price: 1100,
    imageUrl: 'https://picsum.photos/seed/product4/500/600',
     seller: {
      name: 'GothiqueChic',
      avatarUrl: 'https://picsum.photos/seed/avatar4/40/40',
    },
  },
  {
    id: 5,
    name: "Vintage 00s Band 'The Strokes' Tee",
    category: 'T-Shirts',
    price: 180,
    imageUrl: 'https://picsum.photos/seed/product5/500/600',
    seller: {
      name: 'IndieThreads',
      avatarUrl: 'https://picsum.photos/seed/avatar5/40/40',
    },
  },
  {
    id: 6,
    name: 'Japanese Boro Patchwork Kimono',
    category: 'Outerwear',
    price: 950,
    imageUrl: 'https://picsum.photos/seed/product6/500/600',
     seller: {
      name: 'WabiSabiWear',
      avatarUrl: 'https://picsum.photos/seed/avatar6/40/40',
    },
  },
  {
    id: 7,
    name: '90s Platform Skechers Sneakers',
    category: 'Footwear',
    price: 350,
    imageUrl: 'https://picsum.photos/seed/product7/500/600',
     seller: {
      name: '90sKicks',
      avatarUrl: 'https://picsum.photos/seed/avatar7/40/40',
    },
  },
  {
    id: 8,
    name: 'Vivienne Westwood Orb Necklace',
    category: 'Accessories',
    price: 620,
    imageUrl: 'https://picsum.photos/seed/product8/500/600',
     seller: {
      name: 'PunkRoyalty',
      avatarUrl: 'https://picsum.photos/seed/avatar8/40/40',
    },
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    quote: "NicheQuant的数据工具改变了游戏规则。我终于感觉在古着市场上有了真正的优势。估值见解非常准确。",
    name: 'Alex Johnson',
    handle: '@VintageHunter',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    quote: "卖掉我稀有的乐队T恤从未如此简单。流程非常精简和安全。此外，这里的社区真的很懂——他们欣赏这些物品的真正价值。",
    name: 'Samantha Lee',
    handle: '@RetroThreads',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    quote: "作为一名收藏家，鉴定服务让我完全放心。这是我唯一信任的进行高价值购买的平台。简洁的界面是一个巨大的加分项！",
    name: 'David Chen',
    handle: '@GothCollector',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
  },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { date: 'Jan', value: 1200 },
  { date: 'Feb', value: 1500 },
  { date: 'Mar', value: 1400 },
  { date: 'Apr', value: 1800 },
  { date: 'May', value: 1700 },
  { date: 'Jun', value: 2100 },
  { date: 'Jul', value: 2300 },
];