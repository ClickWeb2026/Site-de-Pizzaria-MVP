import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlameIcon } from 'lucide-react';
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated warm gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] via-[#5C3317] to-[#8B1A1A]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#D4652F]/30 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#C41E3A]/20 to-transparent"
          animate={{
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }} />

        {/* Ember particles */}
        {[...Array(6)].map((_, i) =>
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#D4652F]/60"
          style={{
            left: `${15 + i * 14}%`,
            bottom: '10%'
          }}
          animate={{
            y: [0, -200 - i * 40, -400],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeOut'
          }} />

        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut'
          }}
          className="mb-6">

          <FlameIcon className="w-14 h-14 md:w-16 md:h-16 text-[#D4652F] mx-auto mb-4" />
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: 'easeOut'
          }}
          className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#FFF8F0] mb-4 leading-tight">

          Forno Mágico
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: 'easeOut'
          }}
          className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl text-[#D4A843] italic mb-8">

          A magia está no sabor
        </motion.p>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.45,
            ease: 'easeOut'
          }}
          className="text-[#FFF8F0]/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">

          Pizza artesanal feita no forno a lenha com ingredientes selecionados.
          Tradição italiana com o sabor brasileiro que você ama.
        </motion.p>

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
            duration: 0.8,
            delay: 0.6,
            ease: 'easeOut'
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C41E3A] text-[#FFF8F0] font-semibold rounded-full text-base hover:bg-[#8B1A1A] transition-colors shadow-lg shadow-[#C41E3A]/30">

            Peça Agora
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#FFF8F0]/30 text-[#FFF8F0] font-semibold rounded-full text-base hover:border-[#FFF8F0]/60 hover:bg-white/5 transition-all">

            Ver Menu
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
    </section>);

}