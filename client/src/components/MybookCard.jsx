// BookCard.js

import React, { useEffect, useState } from "react";

const MybookCard = ({ book, index, truncateDesc }) => {

  const { id, title, subtitle, author, publishedDate, description: desc, thumbnail : image, genre } = book;
  return (
    <div
    key={id}
    className="bg-mediumGrey p-4 mb-4 rounded-lg flex cursor-pointer hover:shadow-lg h-40"  // Set a fixed height
  >
    {thumbnail && (
      <img
        src={thumbnail}
        alt={title}
        className="w-24 h-full mr-4 rounded-lg object-cover"  // Adjust width and height
      />
    )}
    <div className="flex-1 overflow-hidden">
      <h3 className="text-xl font-bold truncate">{title}</h3>
      {/* {book.volumeInfo.subtitle && (
        <h4 className="text-md font-semibold truncate">{book.volumeInfo.subtitle}</h4>
      )} */}
      {author && (
        <p className="text-gray-700 truncate">By: {author.join(", ")}</p>
      )}
      {publishedDate && (
        <p className="text-gray-600 truncate">Published Date: {publishedDate}</p>
      )}
      {
        genre && (
          <p className="text-gray-600 truncate">Genre: {genre}</p>
        )
      }
      {description ? (
        <p className="text-gray-600 truncate">{truncateDesc(description, 100)}</p>
      ) : (
        <p className="text-gray-600 truncate">No description available</p>
      )}
    </div>
  </div>
  
  );
};

export default MybookCard;
