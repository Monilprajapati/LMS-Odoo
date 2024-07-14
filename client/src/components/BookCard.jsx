// BookCard.js

import React, { useEffect, useState } from "react";

const BookCard = ({ book, index, handleBookClick, truncateDesc }) => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const data = {
      id: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      authors: book.volumeInfo.authors,
      publishedDate: book.volumeInfo.publishedDate,
      description: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
    };
    setBookData(data);
    
  }, [book]);
  console.log(bookData);
  return (
    <div
    key={index}
    className="bg-mediumGrey p-4 mb-4 rounded-lg flex cursor-pointer hover:shadow-lg h-40"  // Set a fixed height
    onClick={() => handleBookClick(book.id)}
  >
    {book.volumeInfo.imageLinks?.thumbnail && (
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
        className="w-24 h-full mr-4 rounded-lg object-cover"  // Adjust width and height
      />
    )}
    <div className="flex-1 overflow-hidden">
      <h3 className="text-xl font-bold truncate">{book.volumeInfo.title}</h3>
      {book.volumeInfo.subtitle && (
        <h4 className="text-md font-semibold truncate">{book.volumeInfo.subtitle}</h4>
      )}
      {book.volumeInfo.authors && (
        <p className="text-gray-700 truncate">By: {book.volumeInfo.authors.join(", ")}</p>
      )}
      {book.volumeInfo.publishedDate && (
        <p className="text-gray-600 truncate">Published Date: {book.volumeInfo.publishedDate}</p>
      )}
      {book.volumeInfo.description ? (
        <p className="text-gray-600 truncate">{truncateDesc(book.volumeInfo.description, 100)}</p>
      ) : (
        <p className="text-gray-600 truncate">No description available</p>
      )}
    </div>
  </div>
  
  );
};

export default BookCard;
