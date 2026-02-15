import { Pizza } from './types';

export const pizzas: Pizza[] = [
// === CLÁSSICAS ===
{
  id: 'margherita',
  name: 'Margherita',
  description:
  'A clássica italiana com molho de tomate San Marzano, mussarela de búfala fresca, manjericão fresco e um fio de azeite extra virgem.',
  category: 'classicas',
  emoji: '🍕',
  gradient: 'from-red-700 via-red-500 to-orange-400',
  sizes: { P: 29.9, M: 39.9, G: 49.9, GG: 64.9 }
},
{
  id: 'calabresa',
  name: 'Calabresa',
  description:
  'Generosas fatias de calabresa defumada artesanal, cebola roxa caramelizada, azeitonas pretas e orégano fresco.',
  category: 'classicas',
  emoji: '🌶️',
  gradient: 'from-red-800 via-red-600 to-amber-500',
  sizes: { P: 28.9, M: 38.9, G: 48.9, GG: 62.9 }
},
{
  id: 'portuguesa',
  name: 'Portuguesa',
  description:
  'Presunto, ovos, cebola, azeitonas verdes, ervilha, mussarela e orégano. A favorita dos brasileiros.',
  category: 'classicas',
  emoji: '🥚',
  gradient: 'from-amber-700 via-yellow-600 to-green-500',
  sizes: { P: 30.9, M: 40.9, G: 52.9, GG: 66.9 }
},
{
  id: 'quatro-queijos',
  name: 'Quatro Queijos',
  description:
  'Harmonização perfeita de mussarela, provolone, gorgonzola e parmesão ralado na hora.',
  category: 'classicas',
  emoji: '🧀',
  gradient: 'from-yellow-600 via-amber-400 to-orange-300',
  sizes: { P: 32.9, M: 42.9, G: 54.9, GG: 68.9 }
},
{
  id: 'pepperoni',
  name: 'Pepperoni',
  description:
  'Pepperoni importado fatiado fino, mussarela derretida e molho de tomate especial da casa.',
  category: 'classicas',
  emoji: '🔴',
  gradient: 'from-red-900 via-red-700 to-red-400',
  sizes: { P: 31.9, M: 41.9, G: 53.9, GG: 67.9 }
},

// === ESPECIAIS ===
{
  id: 'file-mignon',
  name: 'Filé Mignon com Cheddar',
  description:
  'Cubos de filé mignon grelhados, creme de cheddar inglês, cebola crispy e rúcula fresca.',
  category: 'especiais',
  emoji: '🥩',
  gradient: 'from-amber-900 via-amber-700 to-yellow-500',
  sizes: { P: 39.9, M: 52.9, G: 65.9, GG: 82.9 }
},
{
  id: 'camarao',
  name: 'Camarão',
  description:
  'Camarões rosa salteados no alho e azeite, cream cheese, tomate cereja e cebolinha.',
  category: 'especiais',
  emoji: '🦐',
  gradient: 'from-orange-600 via-pink-400 to-rose-300',
  sizes: { P: 44.9, M: 58.9, G: 72.9, GG: 89.9 }
},
{
  id: 'frango-catupiry',
  name: 'Frango com Catupiry',
  description:
  'Frango desfiado temperado com ervas finas, catupiry original cremoso e milho verde.',
  category: 'especiais',
  emoji: '🍗',
  gradient: 'from-yellow-700 via-orange-400 to-amber-300',
  sizes: { P: 34.9, M: 46.9, G: 58.9, GG: 74.9 }
},
{
  id: 'lombo-canadense',
  name: 'Lombo Canadense',
  description:
  'Lombo canadense defumado, abacaxi grelhado, mussarela e um toque de mel com mostarda.',
  category: 'especiais',
  emoji: '🍖',
  gradient: 'from-amber-800 via-orange-600 to-yellow-400',
  sizes: { P: 36.9, M: 48.9, G: 60.9, GG: 76.9 }
},
{
  id: 'parma',
  name: 'Parma com Rúcula',
  description:
  'Presunto de Parma curado, rúcula selvagem, lascas de parmesão e redução de balsâmico.',
  category: 'especiais',
  emoji: '🥓',
  gradient: 'from-rose-800 via-red-500 to-green-400',
  sizes: { P: 42.9, M: 55.9, G: 68.9, GG: 85.9 }
},

// === VEGETARIANAS ===
{
  id: 'rucula-tomate-seco',
  name: 'Rúcula com Tomate Seco',
  description:
  'Rúcula fresca, tomate seco marinado em azeite, mussarela de búfala e nozes.',
  category: 'vegetarianas',
  emoji: '🥬',
  gradient: 'from-green-700 via-green-500 to-lime-400',
  sizes: { P: 33.9, M: 44.9, G: 56.9, GG: 70.9 }
},
{
  id: 'berinjela',
  name: 'Berinjela',
  description:
  'Berinjela grelhada, abobrinha, pimentão assado, cebola roxa e queijo de cabra.',
  category: 'vegetarianas',
  emoji: '🍆',
  gradient: 'from-purple-700 via-violet-500 to-fuchsia-400',
  sizes: { P: 31.9, M: 42.9, G: 54.9, GG: 68.9 }
},
{
  id: 'cogumelos',
  name: 'Cogumelos',
  description:
  'Mix de cogumelos nobres (shimeji, shiitake e champignon), trufado com azeite e tomilho.',
  category: 'vegetarianas',
  emoji: '🍄',
  gradient: 'from-stone-700 via-amber-600 to-yellow-400',
  sizes: { P: 35.9, M: 47.9, G: 59.9, GG: 74.9 }
},
{
  id: 'palmito',
  name: 'Palmito',
  description:
  'Palmito pupunha grelhado, milho, ervilha, mussarela e azeitonas verdes.',
  category: 'vegetarianas',
  emoji: '🌿',
  gradient: 'from-emerald-700 via-teal-500 to-cyan-400',
  sizes: { P: 30.9, M: 41.9, G: 53.9, GG: 67.9 }
},

// === DOCES ===
{
  id: 'chocolate-morango',
  name: 'Chocolate com Morango',
  description:
  'Chocolate meio amargo derretido, morangos frescos fatiados, leite condensado e granulado belga.',
  category: 'doces',
  emoji: '🍫',
  gradient: 'from-amber-900 via-rose-600 to-pink-400',
  sizes: { P: 32.9, M: 43.9, G: 55.9, GG: 69.9 }
},
{
  id: 'banana-canela',
  name: 'Banana com Canela',
  description:
  'Banana nanica caramelizada, canela, açúcar mascavo, leite condensado e sorvete de creme.',
  category: 'doces',
  emoji: '🍌',
  gradient: 'from-yellow-700 via-amber-500 to-orange-300',
  sizes: { P: 28.9, M: 38.9, G: 48.9, GG: 62.9 }
},
{
  id: 'romeu-julieta',
  name: 'Romeu e Julieta',
  description:
  'Goiabada cascão derretida com queijo minas artesanal. O clássico brasileiro em forma de pizza.',
  category: 'doces',
  emoji: '❤️',
  gradient: 'from-red-600 via-pink-400 to-yellow-300',
  sizes: { P: 30.9, M: 40.9, G: 52.9, GG: 66.9 }
},
{
  id: 'prestigio',
  name: 'Prestígio',
  description:
  'Chocolate ao leite cremoso, coco ralado fresco e leite condensado. Inspirada no clássico bombom.',
  category: 'doces',
  emoji: '🥥',
  gradient: 'from-amber-900 via-amber-700 to-sky-300',
  sizes: { P: 31.9, M: 41.9, G: 53.9, GG: 67.9 }
}];


export function getPizzasByCategory(category: string): Pizza[] {
  return pizzas.filter((p) => p.category === category);
}

export function getPizzaById(id: string): Pizza | undefined {
  return pizzas.find((p) => p.id === id);
}