import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import { verifyUser, resendOtp } from "../services/authServices";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const { userId, setIsAuth, user } = useUserContext();
  const navigate = useNavigate();

  const inputRefs = useRef([]);
  console.log("User ID : ", userId);
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric digits

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Move to the next input box automatically if a digit is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otpDigits[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();

    const otp = otpDigits.join("");
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    // Call a function to handle OTP verification
    handleOTPVerification(otp);
  };

  const handleOTPVerification = async (otp) => {
    console.log(otp);
    try {
      const data = await verifyUser(otp, userId);
      toast.success(data.message, {
        duration: 900,
      });
      setTimeout(() => {
        navigate("/");
        setIsAuth(true);
      }, 900);
    } catch (error) {
      console.log("Error : ", error);
      if (error.response.data.message === "User is not verified") {
        toast.error(error.response.data.message);
        setTimeout(() => {
          navigate("/verify");
        }, 900);
      } else {
        toast.error(error.response.data.message, {
          duration: 900,
        });
      }
    }
  };

  const resendOTP = async () => {
    let loading = toast.loading("Please wait...");
    try {
      const data = await resendOtp(userId, user.email);
      toast.dismiss(loading);
      toast.success(data.message, {
        duration: 900,
      });
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.response.data.message, {
        duration: 900,
      });
    }
  };
  return (
    <section className="h-cover flex items-center justify-center flex-col">
      <Toaster />
      <h1 className="text-3xl lg:text-4xl lg:mb-8 font-bold mb-6 text-center font-lato">
        Enter OTP
      </h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="flex justify-center mb-4 space-x-2">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="text-3xl w-12 h-12 lg:w-16 lg:h-16 bg-white border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      </form>
      <button
        className="btn-dark center mt-3 mb-2 lg:mt-9"
        onClick={handleSubmit}
      >
        Verify OTP
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="flex mt-2">
          Want to use different email?
          <Link to="/register" className="underline text-black text-md ml-1">
            Register
          </Link>
        </div>
        <div className="flex mt-2">
          <button 
          onClick={resendOTP}
          className="underline text-black text-md ml-1">
            <span className="mr-1">|</span> Resend OTP
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
