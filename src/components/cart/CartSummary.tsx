import React, { useState } from 'react';
import { TagIcon, XIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatBRL } from '../../data/types';
export function CartSummary() {
  const {
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const handleApply = () => {
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#5C3317]/5 shadow-sm">
      <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#2D2D2D] mb-5">
        Resumo do Pedido
      </h3>

      {/* Coupon */}
      {!couponCode ?
      <div className="mb-5">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C3317]/30" />
              <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
              placeholder="Cupom de desconto"
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#5C3317]/15 bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#D4652F]/30 focus:border-[#D4652F] placeholder:text-[#5C3317]/30 text-[#2D2D2D]"
              aria-label="Código do cupom de desconto" />

            </div>
            <button
            onClick={handleApply}
            className="px-4 py-2.5 bg-[#2D2D2D] text-white text-sm font-medium rounded-xl hover:bg-[#5C3317] transition-colors">

              Aplicar
            </button>
          </div>
          {couponError &&
        <p className="text-xs text-[#C41E3A] mt-1.5">{couponError}</p>
        }
        </div> :

      <div className="mb-5 flex items-center justify-between bg-green-50 rounded-xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <TagIcon className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              {couponCode}
            </span>
          </div>
          <button
          onClick={removeCoupon}
          className="text-green-600 hover:text-green-800 transition-colors"
          aria-label="Remover cupom">

            <XIcon className="w-4 h-4" />
          </button>
        </div>
      }

      {/* Totals */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[#5C3317]/70">
          <span>Subtotal</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        {discount > 0 &&
        <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>- {formatBRL(discount)}</span>
          </div>
        }
        <div className="flex justify-between text-[#5C3317]/70">
          <span>Taxa de entrega</span>
          <span>{deliveryFee > 0 ? formatBRL(deliveryFee) : 'A calcular'}</span>
        </div>
        <div className="pt-3 border-t border-[#5C3317]/10 flex justify-between">
          <span className="text-base font-bold text-[#2D2D2D]">Total</span>
          <span className="text-xl font-bold text-[#C41E3A]">
            {formatBRL(total)}
          </span>
        </div>
      </div>
    </div>);

}