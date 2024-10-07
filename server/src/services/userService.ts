import prisma from '../config/database';

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      borrowings: {
        include: { book: true },
        orderBy: { borrowDate: 'desc' },
      },
    },
  });

  if (!user) return null;
  const pastBooks = user.borrowings
    .filter((b) => b.returnDate !== null)
    .map((b) => ({
      id: b.book.id,
      name: b.book.title,
      userScore: b.rating ?? 0,
    }));

  const presentBooks = user.borrowings
    .filter((b) => b.returnDate === null)
    .map((b) => ({
      id: b.book.id,
      name: b.book.title,
    }));

  return {
    id: user.id,
    name: user.name,
    books: {
      past: pastBooks,
      present: presentBooks,
    },
  };
};

export const borrowBook = async (userId: number, bookId: number) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { borrowings: { where: { returnDate: null } } },
  });

  if (!book) {
    throw new Error('Book not found');
  }

  if (book.borrowings.length > 0) {
    throw new Error('Book is already borrowed');
  }

  const existingBorrowing = await prisma.borrowing.findFirst({
    where: {
      bookId,
      userId,
      returnDate: null,
    },
  });

  if (existingBorrowing) {
    throw new Error('User has already borrowed this book');
  }

  return prisma.borrowing.create({
    data: {
      userId,
      bookId,
      borrowDate: new Date(),
    },
  });
};

export const returnBook = async (userId: number, bookId: number, score: number) => {
  return prisma.borrowing.updateMany({
    where: {
      userId,
      bookId,
      returnDate: null,
    },
    data: {
      returnDate: new Date(),
      rating: score,
    },
  });
};


export const createUser = async (name: string, email: string) => {
  return prisma.user.create({
    data: {
      name,
      email,
    },
  });
};

export const updateUser = async (id: number, name?: string, email?: string) => {
  return prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
    include: {
      borrowings: true,
    },
  });
};

export const getAllCurrentBorrowings = async () => {
  return prisma.borrowing.findMany({
    where: {
      returnDate: null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      book: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      borrowDate: 'desc',
    },
  });
};
