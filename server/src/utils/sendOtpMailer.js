import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../config/serverConfig.js";
import { OtpVerification } from "../models/otpVerificationModel.js";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const sendOtpMail = asyncHandler(async ( _id, email ) => {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

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
        to: email,
        subject: "Your OTP Code",
        html: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 1 hour.</p>`
    };

    const otpVerification = await OtpVerification.create({
        userId: _id,
        otp: otp.toString(),
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000 // 1 hour expiration
    });

    if (!otpVerification) {
        throw new ApiError(500, "Something went wrong while saving the OTP.");
    }

    // Send the email
    await transporter.sendMail(mailOptions);

});

export { sendOtpMail };
