"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.lendBook = exports.getBookById = exports.getAllBooks = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllBooks = async () => {
    return database_1.default.book.findMany({
        select: {
            id: true,
            title: true,
        },
        orderBy: {
            title: 'asc',
        },
    });
};
exports.getAllBooks = getAllBooks;
const getBookById = async (id) => {
    const book = await database_1.default.book.findUnique({
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
    if (!book)
        return null;
    const ratings = book.borrowings.map((b) => b.rating).filter((r) => r !== null);
    const averageScore = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : -1;
    return {
        id: book.id,
        name: book.title,
        score: averageScore === -1 ? -1 : averageScore.toFixed(2),
    };
};
exports.getBookById = getBookById;
const lendBook = async (bookId, userId) => {
    return database_1.default.borrowing.create({
        data: {
            bookId,
            userId,
            borrowDate: new Date(),
        },
    });
};
exports.lendBook = lendBook;
const returnBook = async (bookId, userId, rating) => {
    return database_1.default.borrowing.updateMany({
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
exports.returnBook = returnBook;
// Add other book-related service functions here
