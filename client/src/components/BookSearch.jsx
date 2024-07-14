// src/components/BookSearch.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Function to truncate description
const truncateDesc = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const BookSearch = () => {
  const [query, setQuery] = useState('python');
  const [trendingQuery, setTrendingQuery] = useState('odoo');
  const [books, setBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch books based on search query
  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyDah_bqx1VW9ROLd-g-zoxZdXVqpVijFo0`);
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending books based on a specific query
  const fetchTrendingBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${trendingQuery}&key=AIzaSyDah_bqx1VW9ROLd-g-zoxZdXVqpVijFo0`);
      setTrendingBooks(response.data.items || []);
    } catch (err) {
      setError('Error fetching data. Please try again.');
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 shadow-md text-center">
        <h1 className="text-3xl font-bold">Search the Books Available in Library</h1>
      </header>
      <main className="flex-grow flex flex-col items-center p-4">
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
          <div className='flex flex-row'>

          <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-2">New Arrivals</h2>
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 mb-4 rounded-lg flex cursor-pointer hover:shadow-lg h-30"
                    onClick={() => handleBookClick(book.id)}
                  >
                    {book.volumeInfo.imageLinks?.thumbnail && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        className="w-18 h-24 mr-4 rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{book.volumeInfo.title}</h3>
                      {book.volumeInfo.subtitle && <h4 className="text-md font-semibold">{book.volumeInfo.subtitle}</h4>}
                      {book.volumeInfo.authors && (
                        <p className="text-gray-700">
                          By: {book.volumeInfo.authors.join(', ')}
                        </p>
                      )}
                      {book.volumeInfo.publishedDate && (
                        <p className="text-gray-600">Published Date: {book.volumeInfo.publishedDate}</p>
                      )}
                      {book.volumeInfo.description && (
                        <p className="text-gray-600">
                          {truncateDesc(book.volumeInfo.description, 100)} {/* Truncate to 100 characters */}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-2">Trending</h2>
            {trendingBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white p-4 mb-4 rounded-lg flex cursor-pointer hover:shadow-lg "
                onClick={() => handleBookClick(book.id)}
              >
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="w-18 h-24 mr-4 rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{book.volumeInfo.title}</h3>
                  {book.volumeInfo.subtitle && <h4 className="text-md font-semibold">{book.volumeInfo.subtitle}</h4>}
                  {book.volumeInfo.authors && (
                    <p className="text-gray-700">
                      By: {book.volumeInfo.authors.join(', ')}
                    </p>
                  )}
                  {book.volumeInfo.publishedDate && (
                    <p className="text-gray-600">Published Date: {book.volumeInfo.publishedDate}</p>
                  )}
                  {book.volumeInfo.description && (
                    <p className="text-gray-600">
                      {truncateDesc(book.volumeInfo.description, 100)} {/* Truncate to 100 characters */}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

      </main>
    </div>
  );
};

export default BookSearch;
