import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { useUserContext } from "../contexts/userContext";

const UserProfile = () => {
  const user = {
    firstname: "patel",
    lastname: "yash",
    email: "",
    role: "",
    address: "",
  };
  const { firstname, lastname, email, address } = user;
  const [formData, setFormData] = useState({
    firstname,
    lastname,
    address: address || "",
    email: email || "",
  });
  const [editable, setEditable] = useState(false);
  const {  librayBooks,
    setLibraryBooks,} = useUserContext()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setEditable(!editable);
  };

  const rentedBooks = [
    {
      title: "Book Title 1",
      author: "Author 1",
      image: "link-to-book1-image",
    },
    {
      title: "Book Title 2",
      author: "Author 2",
      image: "link-to-book2-image",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 p-6">
      <div className="w-full lg:w-1/2 p-6">
        <h2 className="text-3xl font-bold mb-6">Books Rented</h2>
        <div className="space-y-6">
          {rentedBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg flex cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-28 mr-6 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold">{book.title}</h3>
                {book.author && (
                  <p className="text-gray-700">By: {book.author}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 p-6">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl xl:text-3xl text-center my-5 font-bold mb-6">
            User Profile
          </h2>
          <div className="flex flex-col">
            <div className="flex w-full gap-2">
              <InputBox
                disable={!editable}
                name="firstname"
                type="text"
                id="firstname"
                value={firstname}
                placeholder="First Name"
                icon="firstname"
                handleChange={handleChange}
              />
              <InputBox
                disable={!editable}
                name="lastname"
                type="text"
                id="lastname"
                value={lastname}
                placeholder="Last Name"
                icon="lastname"
                handleChange={handleChange}
              />
            </div>
            <InputBox
              disable={!editable}
              name="email"
              type="email"
              id="email"
              value={email}
              placeholder="Email Address"
              icon="email"
              handleChange={handleChange}
            />
          </div>
          <button className="btn-dark mt-4 center" onClick={handleSubmit}>
            {editable ? "Save" : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
