import Borrow from '../models/borrowModel.js';
import Book from '../models/bookModel.js';
import { sendCheckoutEmail } from '../utils/sendCheckoutEmail.js';

// Checkout Book
export const checkoutBook = async (req, res) => {
    const { userId, bookId, dueDate } = req.body;
    try {
        const borrow = new Borrow({ userId, bookId, dueDate });
        await borrow.save();
        await Book.findByIdAndUpdate(bookId, { $inc: { quantity: -1 } });

        await sendCheckoutEmail(userId, bookId, dueDate);
        res.status(201).json({ message: 'Book checked out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error checking out book', error });
    }
};

// Return Book
export const returnBook = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        await Borrow.findOneAndDelete({ userId, bookId });
        await Book.findByIdAndUpdate(bookId, { $inc: { quantity: 1 } });
        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error returning book', error });
    }
};