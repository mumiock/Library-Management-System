import app from './app';
import prisma from './config/database';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
    console.log('Trying to connect to the database');
    await prisma.$connect();
    console.log('Successfully connected to the database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
