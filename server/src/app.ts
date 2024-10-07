import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
import prisma from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

// Test route to check database connection
app.get('/test-db', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: 'Database connection successful', users });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error });
  }
});

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use(errorHandler);

export default app;
