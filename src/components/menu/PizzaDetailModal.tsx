import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import {
  Pizza,
  PizzaSize,
  Extra,
  SIZE_LABELS,
  formatBRL } from
'../../data/types';
import { bordas, ingredientesExtras } from '../../data/extras';
import { useCart } from '../../context/CartContext';
interface PizzaDetailModalProps {
  pizza: Pizza | null;
  onClose: () => void;
}
const sizes: PizzaSize[] = ['P', 'M', 'G', 'GG'];
export function PizzaDetailModal({ pizza, onClose }: PizzaDetailModalProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (pizza) {
      setSelectedSize('M');
      setSelectedExtras([]);
      setQuantity(1);
      setAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [pizza]);
  if (!pizza) return null;
  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.id === extra.id);
      if (exists) return prev.filter((e) => e.id !== extra.id);
      // Only one borda at a time
      if (extra.type === 'borda') {
        return [...prev.filter((e) => e.type !== 'borda'), extra];
      }
      return [...prev, extra];
    });
  };
  const basePrice = pizza.sizes[selectedSize];
  const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitTotal = basePrice + extrasPrice;
  const totalPrice = unitTotal * quantity;
  const handleAdd = () => {
    addItem(
      {
        id: pizza.id,
        name: pizza.name,
        size: selectedSize,
        unitPrice: basePrice,
        extras: selectedExtras
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => onClose(), 800);
  };
  return (
    <AnimatePresence>
      {pizza &&
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${pizza.name}`}>

          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose} />


          {/* Modal */}
          <motion.div
          initial={{
            opacity: 0,
            y: 100
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 100
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
          className="relative w-full max-w-lg max-h-[90vh] bg-[#FFF8F0] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl">

            {/* Header image */}
            <div
            className={`relative h-44 bg-gradient-to-br ${pizza.gradient} flex items-center justify-center flex-shrink-0`}>

              <span
              className="text-7xl select-none"
              role="img"
              aria-label={pizza.name}>

                {pizza.emoji}
              </span>
              <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              aria-label="Fechar">

                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2D2D] mb-2">
                  {pizza.name}
                </h2>
                <p className="text-[#5C3317]/60 text-sm leading-relaxed">
                  {pizza.description}
                </p>
              </div>

              {/* Size selector */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D2D2D] mb-3">
                  Tamanho
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((size) =>
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 rounded-xl text-left border-2 transition-all ${selectedSize === size ? 'border-[#C41E3A] bg-[#C41E3A]/5' : 'border-[#5C3317]/10 hover:border-[#5C3317]/20'}`}>

                      <span
                    className={`text-sm font-semibold ${selectedSize === size ? 'text-[#C41E3A]' : 'text-[#2D2D2D]'}`}>

                        {size}
                      </span>
                      <span className="text-xs text-[#5C3317]/50 block">
                        {SIZE_LABELS[size]}
                      </span>
                      <span
                    className={`text-sm font-bold mt-1 block ${selectedSize === size ? 'text-[#C41E3A]' : 'text-[#2D2D2D]'}`}>

                        {formatBRL(pizza.sizes[size])}
                      </span>
                    </button>
                )}
                </div>
              </div>

              {/* Borda */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D2D2D] mb-3">
                  Borda Recheada{' '}
                  <span className="font-normal text-[#5C3317]/50">
                    (opcional)
                  </span>
                </h3>
                <div className="space-y-2">
                  {bordas.map((borda) => {
                  const isSelected = selectedExtras.some(
                    (e) => e.id === borda.id
                  );
                  return (
                    <button
                      key={borda.id}
                      onClick={() => toggleExtra(borda)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-[#D4652F] bg-[#D4652F]/5' : 'border-[#5C3317]/10 hover:border-[#5C3317]/20'}`}>

                        <span
                        className={`text-sm ${isSelected ? 'text-[#D4652F] font-medium' : 'text-[#2D2D2D]'}`}>

                          {borda.name}
                        </span>
                        <span
                        className={`text-sm font-medium ${isSelected ? 'text-[#D4652F]' : 'text-[#5C3317]/60'}`}>

                          + {formatBRL(borda.price)}
                        </span>
                      </button>);

                })}
                </div>
              </div>

              {/* Extras */}
              <div>
                <h3 className="text-sm font-semibold text-[#2D2D2D] mb-3">
                  Ingredientes Extras{' '}
                  <span className="font-normal text-[#5C3317]/50">
                    (opcional)
                  </span>
                </h3>
                <div className="space-y-2">
                  {ingredientesExtras.map((extra) => {
                  const isSelected = selectedExtras.some(
                    (e) => e.id === extra.id
                  );
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-[#D4652F] bg-[#D4652F]/5' : 'border-[#5C3317]/10 hover:border-[#5C3317]/20'}`}>

                        <span
                        className={`text-sm ${isSelected ? 'text-[#D4652F] font-medium' : 'text-[#2D2D2D]'}`}>

                          {extra.name}
                        </span>
                        <span
                        className={`text-sm font-medium ${isSelected ? 'text-[#D4652F]' : 'text-[#5C3317]/60'}`}>

                          + {formatBRL(extra.price)}
                        </span>
                      </button>);

                })}
                </div>
              </div>
            </div>

            {/* Footer: Quantity + Add to cart */}
            <div className="flex-shrink-0 p-6 border-t border-[#5C3317]/10 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full border-2 border-[#5C3317]/15 flex items-center justify-center text-[#5C3317] hover:border-[#5C3317]/30 transition-colors"
                  aria-label="Diminuir quantidade">

                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-bold text-[#2D2D2D] w-8 text-center">
                    {quantity}
                  </span>
                  <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-full border-2 border-[#5C3317]/15 flex items-center justify-center text-[#5C3317] hover:border-[#5C3317]/30 transition-colors"
                  aria-label="Aumentar quantidade">

                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#5C3317]/50 block">Total</span>
                  <span className="text-xl font-bold text-[#C41E3A]">
                    {formatBRL(totalPrice)}
                  </span>
                </div>
              </div>
              <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all ${added ? 'bg-green-600 text-white' : 'bg-[#C41E3A] text-white hover:bg-[#8B1A1A] shadow-lg shadow-[#C41E3A]/20'}`}>

                <ShoppingCartIcon className="w-5 h-5" />
                {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}