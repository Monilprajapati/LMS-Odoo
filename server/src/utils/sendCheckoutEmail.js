import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL } from "../config/serverConfig.js";
import { User } from "../models/userModel.js";
import { Book } from "../models/bookModel.js";

const sendCheckoutEmail = asyncHandler(async (userId, bookId, dueDate) => {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    });

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: user.email,
        subject: "Library Notification",
        html: `<p>You have successfully checked out a book ${book.title} by ${book.author}.</p><p>Please return the book within ${dueDate} to avoid late fees.</p><p>Thank you for using our library.</p>`
    };

    await transporter.sendMail(mailOptions);

});

export { sendCheckoutEmail };