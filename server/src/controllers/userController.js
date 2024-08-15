import { Book } from '../models/bookModel.js';
import { UserBook } from '../models/userBookModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Controller for adding librarian
export const addMyBook = asyncHandler(async (req, res) => {
    const { bookId } = req.body;

    // Find the book in the Book collection
    const book = await Book.findById(bookId);
    if (!book) {
        throw new ApiError(404, 'Book not found');
    }

    // Create a new UserBook document
    const userBook = new UserBook({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        genre: book.genre,
        image: book.image,
        desc: book.desc
    });

    // Save the UserBook document
    await userBook.save();

    // Delete the book from the Book collection
    await Book.findByIdAndDelete(bookId);

    res.status(201).json(new ApiResponse(201, 'Book moved to user collection successfully'));
});

export const getMyBooks = asyncHandler(async (req, res) => {
    const userBooks = await UserBook.find({});
    res.status(200).json(new ApiResponse(200, userBooks, 'Books fetched successfully'));
});