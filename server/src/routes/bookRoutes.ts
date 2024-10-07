import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id/details', bookController.getBookDetails);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
