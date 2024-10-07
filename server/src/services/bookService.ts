import prisma from '../config/database';

export const getAllBooks = async () => {
  return prisma.book.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: 'asc',
    },
  });
};

export const getBookById = async (id: number) => {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      borrowings: {
        where: {
          returnDate: { not: null },
        },
        select: {
          rating: true,
        },
      },
    },
  });

  if (!book) return null;

  const ratings = book.borrowings.map((b) => b.rating).filter((r): r is number => r !== null);
  const averageScore = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : -1;

  return {
    id: book.id,
    name: book.title,
    score: averageScore === -1 ? -1 : parseFloat(averageScore.toFixed(2)),
  };
};


export const returnBook = async (bookId: number, userId: number, rating?: number) => {
  return prisma.borrowing.updateMany({
    where: {
      bookId,
      userId,
      returnDate: null,
    },
    data: {
      returnDate: new Date(),
      rating,
    },
  });
};

export const createBook = async (title: string, author: string, year?: number) => {
  return prisma.book.create({
    data: {
      title,
      author,
      year,
    },
  });
};

export const updateBook = async (id: number, title?: string, author?: string, year?: number) => {
  return prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      year,
    },
  });
};

export const deleteBook = async (id: number) => {
  return prisma.book.delete({
    where: { id },
    include: {
      borrowings: true,
    },
  });
};

export const getBookDetails = async (id: number) => {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      borrowings: {
        where: {
          returnDate: { not: null },
        },
        select: {
          rating: true,
        },
      },
    },
  });

  if (!book) return null;

  const ratings = book.borrowings.map((b) => b.rating).filter((r): r is number => r !== null);
  const averageScore = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : -1;

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    score: averageScore === -1 ? -1 : parseFloat(averageScore.toFixed(2)),
  };
};
