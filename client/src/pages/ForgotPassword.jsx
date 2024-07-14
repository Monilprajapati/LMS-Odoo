import React, { useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { forgetPassword } from "../services/authServices";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formData;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email

    if (!email.length) {
      return toast.error("Email is required");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is not valid");
    }

    console.log("Forgot Password");
    let loading = toast.loading("Please wait...");
    forgetPassword(email)
      .then(() => {
        toast.dismiss(loading);
        toast.success("Reset link sent to your email", {
          duration: 900,
        });
        setTimeout(() => {
          navigate("/login");
        }, 900);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <AnimationWrapper keyValue="forgotPassword">
      <Toaster />
      <section className="h-cover flex items-center justify-center px-5 ">
        <form className="max-h-[400px] ">
          <div className="pb-7">
            <h1 className="text-4xl font-lato font-bold capitalize text-center mb-5 xl:mb-10">
              Forgot Password
            </h1>
            <p className="text-sm font-montserrat flex flex-col gap-1">
              <span className="text-center">
                No Problem! Enter your email or username below.
              </span>
              <span className="hidden md:flex">
                We will send you an email with instructions to reset your
                password.
              </span>
            </p>
          </div>
          <div>
            <InputBox
              name="email"
              type="email"
              id="email"
              value=""
              placeholder="Enter your email"
              icon="email"
              handleChange={handleChange}
            />
            <button
              className="btn-dark mt-5 center text-sm lg:text-lg lg:mt-10"
              onClick={handleSubmit}
            >
              Send Reset Link
            </button>
          </div>
          <p className="mt-5  text-dark-grey text-md text-center">
            Back to
            <Link to="/login" className="underline text-black text-md ml-1">
              Login
            </Link>
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default ForgotPassword;
