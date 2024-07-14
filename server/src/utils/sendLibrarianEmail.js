import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL } from "../config/serverConfig.js";

const sendLibrarianEmail = asyncHandler(async (user, password) => {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    });


    const mailOptions = {
        from: ADMIN_EMAIL,
        to: user.email,
        subject: "Library Notification",
        html: `<p>Dear ${user.firstName} ${user.lastName},</p>
               <p>Welcome to our library! Your account has been successfully created.</p>
               <p>Your login details are as follows:</p>
               <p>Email: ${user.email}</p>
               <p>Password: ${password}</p>
               <p>Thank you for joining us!</p>
               <p>Best regards,</p>
               <p>The Library Team</p>`
    };

    await transporter.sendMail(mailOptions);

});

export { sendLibrarianEmail };