export interface Product {
  _id?: string;
  id?: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  seller: {
    _id?: string;
    name: string;
    avatarUrl: string;
  };
}

export interface ChartDataPoint {
  _id?: string;
  date: string;
  value: number;
}

export interface Testimonial {
  _id?: string;
  quote: string;
  name: string;
  handle: string;
  avatarUrl: string;
}
