import React, { useState } from "react";
import InputBox from "../components/InputBox"; // Assuming InputBox component is in the same directory
import { useUserContext } from "../contexts/userContext";

const UserProfile = ({ userData }) => {
  const { user } = useUserContext();
  const { firstname, lastname, email, role } = user;
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [editable, setEditable] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setEditable(!editable);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl xl:text-3xl text-center my-5 font-bold mb-6">User Profile</h2>
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
  );
};

export default UserProfile;
