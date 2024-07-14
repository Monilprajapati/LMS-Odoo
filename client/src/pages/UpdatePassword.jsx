import React, { useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster, toast } from "react-hot-toast";
import InputBox from "../components/InputBox";
import { useNavigate, useParams } from "react-router-dom";
import { updatePassword } from "../services/authServices";
import { useUserContext } from "../contexts/userContext";

const UpdatePassword = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { userId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;
    console.log(password, confirmPassword);
    if (!password.length) {
      return toast.error("Password is required");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter"
      );
    }
    if (!confirmPassword.length) {
      return toast.error("Confirm Password is required");
    }
    if (confirmPassword !== password) {
      return toast.error("Password and Confirm Password must be the same");
    }

    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password must be the same");
    }

    updatePassword(userId, password)
      .then(() => {
        console.log("Update Password");
        toast.success("Password updated successfully", {
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <AnimationWrapper keyValue="updatePassword">
      <section className="h-cover flex items-center justify-center px-5 md:px-0">
        <Toaster />
        <form className="max-h-[400px] pt-11" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold font-lato capitalize text-center mb-10">
            Reset Password
          </h1>
          <p className="mb-5 px-3">Reset your password and make it easy!</p>
          <div>
            <InputBox
              name="password"
              type="password"
              id="password"
              value=""
              placeholder="Password"
              icon="password"
              handleChange={handleChange}
            />
            <InputBox
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              value=""
              placeholder="Confirm Password"
              icon="password"
              handleChange={handleChange}
            />
          </div>
          <button
            className="btn-dark text-lg mt-10 center"
            onClick={handleSubmit}
          >
            Change Password
          </button>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UpdatePassword;
