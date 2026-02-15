import React from 'react';
import { motion } from 'framer-motion';
import { PizzaCategory, CATEGORY_LABELS } from '../../data/types';
interface CategoryTabsProps {
  categories: PizzaCategory[];
  active: PizzaCategory;
  onChange: (cat: PizzaCategory) => void;
}
export function CategoryTabs({
  categories,
  active,
  onChange
}: CategoryTabsProps) {
  return (
    <div className="relative" role="tablist" aria-label="Categorias de pizza">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 px-1">
        {categories.map((cat) =>
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          onClick={() => onChange(cat)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${active === cat ? 'text-[#FFF8F0]' : 'text-[#5C3317]/70 hover:text-[#5C3317]'}`}>

            {active === cat &&
          <motion.div
            layoutId="category-tab-bg"
            className="absolute inset-0 bg-[#C41E3A] rounded-full"
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30
            }} />

          }
            <span className="relative z-10">{CATEGORY_LABELS[cat]}</span>
          </button>
        )}
      </div>
    </div>);

}