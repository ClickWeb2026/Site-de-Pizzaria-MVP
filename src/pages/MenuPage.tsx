import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pizza, PizzaCategory } from '../data/types';
import { pizzas } from '../data/pizzas';
import { CategoryTabs } from '../components/menu/CategoryTabs';
import { PizzaCard } from '../components/menu/PizzaCard';
import { PizzaDetailModal } from '../components/menu/PizzaDetailModal';
const categories: PizzaCategory[] = [
'classicas',
'especiais',
'vegetarianas',
'doces'];

export function MenuPage() {
  const [activeCategory, setActiveCategory] =
  useState<PizzaCategory>('classicas');
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const filtered = pizzas.filter((p) => p.category === activeCategory);
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
          }}
          className="text-center mb-10">

          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2D2D] mb-3">
            Nosso Menu
          </h1>
          <p className="text-[#5C3317]/60 text-base max-w-lg mx-auto">
            Escolha sua pizza favorita e peça agora. Todas feitas no forno a
            lenha com ingredientes selecionados.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory} />

        </div>

        {/* Pizza Grid */}
        <motion.div
          key={activeCategory}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.3
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filtered.map((pizza, i) =>
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            index={i}
            onSelect={setSelectedPizza} />

          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <PizzaDetailModal
        pizza={selectedPizza}
        onClose={() => setSelectedPizza(null)} />

    </main>);

}