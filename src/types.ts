export interface Service {
  id: string;
  title: string;
  description: string;
  estimateTime: string;
  basePrice: string;
  iconName: string;
  highlights: string[];
}

export type OrderStatus = 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'cancelled';

export interface OrderCall {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  whatsapp: string;
  pickupAddress: string;
  pickupContact: string; // nome da pessoa que vai entregar a encomenda
  deliveryAddress: string;
  deliveryContact: string; // nome da pessoa que vai receber a encomenda
  attachmentUrl?: string; // base64 string
  attachmentName?: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
  pickupDateTime?: string;
  deliveryDateTime?: string;
  estimatedPrice: number;
  estimatedDistance: number; // in km
  wantsInvoice?: boolean;
  invoiceCnpjOrCpf?: string;
  invoiceCompanyName?: string;
  notifyWhatsApp?: boolean;
  notifyEmail?: boolean;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}
