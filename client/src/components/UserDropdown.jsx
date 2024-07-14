import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";
import { useUserContext } from "../contexts/userContext";
import { CiUser } from "react-icons/ci";
import { logoutUser } from "../services/authServices";

const UserDropdown = ({ mobile }) => {
  const [open, setOpen] = useState(false);
  const { setIsAuth, user } = useUserContext();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const links = [
    {
      id: 1,
      text: "Profile",
      url: `/profile`,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        toast.success("Logged out successfully", {
          duration: 900,
        });
        setTimeout(() => {
          setIsAuth(false); // Update the authentication state
          navigate("/login"); // Immediately navigate to the login page
        }, 900);
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again", {
        duration: 900,
      });
    }
  };

  return (
    <div>
      <Toaster />
      <div className="relative" ref={dropdownRef}>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={` text-black focus:outline-none font-medium rounded-md text-md px-2 py-1.5 flex items-center ${
            mobile ? "w-full border border-black bg-white" : "bg-whitesmoke"
          } justify-between gap-2`}
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="flex gap-1.5 items-center">
            <CiUser className="w-6 h-6 rounded-full" />
            <span className="font-medium">{user?.firstname}</span>
          </span>
          <div>
            {open ? (
              <MdOutlineKeyboardArrowUp className="text-lg" />
            ) : (
              <MdKeyboardArrowDown className="text-lg" />
            )}
          </div>
        </button>
        {/* Dropdown menu */}
        {open && (
          <div
            id="dropdown"
            className={`z-100 absolute mt-2  opacity-0 bg-white text-black divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 ${
              open && `opacity-100`
            }`}
          >
            <ul className="px-2 font-bold">
              {links.map((link) => {
                const { id, text, url } = link;
                return (
                  <>
                    <Link
                      key={id}
                      to={url}
                      onClick={() => setOpen(false)}
                      className="flex px-3 py-2 text-md font-medium border-b border-black border-opacity-40 last:border-none"
                    >
                      {text}
                    </Link>
                  </>
                );
              })}
              <button
                className="md:flex px-3 py-2 text-md font-medium hidden"
                onClick={() => {
                  logoutHandler();
                }}
              >
                Logout
              </button>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
