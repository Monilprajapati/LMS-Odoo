import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import { sendOtpMail } from "../utils/sendOtpMailer.js"
import { sendForgetPasswordMail } from "../utils/sendForgetPasswordMailer.js"
import { OtpVerification } from "../models/otpVerificationModel.js";

export const handleRegister = asyncHandler(async (req, res) => {
    const { firstname, lastname, role, email, password } = req.body;

    if ([firstname, lastname, email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        throw new ApiError(409, "User with email already exists");
    }

    const user = await User.create({
        firstname,
        lastname,
        role,
        email,
        password,
        verified: false
    });

    const isUserCreated = await User.findById(user._id).select('-lastname -password');
    if (!isUserCreated) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    try {
        await sendOtpMail(user._id, user.email);
    } catch (error) {
        throw new ApiError(500, "Failed to send OTP email");
    }

    return res.status(200).json(
        new ApiResponse(200, { user: isUserCreated }, "User registered successfully")
    )
});

export const handleVerify = asyncHandler(
    async (req, res) => {
        const { otp, userId } = req.body;

        if (!otp || !userId)
            throw new ApiError(400, "Empty OTP details are not allowed!");

        const otpVerificationRecord = await OtpVerification.findOne({ userId })
        if (!otpVerificationRecord)
            throw new ApiError(400, "Otp has expired or has been verified already. Please resend otp or log in!");

        if (otp === otpVerificationRecord.otp) {
            await OtpVerification.deleteOne({ userId });

            const user = await User.findById({ _id: userId });
            if (!user)
                throw new ApiError(400, "User not found");

            await User.updateOne({ _id: userId }, { verified: true });

            const token = user.generateToken();

            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                // sameSite: "none"
            }

            return res
                .status(200)
                .cookie("token", token, options)
                .json(new ApiResponse(200, { user, token }, "User verified"));
        }
        throw new ApiError(400, "Invalid otp passed!");
    }
);

export const handleLogin = asyncHandler(
    async (req, res, next) => {

        const { email, password } = req.body;

        if ([email, password].some(field => field?.trim() === ""))
            throw new ApiError(400, 'Please provide all required fields');

        const user = await User.findOne({ email });
        if (!user)
            throw new ApiError(404, "User with email does not exist");

        if (!user.verified)
        {
            try {
                await sendOtpMail(user._id, user.email);
            } catch (error) {
                throw new ApiError(500, "Failed to send OTP email");
            }

            throw new ApiError(401, "User is not verified", { id: user._id, email: user.email });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect)
            throw new ApiError(401, "Password is incorrect");

        const token = await user.generateToken();

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // sameSite: "none"
        };

        res
            .status(200)
            .cookie("token", token, options)
            .json(new ApiResponse(200, { user, token }, "User logged in successfully"));
    }
);

export const handleLogout = asyncHandler(
    async (req, res) => {
        const option = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // path: "/",
            // sameSite: "none"
        };

        res
            .clearCookie("token", option)
            .status(200)
            .json(new ApiResponse(200, {}, "User logged out successfully"));
    }
);

export const handleResendOtp = asyncHandler(
    async (req, res) => {
        const { userId, email } = req.body;

        if (!email || !userId)
            throw new ApiError(400, "Empty details are not allowed!");

        const user = await User.findById({ _id: userId });
        if (!user)
            throw new ApiError(400, "User not found, register first");

        const isOtpVerificationRecord = await OtpVerification.findOne({ userId });
        if (isOtpVerificationRecord)
            await OtpVerification.deleteOne({ userId });

        try {
            await sendOtpMail(userId, email);
        } catch (error) {
            throw new ApiError(500, "Failed to send OTP email");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, { userId }, "Otp send successfully"));
    }
);

export const handleForgetPassword = asyncHandler(
    async (req, res) => {
        const { email } = req.body;

        if (!email)
            throw new ApiError(400, "Empty details are not allowed!");

        const user = await User.findOne({ email });
        if (!user)
            throw new ApiError(400, "User not found!!");

        await sendForgetPasswordMail(email);
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Password reset email sent successfully"));
    }
);

export const handleUpdatePassword = asyncHandler(
    async (req, res) => {
        const { userId, newPassword } = req.body;

        if (!userId || !newPassword)
            throw new ApiError(400, "Empty details are not allowed!");

        const user = await User.findOne({ _id: userId });
        if (!user)
            throw new ApiError(400, "User not found!!");

        user.password = newPassword;
        await user.save();

        return res
            .status(200)
            .json(new ApiResponse(200, { userId }, "Password reset successfully"));
    }
);

export const getUserDetails = asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.user.id).select("-password");
        return res.status(200).json(new ApiResponse(200, { user }, "User fetched successfully"));
    }
);