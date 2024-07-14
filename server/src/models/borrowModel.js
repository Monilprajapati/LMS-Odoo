import mongoose from 'mongoose';
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

export const Borrow = mongoose.model('Borrow', borrowSchema);