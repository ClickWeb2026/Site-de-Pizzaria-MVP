import React, { useEffect, useState } from 'react';
import { MapPinIcon, StoreIcon } from 'lucide-react';
import { DeliveryMethod, DeliveryInfo } from '../../data/types';
import { useCart } from '../../context/CartContext';
interface DeliveryFormProps {
  value: DeliveryInfo;
  onChange: (info: DeliveryInfo) => void;
}
function getDeliveryFee(cep: string): number {
  if (!cep || cep.length < 5) return 0;
  const prefix = cep.replace(/\D/g, '').slice(0, 3);
  const num = parseInt(prefix, 10);
  if (num >= 10 && num <= 19) return 5.0;
  if (num >= 20 && num <= 39) return 8.0;
  if (num >= 40 && num <= 59) return 12.0;
  return 15.0;
}
function formatCEP(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
}
export function DeliveryForm({ value, onChange }: DeliveryFormProps) {
  const { setDeliveryFee } = useCart();
  const [method, setMethod] = useState<DeliveryMethod>(value.method);
  useEffect(() => {
    if (method === 'retirada') {
      setDeliveryFee(0);
    } else {
      const fee = getDeliveryFee(value.cep);
      setDeliveryFee(fee);
    }
  }, [method, value.cep, setDeliveryFee]);
  const handleMethodChange = (m: DeliveryMethod) => {
    setMethod(m);
    onChange({
      ...value,
      method: m
    });
  };
  const handleField = (field: keyof DeliveryInfo, val: string) => {
    const newVal = field === 'cep' ? formatCEP(val) : val;
    onChange({
      ...value,
      [field]: newVal
    });
  };
  const inputClass =
  'w-full px-4 py-3 text-sm rounded-xl border border-[#5C3317]/15 bg-[#FFF8F0] focus:outline-none focus:ring-2 focus:ring-[#D4652F]/30 focus:border-[#D4652F] placeholder:text-[#5C3317]/30 text-[#2D2D2D]';
  const labelClass = 'block text-xs font-medium text-[#5C3317]/70 mb-1.5';
  return (
    <div className="space-y-6">
      <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#2D2D2D]">
        Entrega ou Retirada
      </h3>

      {/* Toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleMethodChange('entrega')}
          className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${method === 'entrega' ? 'border-[#C41E3A] bg-[#C41E3A]/5 text-[#C41E3A]' : 'border-[#5C3317]/10 text-[#5C3317]/60 hover:border-[#5C3317]/20'}`}
          aria-pressed={method === 'entrega'}>

          <MapPinIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Entrega</span>
        </button>
        <button
          onClick={() => handleMethodChange('retirada')}
          className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${method === 'retirada' ? 'border-[#C41E3A] bg-[#C41E3A]/5 text-[#C41E3A]' : 'border-[#5C3317]/10 text-[#5C3317]/60 hover:border-[#5C3317]/20'}`}
          aria-pressed={method === 'retirada'}>

          <StoreIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Retirar no Local</span>
        </button>
      </div>

      {method === 'entrega' ?
      <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>CEP *</label>
              <input
              type="text"
              value={value.cep}
              onChange={(e) => handleField('cep', e.target.value)}
              placeholder="00000-000"
              className={inputClass}
              maxLength={9} />

              {value.cep.replace(/\D/g, '').length >= 5 &&
            <p className="text-xs text-[#D4652F] mt-1">
                  Taxa de entrega:{' '}
                  {getDeliveryFee(value.cep).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
                </p>
            }
            </div>
            <div>
              <label className={labelClass}>Bairro *</label>
              <input
              type="text"
              value={value.bairro}
              onChange={(e) => handleField('bairro', e.target.value)}
              placeholder="Seu bairro"
              className={inputClass} />

            </div>
          </div>
          <div>
            <label className={labelClass}>Endereço *</label>
            <input
            type="text"
            value={value.endereco}
            onChange={(e) => handleField('endereco', e.target.value)}
            placeholder="Rua, Avenida..."
            className={inputClass} />

          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Número *</label>
              <input
              type="text"
              value={value.numero}
              onChange={(e) => handleField('numero', e.target.value)}
              placeholder="Nº"
              className={inputClass} />

            </div>
            <div>
              <label className={labelClass}>Complemento</label>
              <input
              type="text"
              value={value.complemento}
              onChange={(e) => handleField('complemento', e.target.value)}
              placeholder="Apto, Bloco..."
              className={inputClass} />

            </div>
          </div>
        </div> :

      <div className="bg-[#D4652F]/5 rounded-xl p-5 border border-[#D4652F]/10">
          <div className="flex items-start gap-3">
            <StoreIcon className="w-5 h-5 text-[#D4652F] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#2D2D2D] mb-1">
                Retire no Forno Mágico
              </p>
              <p className="text-sm text-[#5C3317]/60">
                Rua das Pizzas, 123 — Centro, São Paulo, SP
              </p>
              <p className="text-sm text-[#D4652F] font-medium mt-2">
                ⏱ Tempo estimado: 30 a 40 minutos
              </p>
            </div>
          </div>
        </div>
      }
    </div>);

}