import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authUser } from "../services/authServices";
import Dropdown from "../components/InputDropdown";
import { useUserContext } from "../contexts/userContext";
import { validateFormData } from "../utils/validateFormData";

const UserAuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "user",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUserId, setIsAuth, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userAuth = async (serverRoute, formData) => {
    if (serverRoute === "login") {
      try {
        const data = await authUser(serverRoute, formData);
        const response = data;
        setUser(response.data.user);
        toast.success(response.message, {
          duration: 1000,
        });
        setTimeout(() => {
          setIsAuth(true);
          navigate("/");
        }, 1000);
      } catch (error) {
        if (error.response.data.message == "User is not verified") {
          setUserId(error.response.data.data.id);
          setUser(error.response.data.data)
          toast.error(error.response.data.message, {
            duration: 1000,
          });
          setTimeout(() => {
            navigate("/verifyOtp");
          }, 1000);
        } else {
          toast.error(error.response.data.message, {
            duration: 1000,
          });
        }
      }
    } else {
      let loading = toast.loading("Please wait...");
      try {
        const response = await authUser(serverRoute, formData);
        setUserId(response.data.user._id);
        toast.dismiss(loading);
        setUser(response.data.user);
        toast.success(`Verification code sent to your email ${formData.email}`,{
          duration: 900,
        });
        setTimeout(() => {
          navigate("/verifyOtp");
        }, 900);
      } catch (error) {
        toast.dismiss(loading);
        let { data } = error.response;
        let message = data.message;
        toast.error(message, {
          duration: 900,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "login" ? "login" : "register";

    const validationError = validateFormData(formData, type);

    if (validationError) {
      return toast.error(validationError);
    } else {
      userAuth(serverRoute, formData);
    }
  };

  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center px-5 md:px-0">
        <Toaster />
        <form className="max-h-[400px]" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-lato capitalize text-center mb-20">
            {type === "login" ? "Welcome back" : "Create an account"}
          </h1>
          {/* <div className="mb-4">{type === "register" ? <RoleDropdown /> : null}</div> */}
          {type === "register" ? (
            <>
              <div className="flex gap-3">
                <InputBox
                  name="firstname"
                  type="text"
                  id="firstname"
                  value={formData.firstname}
                  placeholder="Firstname"
                  icon="firstname"
                  handleChange={handleChange}
                />
                <InputBox
                  name="lastname"
                  type="text"
                  id="lastname"
                  value={formData.lastname}
                  placeholder="Lastname"
                  icon="lastname"
                  handleChange={handleChange}
                />
              </div>
              <Dropdown
                id="role"
                name="role"
                value={formData.role}
                options={roleOptions}
                handleChange={handleChange}
              />
            </>
          ) : null}
          <InputBox
            name="email"
            type="email"
            id="email"
            value={formData.email}
            placeholder="Email"
            icon="email"
            handleChange={handleChange}
          />
          <InputBox
            name="password"
            type="password"
            id="password"
            value={formData.password}
            placeholder="Password"
            icon="password"
            handleChange={handleChange}
          />
          {type === "register" ? (
            <InputBox
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              icon="password"
              handleChange={handleChange}
            />
          ) : null}
          <button className="btn-dark mt-11 center" onClick={handleSubmit}>
            {type}
          </button>

          <p className="mt-10 text-dark-grey text-xl text-center">
            {type === "login" ? (
              <div className="flex gap-2 flex-col">
                <span>
                  Don't have an account?
                  <Link
                    to="/register"
                    className="underline text-black text-md ml-1"
                  >
                    Register
                  </Link>
                </span>
                <span>
                  Don't remember your password?
                  <Link
                    to="/forgot-password"
                    className="underline text-black text-md ml-1"
                  >
                    Forgot Password
                  </Link>
                </span>
              </div>
            ) : (
              <>
                Already have an account?
                <Link to="/login" className="underline text-black ml-1">
                  Login
                </Link>
              </>
            )}
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
