import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Permite que o nosso site (Frontend) consiga conversar com este servidor
app.use(cors());
app.use(express.json());

// Rota para buscar as pizzas no banco de dados
app.get('/api/pizzas', async (req, res) => {
  try {
    const pizzas = await prisma.pizza.findMany();
    res.json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as pizzas do banco de dados' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});