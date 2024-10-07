import { Request, Response } from 'express';
import * as userService from '../services/userService';
import asyncHandler from '../utils/asyncHandler';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }
  const user = await userService.getUserById(id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
});

export const borrowBook = asyncHandler(async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  try {
    const result = await userService.borrowBook(parseInt(userId), parseInt(bookId));
    res.status(200).json({ message: 'Book borrowed successfully', borrowing: result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
});

export const returnBook = asyncHandler(async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  const { score } = req.body;
  await userService.returnBook(parseInt(userId), parseInt(bookId), score);
  res.status(200).json({ message: 'Book returned successfully' });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await userService.createUser(name, email);
  res.status(201).json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await userService.updateUser(parseInt(id), name, email);
  res.json(user);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(parseInt(id));
  res.status(204).send();
});

export const getAllCurrentBorrowings = asyncHandler(async (req: Request, res: Response) => {
  try {
    const currentBorrowings = await userService.getAllCurrentBorrowings();
    const formattedBorrowings = currentBorrowings.map(borrowing => ({
      userId: borrowing.user.id,
      userName: borrowing.user.name,
      bookId: borrowing.book.id,
      bookTitle: borrowing.book.title,
      borrowDate: borrowing.borrowDate,
    }));
    res.json(formattedBorrowings);
  } catch (error) {
    console.error('Error fetching current borrowings:', error);
    res.status(500).json({ message: 'An error occurred while fetching current borrowings' });
  }
});

