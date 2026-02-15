import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { FlameIcon, LeafIcon, ChefHatIcon } from 'lucide-react';
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
export function AboutSection() {
  return (
    <section
      className="py-20 md:py-28 bg-[#FFF8F0]"
      aria-labelledby="about-heading">

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
          className="text-center mb-16">

          <h2
            id="about-heading"
            className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2D2D] mb-4">

            Nossa História
          </h2>
          <p className="text-[#5C3317]/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Desde 2010, o Forno Mágico traz a verdadeira experiência da pizza
            artesanal. Cada pizza é preparada com carinho, usando receitas
            tradicionais italianas e os melhores ingredientes da região.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-80px'
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.article
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#5C3317]/5">

            <div className="w-16 h-16 rounded-2xl bg-[#C41E3A]/10 flex items-center justify-center mx-auto mb-6">
              <ChefHatIcon className="w-8 h-8 text-[#C41E3A]" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#2D2D2D] mb-3">
              Massa Artesanal
            </h3>
            <p className="text-[#5C3317]/60 text-sm leading-relaxed">
              Nossa massa descansa por 72 horas para desenvolver sabor e textura
              perfeitos. Feita diariamente com farinha italiana importada.
            </p>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#5C3317]/5">

            <div className="w-16 h-16 rounded-2xl bg-[#D4652F]/10 flex items-center justify-center mx-auto mb-6">
              <LeafIcon className="w-8 h-8 text-[#D4652F]" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#2D2D2D] mb-3">
              Ingredientes Frescos
            </h3>
            <p className="text-[#5C3317]/60 text-sm leading-relaxed">
              Selecionamos os melhores ingredientes todos os dias. Tomates
              orgânicos, queijos artesanais e temperos frescos da horta.
            </p>
          </motion.article>

          <motion.article
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#5C3317]/5">

            <div className="w-16 h-16 rounded-2xl bg-[#D4A843]/10 flex items-center justify-center mx-auto mb-6">
              <FlameIcon className="w-8 h-8 text-[#D4A843]" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#2D2D2D] mb-3">
              Forno a Lenha
            </h3>
            <p className="text-[#5C3317]/60 text-sm leading-relaxed">
              Nosso forno a lenha atinge 450°C, garantindo uma pizza com borda
              crocante por fora e macia por dentro em apenas 90 segundos.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>);

}