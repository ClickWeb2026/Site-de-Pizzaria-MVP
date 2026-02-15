import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';
import { DeliveryInfo, PaymentInfo, formatBRL } from '../data/types';
import { useCart } from '../context/CartContext';
import { DeliveryForm } from '../components/checkout/DeliveryForm';
import { PaymentForm } from '../components/checkout/PaymentForm';
import { CartSummary } from '../components/cart/CartSummary';
const initialDelivery: DeliveryInfo = {
  method: 'entrega',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: ''
};
const initialPayment: PaymentInfo = {
  method: 'cartao',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
  needsChange: false,
  changeFor: ''
};
export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [delivery, setDelivery] = useState<DeliveryInfo>(initialDelivery);
  const [payment, setPayment] = useState<PaymentInfo>(initialPayment);
  const [errors, setErrors] = useState<string[]>([]);
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2D2D] mb-3">
            Nenhum item no carrinho
          </h1>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#C41E3A] text-white font-semibold rounded-full hover:bg-[#8B1A1A] transition-colors">

            Ver Menu
          </Link>
        </div>
      </main>);

  }
  const validate = (): boolean => {
    const errs: string[] = [];
    if (delivery.method === 'entrega') {
      if (!delivery.cep || delivery.cep.replace(/\D/g, '').length < 8)
      errs.push('Informe um CEP válido');
      if (!delivery.endereco.trim()) errs.push('Informe o endereço');
      if (!delivery.numero.trim()) errs.push('Informe o número');
      if (!delivery.bairro.trim()) errs.push('Informe o bairro');
    }
    if (payment.method === 'cartao') {
      if (payment.cardNumber.replace(/\D/g, '').length < 16)
      errs.push('Número do cartão inválido');
      if (!payment.cardName.trim()) errs.push('Informe o nome no cartão');
      if (payment.cardExpiry.replace(/\D/g, '').length < 4)
      errs.push('Validade inválida');
      if (payment.cardCvv.length < 3) errs.push('CVV inválido');
    }
    setErrors(errs);
    return errs.length === 0;
  };
  const handleConfirm = () => {
    if (!validate()) return;
    clearCart();
    navigate('/confirmacao', {
      state: {
        orderId: `FM${Date.now().toString().slice(-6)}`,
        total,
        deliveryMethod: delivery.method,
        paymentMethod: payment.method,
        items: items.map((i) => ({
          name: i.name,
          size: i.size,
          quantity: i.quantity,
          price: i.unitPrice * i.quantity
        }))
      }
    });
  };
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

          <Link
            to="/carrinho"
            className="inline-flex items-center gap-1.5 text-sm text-[#5C3317]/60 hover:text-[#C41E3A] transition-colors mb-6">

            <ArrowLeftIcon className="w-4 h-4" />
            Voltar ao Carrinho
          </Link>

          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-8">
            Finalizar Pedido
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-[#5C3317]/5 shadow-sm">
                <DeliveryForm value={delivery} onChange={setDelivery} />
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#5C3317]/5 shadow-sm">
                <PaymentForm value={payment} onChange={setPayment} />
              </div>

              {errors.length > 0 &&
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-red-700 mb-2">
                    Por favor, corrija os seguintes erros:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                    {errors.map((err, i) =>
                  <li key={i}>{err}</li>
                  )}
                  </ul>
                </div>
              }
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <CartSummary />

              {/* Order items preview */}
              <div className="bg-white rounded-2xl p-5 border border-[#5C3317]/5 shadow-sm">
                <h3 className="text-xs font-semibold text-[#5C3317]/50 uppercase tracking-wider mb-3">
                  Seus Itens
                </h3>
                <div className="space-y-2">
                  {items.map((item) =>
                  <div
                    key={item.cartId}
                    className="flex justify-between text-sm">

                      <span className="text-[#2D2D2D] truncate mr-2">
                        {item.quantity}x {item.name} ({item.size})
                      </span>
                      <span className="text-[#5C3317]/60 whitespace-nowrap">
                        {formatBRL(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full py-3.5 bg-[#C41E3A] text-white font-semibold rounded-full hover:bg-[#8B1A1A] transition-colors shadow-lg shadow-[#C41E3A]/20 text-base">

                Confirmar Pedido
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>);

}