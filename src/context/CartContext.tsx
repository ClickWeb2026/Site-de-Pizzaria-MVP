import React, {
  useCallback,
  useMemo,
  useState,
  createContext,
  useContext } from
'react';
import { CartItem, Extra, PizzaSize, Coupon } from '../data/types';
const VALID_COUPONS: Coupon[] = [
{
  code: 'FORNO10',
  discountPercent: 10
},
{
  code: 'PRIMEIRACOMPRA',
  discountPercent: 15
}];

interface CartContextValue {
  items: CartItem[];
  addItem: (
  pizza: {
    id: string;
    name: string;
    size: PizzaSize;
    unitPrice: number;
    extras: Extra[];
  },
  quantity: number)
  => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  couponCode: string | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  deliveryFee: number;
  setDeliveryFee: (fee: number) => void;
  discount: number;
  total: number;
  itemCount: number;
  lastAddedId: string | null;
}
const CartContext = createContext<CartContextValue | null>(null);
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
function generateCartId(): string {
  return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
export function CartProvider({ children }: {children: ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const addItem = useCallback(
    (
    pizza: {
      id: string;
      name: string;
      size: PizzaSize;
      unitPrice: number;
      extras: Extra[];
    },
    quantity: number) =>
    {
      const cartId = generateCartId();
      const newItem: CartItem = {
        cartId,
        pizzaId: pizza.id,
        name: pizza.name,
        size: pizza.size,
        quantity,
        unitPrice:
        pizza.unitPrice + pizza.extras.reduce((sum, e) => sum + e.price, 0),
        extras: pizza.extras
      };
      setItems((prev) => [...prev, newItem]);
      setLastAddedId(cartId);
      setTimeout(() => setLastAddedId(null), 600);
    },
    []
  );
  const removeItem = useCallback((cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);
  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
    prev.map((i) =>
    i.cartId === cartId ?
    {
      ...i,
      quantity
    } :
    i
    )
    );
  }, []);
  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
    setCouponError(null);
    setDeliveryFee(0);
  }, []);
  const applyCoupon = useCallback((code: string): boolean => {
    const upper = code.toUpperCase().trim();
    const found = VALID_COUPONS.find((c) => c.code === upper);
    if (found) {
      setCouponCode(found.code);
      setCouponError(null);
      return true;
    }
    setCouponError('Cupom inválido. Tente novamente.');
    return false;
  }, []);
  const removeCoupon = useCallback(() => {
    setCouponCode(null);
    setCouponError(null);
  }, []);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [items]
  );
  const discount = useMemo(() => {
    if (!couponCode) return 0;
    const coupon = VALID_COUPONS.find((c) => c.code === couponCode);
    return coupon ? subtotal * (coupon.discountPercent / 100) : 0;
  }, [couponCode, subtotal]);
  const total = useMemo(
    () => Math.max(0, subtotal - discount + deliveryFee),
    [subtotal, discount, deliveryFee]
  );
  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      couponCode,
      couponError,
      applyCoupon,
      removeCoupon,
      subtotal,
      deliveryFee,
      setDeliveryFee,
      discount,
      total,
      itemCount,
      lastAddedId
    }),
    [
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    subtotal,
    deliveryFee,
    discount,
    total,
    itemCount,
    lastAddedId]

  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}