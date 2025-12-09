export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  ageGroup: AgeGroup;
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
  onSale?: boolean;
  rating: number;
  reviewCount: number;
  gender: Gender;
}

export type Category = 
  | 'dresses'
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'sets'
  | 'sleepwear'
  | 'activewear'
  | 'shoes'
  | 'accessories';

export type AgeGroup = 
  | 'newborn' // 0-3 months
  | 'infant'   // 3-12 months
  | 'toddler'  // 1-3 years
  | 'preschool' // 3-5 years
  | 'kids'     // 5-8 years
  | 'tween';   // 8-12 years

export type Size = 
  | 'newborn'
  | '0-3M'
  | '3-6M'
  | '6-9M'
  | '9-12M'
  | '12-18M'
  | '18-24M'
  | '2T'
  | '3T'
  | '4T'
  | '5T'
  | '6'
  | '7'
  | '8'
  | '10'
  | '12'
  | '14';

export type Color = 
  | 'red'
  | 'pink'
  | 'blue'
  | 'navy'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'white'
  | 'black'
  | 'gray'
  | 'multicolor'
  | 'pastel-pink'
  | 'pastel-blue'
  | 'pastel-yellow'
  | 'mint'
  | 'lavender';

export type Gender = 'boys' | 'girls' | 'unisex';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: Size;
  selectedColor: Color;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  image?: string;
  validUntil: Date;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}
