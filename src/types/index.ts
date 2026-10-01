export interface ProductSize {
  name: string; // e.g. "Cup", "500 ML", "Standard", "Bottle 350ml"
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price?: number;
}

export type ProductCategory = 
  | 'sugarcane-juices'
  | 'fruit-infusion'
  | 'cane-specials'
  | 'health-boosts'
  | 'cold-pressed'
  | 'specials'
  | 'fruit-bowls';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  ingredients?: string[];
  image: string;
  sizes: ProductSize[];
  addOns?: AddOn[];
  featured?: boolean;
  bestseller?: boolean;
  available: boolean;
  accentNote?: string;
}

export interface CartItem {
  id: string; // Unique variant key: `${productId}-${sizeName}-${addOnsKey}`
  productId: string;
  name: string;
  size: ProductSize;
  addOns: string[];
  quantity: number;
  unitPrice: number;
  image: string;
}

export type OrderType = 'delivery' | 'takeaway' | 'dine-in';

export interface CheckoutFormState {
  fullName: string;
  mobile: string;
  orderType: OrderType;
  // Delivery specific
  houseFlat: string;
  streetArea: string;
  landmark: string;
  city: string;
  pinCode: string;
  preferredDeliveryTime: string;
  // Takeaway specific
  preferredPickupTime: string;
  // Dine-in specific
  tableDetails: string;
  preferredDineInTime: string;
  // Common
  specialInstructions: string;
}
