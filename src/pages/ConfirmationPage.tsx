import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { formatBRL } from '../data/types';
interface OrderState {
  orderId: string;
  total: number;
  deliveryMethod: 'entrega' | 'retirada';
  paymentMethod: 'cartao' | 'pix' | 'dinheiro';
  items: {
    name: string;
    size: string;
    quantity: number;
    price: number;
  }[];
}
const paymentLabels: Record<string, string> = {
  cartao: 'Cartão de Crédito/Débito',
  pix: 'PIX',
  dinheiro: 'Dinheiro na Entrega'
};
export function ConfirmationPage() {
  const location = useLocation();
  const order = location.state as OrderState | null;
  if (!order) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2D2D] mb-3">
            Nenhum pedido encontrado
          </h1>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C41E3A] text-white font-semibold rounded-full hover:bg-[#8B1A1A] transition-colors">

            Ver Menu
          </Link>
        </div>
      </main>);

  }
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut'
          }}
          className="text-center">

          {/* Animated checkmark */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            {/* Confetti particles */}
            {[...Array(8)].map((_, i) =>
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#C41E3A', '#D4652F', '#D4A843', '#5C3317'][
                i % 4],

                top: '50%',
                left: '50%'
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: Math.cos(i * Math.PI * 2 / 8) * 60,
                y: Math.sin(i * Math.PI * 2 / 8) * 60,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: 'easeOut'
              }} />

            )}
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: 0.1
              }}
              className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">

              <motion.div
                initial={{
                  pathLength: 0,
                  opacity: 0
                }}
                animate={{
                  pathLength: 1,
                  opacity: 1
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.4
                }}>

                <CheckIcon className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </div>

          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-2">
            Pedido Confirmado!
          </h1>
          <p className="text-[#5C3317]/60 text-base mb-2">
            Obrigado por escolher o Forno Mágico 🔥
          </p>
          <p className="text-sm text-[#5C3317]/40 mb-8">
            Número do pedido:{' '}
            <span className="font-mono font-bold text-[#2D2D2D]">
              #{order.orderId}
            </span>
          </p>

          {/* Order summary card */}
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
              duration: 0.5,
              delay: 0.3
            }}
            className="bg-white rounded-2xl p-6 border border-[#5C3317]/5 shadow-sm text-left mb-6">

            <h2 className="text-xs font-semibold text-[#5C3317]/50 uppercase tracking-wider mb-4">
              Resumo do Pedido
            </h2>
            <div className="space-y-3 mb-5">
              {order.items.map((item, i) =>
              <div key={i} className="flex justify-between text-sm">
                  <span className="text-[#2D2D2D]">
                    {item.quantity}x {item.name} ({item.size})
                  </span>
                  <span className="text-[#5C3317]/60">
                    {formatBRL(item.price)}
                  </span>
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-[#5C3317]/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#5C3317]/60">
                  {order.deliveryMethod === 'entrega' ?
                  '🛵 Entrega' :
                  '🏪 Retirada no local'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5C3317]/60">Pagamento</span>
                <span className="text-[#2D2D2D]">
                  {paymentLabels[order.paymentMethod]}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#5C3317]/10">
                <span className="font-bold text-[#2D2D2D]">Total</span>
                <span className="text-xl font-bold text-[#C41E3A]">
                  {formatBRL(order.total)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Estimated time */}
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
              duration: 0.5,
              delay: 0.45
            }}
            className="bg-[#D4652F]/5 rounded-xl p-4 border border-[#D4652F]/10 mb-8">

            <p className="text-sm text-[#2D2D2D]">
              ⏱ Tempo estimado:{' '}
              <span className="font-semibold">
                {order.deliveryMethod === 'entrega' ?
                '40 a 60 minutos' :
                '30 a 40 minutos'}
              </span>
            </p>
          </motion.div>

          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C41E3A] text-white font-semibold rounded-full hover:bg-[#8B1A1A] transition-colors shadow-lg shadow-[#C41E3A]/20">

            Voltar ao Menu
          </Link>
        </motion.div>
      </div>
    </main>);

}