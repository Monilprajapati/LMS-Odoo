import { Router } from "express";
const router = Router();
import { addBook, updateBook, deleteBook, searchBooks } from '../controllers/bookController.js';

// Add Book
router.post('/add', addBook);

// Update Book
router.put('/update/:id', updateBook);

// Delete Book
router.delete('/delete/:id', deleteBook);

// Search Books
router.get('/search', searchBooks);


export default router;