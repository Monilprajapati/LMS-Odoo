import { Schema, model } from "mongoose";

const otpVerificationSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => Date.now() + 3600000
    }
}, {
    timestamps: true
});

// Create an index on expiresAt to automatically remove expired documents
otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpVerification = model("OtpVerification", otpVerificationSchema);
