import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/:userId/borrow/:bookId', userController.borrowBook);
router.post('/:userId/return/:bookId', userController.returnBook);

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/borrowings/current', userController.getAllCurrentBorrowings);

export default router;
