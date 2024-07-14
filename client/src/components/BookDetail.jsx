import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDah_bqx1VW9ROLd-g-zoxZdXVqpVijFo0`);
        setBook(response.data);
      } catch (err) {
        setError('Error fetching book details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const truncateDesc = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 shadow-md text-center">
        <h1 className="text-4xl font-medium">Book Details</h1>
      </header>
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full relative">
          <div className="flex flex-col lg:flex-row">
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-48 h-64 lg:w-64 lg:h-80 mb-4 lg:mb-0 lg:mr-6 rounded-lg shadow-md"
              />
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-medium mb-4">{book.volumeInfo.title}</h2>
              {book.volumeInfo.subtitle && <h3 className="text-xl font-semibold mb-4">{book.volumeInfo.subtitle}</h3>}
              {book.volumeInfo.authors && (
                <p className="text-lg font-medium mb-4">
                  {book.volumeInfo.authors.join(', ')}
                </p>
              )}
              {book.volumeInfo.publishedDate && (
                <p className="text-gray-700 text-lg mb-4">
                  <span className="font-semibold">Published Date:</span> {book.volumeInfo.publishedDate}
                </p>
              )}
              {book.volumeInfo.description && (
                <p className="text-gray-700 text-lg mb-6">{truncateDesc(book.volumeInfo.description, 300)}</p>
              )}
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
