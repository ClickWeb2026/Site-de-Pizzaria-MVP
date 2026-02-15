import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, MapPinIcon, ClockIcon } from 'lucide-react';
export function InfoSection() {
  return (
    <section
      className="py-20 md:py-28 bg-[#2D2D2D]"
      aria-labelledby="info-heading">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-14">

          <h2
            id="info-heading"
            className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#FFF8F0] mb-3">

            Venha nos Visitar
          </h2>
          <p className="text-[#FFF8F0]/50 text-base max-w-lg mx-auto">
            Estamos esperando você para uma experiência inesquecível
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0
            }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">

            <MapPinIcon className="w-8 h-8 text-[#D4652F] mx-auto mb-4" />
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#FFF8F0] mb-2">
              Endereço
            </h3>
            <p className="text-[#FFF8F0]/60 text-sm leading-relaxed">
              Rua das Pizzas, 123
              <br />
              Centro — São Paulo, SP
              <br />
              CEP 01001-000
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">

            <ClockIcon className="w-8 h-8 text-[#D4652F] mx-auto mb-4" />
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#FFF8F0] mb-2">
              Horário
            </h3>
            <div className="text-[#FFF8F0]/60 text-sm leading-relaxed">
              <p className="mb-1">
                <span className="text-[#FFF8F0]/80">Seg — Sex:</span> 18h às 23h
              </p>
              <p>
                <span className="text-[#FFF8F0]/80">Sáb — Dom:</span> 17h às 00h
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">

            <PhoneIcon className="w-8 h-8 text-[#D4652F] mx-auto mb-4" />
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#FFF8F0] mb-2">
              Telefone
            </h3>
            <a
              href="tel:+5511999999999"
              className="text-[#FFF8F0]/60 text-sm hover:text-[#D4652F] transition-colors">

              (11) 99999-9999
            </a>
            <p className="text-[#FFF8F0]/40 text-xs mt-2">
              WhatsApp disponível
            </p>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.5,
            delay: 0.3
          }}
          className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-white/5 h-48 md:h-64 flex items-center justify-center">

          <div className="text-center">
            <MapPinIcon className="w-10 h-10 text-[#D4652F]/40 mx-auto mb-2" />
            <p className="text-[#FFF8F0]/30 text-sm">
              Mapa interativo em breve
            </p>
          </div>
        </motion.div>
      </div>
    </section>);

}