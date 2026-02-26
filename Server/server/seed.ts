import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const pizzas = [
  { id: 'margherita', name: 'Margherita', description: 'A clássica italiana com molho de tomate San Marzano, mussarela de búfala fresca, manjericão fresco e um fio de azeite extra virgem.', category: 'classicas', price_small: 29.9, price_medium: 39.9, price_large: 49.9, image_url: '🍕' },
  { id: 'calabresa', name: 'Calabresa', description: 'Generosas fatias de calabresa defumada artesanal, cebola roxa caramelizada, azeitonas pretas e orégano fresco.', category: 'classicas', price_small: 28.9, price_medium: 38.9, price_large: 48.9, image_url: '🌶️' },
  { id: 'portuguesa', name: 'Portuguesa', description: 'Presunto, ovos, cebola, azeitonas verdes, ervilha, mussarela e orégano. A favorita dos brasileiros.', category: 'classicas', price_small: 30.9, price_medium: 40.9, price_large: 52.9, image_url: '🥚' },
  { id: 'quatro-queijos', name: 'Quatro Queijos', description: 'Harmonização perfeita de mussarela, provolone, gorgonzola e parmesão ralado na hora.', category: 'classicas', price_small: 32.9, price_medium: 42.9, price_large: 54.9, image_url: '🧀' },
  { id: 'pepperoni', name: 'Pepperoni', description: 'Pepperoni importado fatiado fino, mussarela derretida e molho de tomate especial da casa.', category: 'classicas', price_small: 31.9, price_medium: 41.9, price_large: 53.9, image_url: '🔴' },
  
  { id: 'file-mignon', name: 'Filé Mignon com Cheddar', description: 'Cubos de filé mignon grelhados, creme de cheddar inglês, cebola crispy e rúcula fresca.', category: 'especiais', price_small: 39.9, price_medium: 52.9, price_large: 65.9, image_url: '🥩' },
  { id: 'camarao', name: 'Camarão', description: 'Camarões rosa salteados no alho e azeite, cream cheese, tomate cereja e cebolinha.', category: 'especiais', price_small: 44.9, price_medium: 58.9, price_large: 72.9, image_url: '🦐' },
  { id: 'frango-catupiry', name: 'Frango com Catupiry', description: 'Frango desfiado temperado com ervas finas, catupiry original cremoso e milho verde.', category: 'especiais', price_small: 34.9, price_medium: 46.9, price_large: 58.9, image_url: '🍗' },
  { id: 'lombo-canadense', name: 'Lombo Canadense', description: 'Lombo canadense defumado, abacaxi grelhado, mussarela e um toque de mel com mostarda.', category: 'especiais', price_small: 36.9, price_medium: 48.9, price_large: 60.9, image_url: '🍖' },
  { id: 'parma', name: 'Parma com Rúcula', description: 'Presunto de Parma curado, rúcula selvagem, lascas de parmesão e redução de balsâmico.', category: 'especiais', price_small: 42.9, price_medium: 55.9, price_large: 68.9, image_url: '🥓' },

  { id: 'rucula-tomate-seco', name: 'Rúcula com Tomate Seco', description: 'Rúcula fresca, tomate seco marinado em azeite, mussarela de búfala e nozes.', category: 'vegetarianas', price_small: 33.9, price_medium: 44.9, price_large: 56.9, image_url: '🥬' },
  { id: 'berinjela', name: 'Berinjela', description: 'Berinjela grelhada, abobrinha, pimentão assado, cebola roxa e queijo de cabra.', category: 'vegetarianas', price_small: 31.9, price_medium: 42.9, price_large: 54.9, image_url: '🍆' },
  { id: 'cogumelos', name: 'Cogumelos', description: 'Mix de cogumelos nobres (shimeji, shiitake e champignon), trufado com azeite e tomilho.', category: 'vegetarianas', price_small: 35.9, price_medium: 47.9, price_large: 59.9, image_url: '🍄' },
  { id: 'palmito', name: 'Palmito', description: 'Palmito pupunha grelhado, milho, ervilha, mussarela e azeitonas verdes.', category: 'vegetarianas', price_small: 30.9, price_medium: 41.9, price_large: 53.9, image_url: '🌿' },

  { id: 'chocolate-morango', name: 'Chocolate com Morango', description: 'Chocolate meio amargo derretido, morangos frescos fatiados, leite condensado e granulado belga.', category: 'doces', price_small: 32.9, price_medium: 43.9, price_large: 55.9, image_url: '🍫' },
  { id: 'banana-canela', name: 'Banana com Canela', description: 'Banana nanica caramelizada, canela, açúcar mascavo, leite condensado e sorvete de creme.', category: 'doces', price_small: 28.9, price_medium: 38.9, price_large: 48.9, image_url: '🍌' },
  { id: 'romeu-julieta', name: 'Romeu e Julieta', description: 'Goiabada cascão derretida com queijo minas artesanal. O clássico brasileiro em forma de pizza.', category: 'doces', price_small: 30.9, price_medium: 40.9, price_large: 52.9, image_url: '❤️' },
  { id: 'prestigio', name: 'Prestígio', description: 'Chocolate ao leite cremoso, coco ralado fresco e leite condensado. Inspirada no clássico bombom.', category: 'doces', price_small: 31.9, price_medium: 41.9, price_large: 53.9, image_url: '🥥' }
];

async function main() {
  console.log('⏳ Injetando pizzas no banco de dados...');
  
  for (const pizza of pizzas) {
    await prisma.pizza.upsert({
      where: { id: pizza.id },
      update: {},
      create: pizza,
    });
  }
  
  console.log('✅ Todas as pizzas foram salvas com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });