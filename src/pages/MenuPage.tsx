import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Pizza, PizzaCategory } from '../data/types';
import { CategoryTabs } from '../components/menu/CategoryTabs';
import { PizzaCard } from '../components/menu/PizzaCard';
import { PizzaDetailModal } from '../components/menu/PizzaDetailModal';

const categories: PizzaCategory[] = ['classicas', 'especiais', 'vegetarianas', 'doces'];

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<PizzaCategory>('classicas');
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Busca as pizzas no servidor backend
    axios.get('http://localhost:3001/api/pizzas')
      .then((response) => {
        // Mapeando com os tipos corretos para o TypeScript não reclamar
        const formatadas: Pizza[] = response.data.map((p: {
          id: string;
          name: string;
          description: string;
          category: string;
          image_url: string;
          price_small: number;
          price_medium: number;
          price_large: number;
        }) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          category: p.category as PizzaCategory,
          emoji: p.image_url,
          gradient: 'from-amber-700 via-orange-500 to-yellow-400',
          sizes: { P: p.price_small, M: p.price_medium, G: p.price_large, GG: p.price_large + 15 }
        }));
        
        setPizzas(formatadas);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro de conexão:", err);
        setError("Não conseguimos conectar ao banco de dados. O servidor backend (porta 3001) está rodando?");
        setIsLoading(false);
      });
  }, []);

  const filtered = pizzas.filter((p) => p.category === activeCategory);

  // Tela de Carregamento
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16 flex items-center justify-center">
        <h2 className="font-['Playfair_Display'] text-2xl text-[#2D2D2D] animate-pulse">
          🔥 Assando as pizzas...
        </h2>
      </main>
    );
  }

  // Tela de Erro de Conexão
  if (error) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#C41E3A] mb-3">Ops! Falha na conexão</h2>
          <p className="text-[#5C3317]/70 text-base">{error}</p>
        </div>
      </main>
    );
  }

  // Tela Principal (Menu)
  return (
    <main className="min-h-screen bg-[#FFF8F0] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10">

          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2D2D] mb-3">
            Nosso Menu
          </h1>
          <p className="text-[#5C3317]/60 text-base max-w-lg mx-auto">
            Escolha sua pizza favorita e peça agora. Todas feitas no forno a lenha com ingredientes selecionados.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <CategoryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filtered.map((pizza, i) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={i} onSelect={setSelectedPizza} />
          ))}
        </motion.div>
      </div>

      <PizzaDetailModal pizza={selectedPizza} onClose={() => setSelectedPizza(null)} />
    </main>
  );
}