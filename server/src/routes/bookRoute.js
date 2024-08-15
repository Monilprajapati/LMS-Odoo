import { Router } from "express";
const router = Router();
import { addBook, deleteBook, searchBooks, getBooks } from '../controllers/bookController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Add Book
router.post('/add', addBook);

// // Update Book
// router.put('/update/:id', updateBook);

// Delete Book
router.delete('/delete/:id', deleteBook);

// Search Books
router.get('/search', searchBooks);

router.get('/all', getBooks);


export default router;