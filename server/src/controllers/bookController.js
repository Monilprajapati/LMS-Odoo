import Book from '../models/bookModel.js';
import Borrow from '../models/borrowModel.js';

// Add Book
export const addBook = async (req, res) => {
    const { isbn, title, author, publisher, year, genre, quantity } = req.body;
    try {
        const newBook = new Book({ isbn, title, author, publisher, year, genre, quantity });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
};

// Update Book
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        await Book.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
};

// Delete Book
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

// Search Books
export const searchBooks = async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({ $text: { $search: query } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error searching books', error });
    }
};
