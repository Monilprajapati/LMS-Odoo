// src/components/BookSearch.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import AnimationWrapper from "../common/AnimationWrapper";
import SearchInput from "../components/SearchInput";
import { useUserContext } from "../contexts/userContext";
import { DNA } from "react-loader-spinner";

// Function to truncate description
const truncateDesc = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const HomePage = () => {
  const [query, setQuery] = useState("python");
  const [trendingQuery, setTrendingQuery] = useState("odoo");
  const { books, setBooks, loading, setLoading, error, setError } =
    useUserContext();
  const [trendingBooks, setTrendingBooks] = useState([]);
  const navigate = useNavigate();
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  // Fetch books based on search query
  const fetchBooks = async () => {
    setLoading(true);
    setError("");
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

  // Fetch trending books based on a specific query
  const fetchTrendingBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${trendingQuery}&key=${VITE_API_KEY}`
      );
      setTrendingBooks(response.data.items || []);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    fetchBooks(query);
  };

  // Handle book click
  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  // Fetch trending books on component mount
  useEffect(() => {
    fetchBooks();
    fetchTrendingBooks();
  }, [query]);
  console.log(books);
  return (
    <AnimationWrapper keyValue="books">
      {/* <div className="h-cover flex items-center justify-center px-5 md:px-0">
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 shadow-md text-center">
      <h1 className="text-3xl font-bold">
        Search the Books Available in Library
      </h1>
    </header> */}
      {/* <main className="h-full flex items-center justify-center px-5 md:px-0">
      <div className="mb-4 flex space-x-2 w-full max-w-xl">
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
     
    </main> */}
      {/* </div> */}
      <div className="h-cover w-full px-10 flex flex-col pt-9 pb-20 items-center justify-center">
        <SearchInput query={query} setQuery={setQuery} />
        <div className="flex flex-row h-full w-full">
          <div className="flex flex-col w-1/2">
            <h2 className="text-2xl flex flex-col font-bold mb-2">
              New Arrivals
            </h2>
            {loading ? (
              <div className="flex flex-col w-full items-center">
                <DNA
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {books.map((book, index) => (
                  <BookCard
                    key={index}
                    book={book}
                    handleBookClick={handleBookClick}
                    truncateDesc={truncateDesc}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="w-1/2 flex flex-col space-y-4 lg:space-y-0 lg:space-x-4">
            <h2 className="text-2xl font-bold mb-2">Trending</h2>
            {loading ? (
              <div className="flex flex-col w-full items-center">
                <DNA
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {trendingBooks.map((book, index) => (
                  <BookCard
                    key={index}
                    book={book}
                    handleBookClick={handleBookClick}
                    truncateDesc={truncateDesc}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default HomePage;
