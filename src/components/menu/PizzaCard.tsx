import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { Pizza, formatBRL } from '../../data/types';
interface PizzaCardProps {
  pizza: Pizza;
  index: number;
  onSelect: (pizza: Pizza) => void;
}
export function PizzaCard({ pizza, index, onSelect }: PizzaCardProps) {
  const minPrice = pizza.sizes.P;
  const maxPrice = pizza.sizes.GG;
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: 'easeOut'
      }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#5C3317]/5 flex flex-col">

      {/* Image placeholder */}
      <div
        className={`relative h-40 sm:h-48 bg-gradient-to-br ${pizza.gradient} flex items-center justify-center overflow-hidden`}>

        <span
          className="text-6xl sm:text-7xl select-none"
          role="img"
          aria-label={pizza.name}>

          {pizza.emoji}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#2D2D2D] mb-1.5">
          {pizza.name}
        </h3>
        <p className="text-[#5C3317]/60 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {pizza.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#C41E3A] font-bold text-lg">
              {formatBRL(minPrice)}
            </span>
            <span className="text-[#5C3317]/40 text-xs ml-1">
              — {formatBRL(maxPrice)}
            </span>
          </div>
          <button
            onClick={() => onSelect(pizza)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#C41E3A] text-white text-sm font-medium rounded-full hover:bg-[#8B1A1A] transition-colors shadow-sm"
            aria-label={`Adicionar ${pizza.name} ao carrinho`}>

            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </motion.article>);

}