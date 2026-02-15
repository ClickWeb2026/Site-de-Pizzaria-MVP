import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, ArrowLeftIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
export function CartPage() {
  const { items } = useCart();
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5
          }}>

          {/* Back link */}
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm text-[#5C3317]/60 hover:text-[#C41E3A] transition-colors mb-6">

            <ArrowLeftIcon className="w-4 h-4" />
            Voltar ao Menu
          </Link>

          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-8">
            Seu Carrinho
          </h1>

          {items.length === 0 ?
          <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-[#5C3317]/5 flex items-center justify-center mx-auto mb-6">
                <ShoppingCartIcon className="w-10 h-10 text-[#5C3317]/20" />
              </div>
              <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#2D2D2D] mb-2">
                Carrinho vazio
              </h2>
              <p className="text-[#5C3317]/50 text-sm mb-6">
                Que tal explorar nosso menu e escolher uma pizza deliciosa?
              </p>
              <Link
              to="/menu"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#C41E3A] text-white font-semibold rounded-full hover:bg-[#8B1A1A] transition-colors shadow-lg shadow-[#C41E3A]/20">

                Ver Menu
              </Link>
            </div> :

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 border border-[#5C3317]/5 shadow-sm">
                  <h2 className="text-sm font-semibold text-[#5C3317]/50 uppercase tracking-wider mb-4">
                    {items.length} {items.length === 1 ? 'item' : 'itens'}
                  </h2>
                  {items.map((item) =>
                <CartItemRow key={item.cartId} item={item} />
                )}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <CartSummary />
                <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 bg-[#C41E3A] text-white font-semibold rounded-full hover:bg-[#8B1A1A] transition-colors shadow-lg shadow-[#C41E3A]/20 text-base">

                  Finalizar Pedido
                </button>
              </div>
            </div>
          }
        </motion.div>
      </div>
    </main>);

}