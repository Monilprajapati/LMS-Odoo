const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Borrow', borrowSchema);