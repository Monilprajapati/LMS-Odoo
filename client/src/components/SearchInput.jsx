import React from "react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  // const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="xl:flex hidden relative font-plusSans h-10 mx-9 lg:w-1/2 rounded-3xl bg-white">
        <input
          type="text"
          className="w-full rounded-3xl font-medium text-black bg-transparent outline-none pl-5"
          placeholder="Search Posts By Tags"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        <IoMdSearch className="relative right-2 md:right-3 lg:right-4 ml-2 top-1 mt-1 text-2xl text-gray-400" />
      </div>
    </>
  );
};

export default SearchInput;