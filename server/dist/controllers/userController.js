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
exports.returnBook = exports.borrowBook = exports.getUserById = exports.getUsers = void 0;
const userService = __importStar(require("../services/userService"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.getUsers = (0, asyncHandler_1.default)(async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});
exports.getUserById = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(parseInt(id));
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json(user);
});
exports.borrowBook = (0, asyncHandler_1.default)(async (req, res) => {
    const { userId, bookId } = req.params;
    await userService.borrowBook(parseInt(userId), parseInt(bookId));
    res.status(204).send();
});
exports.returnBook = (0, asyncHandler_1.default)(async (req, res) => {
    const { userId, bookId } = req.params;
    const { score } = req.body;
    await userService.returnBook(parseInt(userId), parseInt(bookId), score);
    res.status(204).send();
});
// Add other user-related controller functions here
