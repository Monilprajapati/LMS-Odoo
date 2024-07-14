import axios from "axios";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_URL;
console.log(SERVER_DOMAIN);

const authUser = async (serverRoute, formData) => {

    try {
        const response = await axios.post(
            `${SERVER_DOMAIN}/api/v1/auth/${serverRoute}`,
            formData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


const verifyUser = async (otp, userId) => {
    console.log("otp", otp);
    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/verify`,
        { otp, userId },
        { withCredentials: true }
    );

    return response.data;
};

const logoutUser = async () => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
    );
    console.log(response.data)

    return response.data;
};

const resendOtp = async (userId, email) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/resend-otp`,
        { userId, email },
        { withCredentials: true }
    );

    return response.data;
};

const forgetPassword = async (email) => {

    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/forget-password`,
        { email },
        { withCredentials: true }
    );

    return response.data;
};

const updatePassword = async (userId, newPassword) => {
    console.log(userId, newPassword)
    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/auth/update-password`,
        { userId, newPassword },
        { withCredentials: true }
    );

    return response.data;
};

const getUserDetails = async () => {
    const response = await axios.get(`${SERVER_DOMAIN}/api/v1/auth/me`,
        { withCredentials: true }
    );
    console.log(response.data)
    return response.data;
};

export {
    authUser,
    verifyUser,
    logoutUser,
    resendOtp,
    forgetPassword,
    updatePassword,
    getUserDetails
};
