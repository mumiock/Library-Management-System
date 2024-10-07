"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.getUserById = exports.getAllUsers = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllUsers = async () => {
    return database_1.default.user.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const user = await database_1.default.user.findUnique({
        where: { id },
        include: {
            borrowings: {
                include: { book: true },
                orderBy: { borrowDate: 'desc' },
            },
        },
    });
    if (!user)
        return null;
    const pastBooks = user.borrowings
        .filter((b) => b.returnDate !== null)
        .map((b) => ({
        name: b.book.title,
        userScore: b.rating,
    }));
    const presentBooks = user.borrowings
        .filter((b) => b.returnDate === null)
        .map((b) => ({
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
exports.getUserById = getUserById;
const borrowBook = async (userId, bookId) => {
    return database_1.default.borrowing.create({
        data: {
            userId,
            bookId,
            borrowDate: new Date(),
        },
    });
};
exports.borrowBook = borrowBook;
const returnBook = async (userId, bookId, score) => {
    return database_1.default.borrowing.updateMany({
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
exports.returnBook = returnBook;
// Add other user-related service functions here
