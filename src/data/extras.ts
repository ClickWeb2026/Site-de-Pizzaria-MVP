import { Extra } from './types';

export const bordas: Extra[] = [
{
  id: 'borda-catupiry',
  name: 'Borda de Catupiry',
  price: 8.0,
  type: 'borda'
},
{ id: 'borda-cheddar', name: 'Borda de Cheddar', price: 8.0, type: 'borda' },
{
  id: 'borda-chocolate',
  name: 'Borda de Chocolate',
  price: 9.0,
  type: 'borda'
},
{
  id: 'borda-cream-cheese',
  name: 'Borda de Cream Cheese',
  price: 10.0,
  type: 'borda'
}];


export const ingredientesExtras: Extra[] = [
{
  id: 'extra-bacon',
  name: 'Bacon Crocante',
  price: 6.0,
  type: 'ingrediente'
},
{
  id: 'extra-cebola-crispy',
  name: 'Cebola Crispy',
  price: 4.0,
  type: 'ingrediente'
},
{
  id: 'extra-rucula',
  name: 'Rúcula Fresca',
  price: 3.5,
  type: 'ingrediente'
},
{
  id: 'extra-tomate-seco',
  name: 'Tomate Seco',
  price: 5.0,
  type: 'ingrediente'
},
{
  id: 'extra-azeitona',
  name: 'Azeitonas Pretas',
  price: 3.0,
  type: 'ingrediente'
},
{
  id: 'extra-champignon',
  name: 'Champignon',
  price: 5.5,
  type: 'ingrediente'
},
{
  id: 'extra-mussarela',
  name: 'Mussarela Extra',
  price: 5.0,
  type: 'ingrediente'
},
{
  id: 'extra-parmesao',
  name: 'Parmesão Ralado',
  price: 6.0,
  type: 'ingrediente'
}];


export const allExtras: Extra[] = [...bordas, ...ingredientesExtras];