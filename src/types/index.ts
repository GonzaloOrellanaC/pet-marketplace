export interface User {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'seller' | 'customer';
  tenantId?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'blocked';
}

export interface Product {
  _id: string; // Changed from id to _id
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  tenantId: string;
  averageRating: number;
}

export interface Order {
  id: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
