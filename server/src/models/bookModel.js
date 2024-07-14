import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

export const Book = mongoose.model('Book', bookSchema);