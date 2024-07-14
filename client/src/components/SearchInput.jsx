import React from "react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useUserContext } from "../contexts/userContext";

const SearchInput = ({query, setQuery}) => {
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const { books, setBooks, loading, setLoading, error, setError } = useUserContext();
  // const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
    for(let i=0; i<100000; i++){
      
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    console.log(query);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${VITE_API_KEY}`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="xl:flex hidden relative font-plusSans h-10 mx-9 lg:w-1/3 mb-10 rounded-3xl bg-mediumGrey">
        <input
          type="text"
          className="w-full rounded-3xl font-medium text-black bg-transparent outline-none pl-5"
          placeholder="Search Posts By Tags"
          value={query}
          onChange={(e) => handleSearch(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchBooks();
            }
          }}
        />
        <IoMdSearch className="relative right-2 md:right-3 lg:right-4 ml-2 top-1 mt-1 text-2xl text-gray-400" />
      </div>
    </>
  );
};

export default SearchInput;
