import React from 'react';
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { CartItem, formatBRL, SIZE_LABELS } from '../../data/types';
import { useCart } from '../../context/CartContext';
interface CartItemRowProps {
  item: CartItem;
}
export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className="flex gap-4 py-4 border-b border-[#5C3317]/10 last:border-b-0">
      <div className="flex-1 min-w-0">
        <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#2D2D2D] truncate">
          {item.name}
        </h3>
        <p className="text-xs text-[#5C3317]/50 mt-0.5">
          {item.size} — {SIZE_LABELS[item.size]}
        </p>
        {item.extras.length > 0 &&
        <p className="text-xs text-[#D4652F]/70 mt-1">
            + {item.extras.map((e) => e.name).join(', ')}
          </p>
        }
        <p className="text-sm font-medium text-[#5C3317]/70 mt-1">
          {formatBRL(item.unitPrice)} cada
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.cartId)}
          className="text-[#5C3317]/30 hover:text-[#C41E3A] transition-colors p-1"
          aria-label={`Remover ${item.name} do carrinho`}>

          <Trash2Icon className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-7 h-7 rounded-full border border-[#5C3317]/15 flex items-center justify-center text-[#5C3317] disabled:opacity-30 hover:border-[#5C3317]/30 transition-colors"
            aria-label="Diminuir quantidade">

            <MinusIcon className="w-3 h-3" />
          </button>
          <span className="text-sm font-bold text-[#2D2D2D] w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
            className="w-7 h-7 rounded-full border border-[#5C3317]/15 flex items-center justify-center text-[#5C3317] hover:border-[#5C3317]/30 transition-colors"
            aria-label="Aumentar quantidade">

            <PlusIcon className="w-3 h-3" />
          </button>
        </div>

        <span className="text-sm font-bold text-[#C41E3A]">
          {formatBRL(item.unitPrice * item.quantity)}
        </span>
      </div>
    </div>);

}