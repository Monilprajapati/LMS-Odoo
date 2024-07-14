const mongoose = require('mongoose');
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
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

module.exports = mongoose.model('Book', bookSchema);