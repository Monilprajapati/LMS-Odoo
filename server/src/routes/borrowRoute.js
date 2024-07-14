import { Router } from "express";
const router = Router();
import { checkoutBook, returnBook } from '../controllers/borrowController.js';

// Checkout Book
router.post('/checkout', checkoutBook);

// Return Book
router.post('/return', returnBook);

export default router;