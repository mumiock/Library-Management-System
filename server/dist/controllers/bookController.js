"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.lendBook = exports.getBookById = exports.getBooks = void 0;
const bookService = __importStar(require("../services/bookService"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.getBooks = (0, asyncHandler_1.default)(async (req, res) => {
    const books = await bookService.getAllBooks();
    res.json(books);
});
exports.getBookById = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const book = await bookService.getBookById(parseInt(id));
    if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
    }
    res.json(book);
});
exports.lendBook = (0, asyncHandler_1.default)(async (req, res) => {
    const { bookId, userId } = req.body;
    const result = await bookService.lendBook(parseInt(bookId), parseInt(userId));
    res.json(result);
});
exports.returnBook = (0, asyncHandler_1.default)(async (req, res) => {
    const { bookId, userId, rating } = req.body;
    const result = await bookService.returnBook(parseInt(bookId), parseInt(userId), rating);
    res.json(result);
});
// Add other book-related controller functions here
