export interface Motorcycle {
  id: string;
  brand: 'Honda' | 'Yamaha' | 'Suzuki' | 'Kawasaki' | 'Dafra' | 'Shineray' | 'Outras';
  model: string;
  category: string; // e.g. "Street", "Trail", "Scooter", "Custom"
  startYear: number;
  endYear: number;
  image?: string;
}

export interface ProductCompatibility {
  brand: string;
  model: string;
  yearRange: string; // e.g. "2016 a 2026"
  notes?: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  subcategories: SubCategory[];
  featuredImage?: string;
  itemCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string; // e.g. "DID", "Vaz", "Cobreq", "K&N", "Mobil", "Honda Original"
  partNumber: string; // OEM / SKU Code
  categoryId: string;
  subcategoryId?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  installmentsCount: number; // e.g. 3 or 6 or 12
  inStock: boolean;
  stockQuantity: number;
  minStockThreshold: number; // e.g. 5
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isWeeklyOffer?: boolean;
  rating: number; // e.g. 4.9
  reviewsCount: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  compatibilities: ProductCompatibility[];
  warrantyMonths: number;
  tags?: string[];
  faqs?: { question: string; answer: string }[];
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  partNumber: string;
  type: 'entrada' | 'saida';
  quantity: number;
  reason: string; // e.g. "Venda Pedido #GM-1092" | "Reposição de Estoque" | "Ajuste de Inventário"
  date: string;
  resultingStock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  code: 'motoboy' | 'sedex' | 'pac' | 'retirada';
  price: number;
  deadlineDays: number;
  deadlineText: string;
  description: string;
  isFree?: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderValue: number;
  active: boolean;
  description: string;
}

export interface CustomerAddress {
  id: string;
  label: string; // "Minha Casa", "Oficina", "Trabalho"
  isDefault: boolean;
  recipientName: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: CustomerAddress[];
  createdAt: string;
}

export type OrderStatus = 'pendente' | 'pago' | 'em_separacao' | 'enviado' | 'entregue' | 'cancelado';

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  code: string; // e.g. "GM-94821"
  createdAt: string;
  customer: {
    userId?: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  shippingAddress: CustomerAddress;
  shippingOption: ShippingOption;
  paymentMethod: 'pix' | 'credit_card' | 'debit_card' | 'boleto';
  paymentDetails: {
    cardLast4?: string;
    installments?: number;
    installmentValue?: number;
    pixQrCode?: string;
    pixCopyPaste?: string;
    boletoBarcode?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  status: OrderStatus;
  trackingCode?: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  bikeModel: string;
  cityState: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName?: string;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  acceptedAt?: string;
}
