export type PizzaCategory = 'classicas' | 'especiais' | 'vegetarianas' | 'doces';

export type PizzaSize = 'P' | 'M' | 'G' | 'GG';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  category: PizzaCategory;
  emoji: string;
  gradient: string;
  sizes: Record<PizzaSize, number>;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  type: 'borda' | 'ingrediente';
}

export interface CartItem {
  cartId: string;
  pizzaId: string;
  name: string;
  size: PizzaSize;
  quantity: number;
  unitPrice: number;
  extras: Extra[];
}

export type DeliveryMethod = 'entrega' | 'retirada';

export type PaymentMethod = 'cartao' | 'pix' | 'dinheiro';

export interface DeliveryInfo {
  method: DeliveryMethod;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  needsChange: boolean;
  changeFor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  deliveryInfo: DeliveryInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  estimatedTime: string;
  createdAt: Date;
}

export interface Coupon {
  code: string;
  discountPercent: number;
}

export const CATEGORY_LABELS: Record<PizzaCategory, string> = {
  classicas: 'Clássicas',
  especiais: 'Especiais',
  vegetarianas: 'Vegetarianas',
  doces: 'Doces'
};

export const SIZE_LABELS: Record<PizzaSize, string> = {
  P: 'Pequena (4 fatias)',
  M: 'Média (6 fatias)',
  G: 'Grande (8 fatias)',
  GG: 'Gigante (12 fatias)'
};

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}