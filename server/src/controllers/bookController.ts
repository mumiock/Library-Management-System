import { Request, Response } from 'express';
import * as bookService from '../services/bookService';
import asyncHandler from '../utils/asyncHandler';

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json(books);
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await bookService.getBookById(parseInt(id));
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  res.json(book);
});

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  const book = await bookService.createBook(title, author, year);
  res.status(201).json(book);
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  const book = await bookService.updateBook(parseInt(id), title, author, year);
  res.json(book);
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await bookService.deleteBook(parseInt(id));
  res.status(204).send();
});

export const getBookDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await bookService.getBookDetails(parseInt(id));
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
  res.json(book);
});


