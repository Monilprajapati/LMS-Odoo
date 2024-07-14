const express = require('express');
const router = express.Router();
const { addBook, updateBook, deleteBook, searchBooks } = require('../controllers/bookController');

// Add Book
router.post('/add', addBook);

// Update Book
router.put('/update/:id', updateBook);

// Delete Book
router.delete('/delete/:id', deleteBook);

// Search Books
router.get('/search', searchBooks);


module.exports = router;