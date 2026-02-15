import React, { useState } from 'react';
import { CreditCardIcon, QrCodeIcon, BanknoteIcon } from 'lucide-react';
import { PaymentMethod, PaymentInfo } from '../../data/types';
interface PaymentFormProps {
  value: PaymentInfo;
  onChange: (info: PaymentInfo) => void;
}
const methods: {
  key: PaymentMethod;
  label: string;
  icon: typeof CreditCardIcon;
}[] = [
{
  key: 'cartao',
  label: 'Cartão',
  icon: CreditCardIcon
},
{
  key: 'pix',
  label: 'PIX',
  icon: QrCodeIcon
},
{
  key: 'dinheiro',
  label: 'Dinheiro',
  icon: BanknoteIcon
}];

function formatCardNumber(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val: string): string {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}
export function PaymentForm({ value, onChange }: PaymentFormProps) {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>(value.method);
  const handleMethodChange = (m: PaymentMethod) => {
    setActiveMethod(m);
    onChange({
      ...value,
      method: m
    });
  };
  const handleField = (field: keyof PaymentInfo, val: string | boolean) => {
    onChange({
      ...value,
      [field]: val
    });
  };
  const inputClass =
  'w-full px-4 py-3 text-sm rounded-xl border border-[#5C3317]/15 bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#D4652F]/30 focus:border-[#D4652F] placeholder:text-[#5C3317]/30 text-[#2D2D2D]';
  const labelClass = 'block text-xs font-medium text-[#5C3317]/70 mb-1.5';
  return (
    <div className="space-y-6">
      <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#2D2D2D]">
        Pagamento
      </h3>

      {/* Method tabs */}
      <div className="grid grid-cols-3 gap-2">
        {methods.map(({ key, label, icon: Icon }) =>
        <button
          key={key}
          onClick={() => handleMethodChange(key)}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${activeMethod === key ? 'border-[#C41E3A] bg-[#C41E3A]/5 text-[#C41E3A]' : 'border-[#5C3317]/10 text-[#5C3317]/60 hover:border-[#5C3317]/20'}`}
          aria-pressed={activeMethod === key}>

            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        )}
      </div>

      {/* Card form */}
      {activeMethod === 'cartao' &&
      <div className="space-y-4">
          <div>
            <label className={labelClass}>Número do Cartão *</label>
            <input
            type="text"
            value={value.cardNumber}
            onChange={(e) =>
            handleField('cardNumber', formatCardNumber(e.target.value))
            }
            placeholder="0000 0000 0000 0000"
            className={inputClass}
            maxLength={19}
            inputMode="numeric" />

          </div>
          <div>
            <label className={labelClass}>Nome no Cartão *</label>
            <input
            type="text"
            value={value.cardName}
            onChange={(e) =>
            handleField('cardName', e.target.value.toUpperCase())
            }
            placeholder="NOME COMO NO CARTÃO"
            className={inputClass} />

          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Validade *</label>
              <input
              type="text"
              value={value.cardExpiry}
              onChange={(e) =>
              handleField('cardExpiry', formatExpiry(e.target.value))
              }
              placeholder="MM/AA"
              className={inputClass}
              maxLength={5}
              inputMode="numeric" />

            </div>
            <div>
              <label className={labelClass}>CVV *</label>
              <input
              type="text"
              value={value.cardCvv}
              onChange={(e) =>
              handleField(
                'cardCvv',
                e.target.value.replace(/\D/g, '').slice(0, 4)
              )
              }
              placeholder="000"
              className={inputClass}
              maxLength={4}
              inputMode="numeric" />

            </div>
          </div>
        </div>
      }

      {/* PIX */}
      {activeMethod === 'pix' &&
      <div className="bg-[#FFF8F0] rounded-xl p-6 border border-[#5C3317]/10 text-center">
          <div className="w-40 h-40 mx-auto bg-white rounded-2xl border-2 border-dashed border-[#5C3317]/20 flex items-center justify-center mb-4">
            <QrCodeIcon className="w-20 h-20 text-[#5C3317]/20" />
          </div>
          <p className="text-sm text-[#5C3317]/60 mb-3">
            Escaneie o QR Code ou copie a chave PIX abaixo
          </p>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#5C3317]/10">
            <code className="text-xs text-[#5C3317]/70 flex-1 truncate">
              forno.magico@pix.com.br
            </code>
            <button
            onClick={() =>
            navigator.clipboard?.writeText('forno.magico@pix.com.br')
            }
            className="text-xs font-medium text-[#C41E3A] hover:text-[#8B1A1A] transition-colors whitespace-nowrap">

              Copiar
            </button>
          </div>
          <p className="text-xs text-[#5C3317]/40 mt-3">
            Após o pagamento, o pedido será confirmado automaticamente
          </p>
        </div>
      }

      {/* Dinheiro */}
      {activeMethod === 'dinheiro' &&
      <div className="space-y-4">
          <div className="bg-[#D4652F]/5 rounded-xl p-5 border border-[#D4652F]/10">
            <p className="text-sm text-[#2D2D2D] mb-1 font-medium">
              Pagamento na entrega
            </p>
            <p className="text-sm text-[#5C3317]/60">
              Aceitamos dinheiro e máquina de cartão (débito/crédito)
            </p>
          </div>
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
              type="checkbox"
              checked={value.needsChange}
              onChange={(e) => handleField('needsChange', e.target.checked)}
              className="w-4 h-4 rounded border-[#5C3317]/30 text-[#C41E3A] focus:ring-[#D4652F]/30" />

              <span className="text-sm text-[#2D2D2D]">Preciso de troco</span>
            </label>
          </div>
          {value.needsChange &&
        <div>
              <label className="block text-xs font-medium text-[#5C3317]/70 mb-1.5">
                Troco para quanto?
              </label>
              <input
            type="text"
            value={value.changeFor}
            onChange={(e) => handleField('changeFor', e.target.value)}
            placeholder="R$ 100,00"
            className={inputClass} />

            </div>
        }
        </div>
      }
    </div>);

}