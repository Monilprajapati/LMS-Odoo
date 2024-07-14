const express = require('express');
const router = express.Router();
const { checkoutBook, returnBook } = require('../controllers/borrowController');

// Checkout Book
router.post('/checkout', checkoutBook);

// Return Book
router.post('/return', returnBook);

module.exports = router;