import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL } from "../config/serverConfig.js";
import { ApiError } from "./ApiError.js";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

const sendForgetPasswordMail = asyncHandler(async (email) => {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    });

    const hashedMail = await bcrypt.hash(email, 10);
    const user = await User.findOne({ email });


    const resetUrl = `${FRONTEND_URL}/reset-password/${user._id}`;

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: email,
        subject: "Password Reset Request",
        html: `<p>You have requested to reset your password. Click the link below to reset your password:</p><p><a href="${resetUrl}">Reset Password</a></p>`
    };

    await transporter.sendMail(mailOptions);

});

export { sendForgetPasswordMail };
