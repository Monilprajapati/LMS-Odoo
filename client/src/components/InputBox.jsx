import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";


const InputBox = ({
  disable,
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const renderIcon = () => {
    switch (icon) {
      case "firstname":
        return <FaUserLarge className="text-gray-400" />;
      case "lastname":
        return <LuUser2 className="text-gray-400 text-xl" />;
      case "email":
        return <MdOutlineMailOutline className="text-gray-400" />;
      case "password":
        return <RiLockPasswordFill className="text-gray-400" />;
      case "age":
        return <span className="text-gray-400">🎂</span>;
      case "gender":
        return <span className="text-gray-400">♂️♀️</span>;
      case "weight":
        return <span className="text-gray-400">⚖️</span>;
      case "height":
        return <span className="text-gray-400">📏</span>;
      case "goals":
        return <span className="text-gray-400">🎯</span>;
      case "health":
        return <span className="text-gray-400">🩺</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative w-full mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 ml-1 flex items-center pointer-events-none">
          {renderIcon()}
        </div>
        <input
          disabled={disable}
          id={id}
          name={name}
          type={
            type == "password"
              ? id == "password"
                ? showPassword
                  ? "text"
                  : "password"
                : confirmPassword
                  ? "text"
                  : "password"
              : type
          }
          defaultValue={value}
          placeholder={placeholder}
          className="input-box"
          onChange={handleChange}
        />
        {type == "password" ? (
          <div
            className="text-gray-400 input-icon left-[auto] right-3 p-3 cursor-pointer h-full flex items-center justify-center"
            onClick={
              id == "password"
                ? () => setShowPassword(!showPassword)
                : () => setConfirmPassword(!confirmPassword)
            }
          >
            {id == "password" ? (
              showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            ) : confirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default InputBox;