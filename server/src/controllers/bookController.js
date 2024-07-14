import { Book } from '../models/bookModel.js';
import { Borrow } from '../models/borrowModel.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Add Book
export const addBook = asyncHandler(async (req, res) => {
    const { isbn, title, author, publisher, publishedDate, genre, image, desc } = req.body;
    try {
        const isBookExists = await Book.findOne({ isbn });
        if (isBookExists) {
            throw new ApiError(400, 'Book already exists');
        }
        const newBook = new Book({ isbn, title, author, publisher, publishedDate, genre, image, desc });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
});

// // Update Book
// export const updateBook = async (req, res) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     try {
//         await Book.findByIdAndUpdate(id, updatedData);
//         res.status(200).json({ message: 'Book updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating book', error });
//     }
// };

// Delete Book
export const deleteBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

// Search Books
export const searchBooks = asyncHandler(async (req, res) => {
    const { query } = req.query;
    try {
        const books = await Book.find({ $text: { $search: query } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error searching books', error });
    }
});

export const getBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.status(200).json(new ApiResponse(books));
});
