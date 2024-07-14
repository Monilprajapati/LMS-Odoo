import { User } from '../models/userModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendLibrarianEmail } from '../utils/sendLibrarianEmail.js';
// import bcrypt from 'bcrypt'; // Import bcrypt

// Function to generate a password
const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    while (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
        password = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    return password;
};

// Controller for adding librarian
export const addLibrarian = asyncHandler(async (req, res) => {
    const { firstname, lastname, email } = req.body;

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        throw new ApiError(400, 'User already exists');
    }

    const password = generatePassword();
    // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = await User.create({
        firstname,
        lastname,
        email,
        password,
        role: 'librarian',
        verified: true
    });

    if (newUser) {
        sendLibrarianEmail(newUser, password); // Send the unhashed password via email
    }

    res.status(201).json(new ApiResponse(newUser, 'Librarian added successfully'));
});