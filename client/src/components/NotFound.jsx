// src/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* Image */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/382/506/original/404-error-page-with-explorer-man-illustration-on-white-background-vector.jpg"
          alt="Page Not Found"
          className="mx-auto mb-6 w-80 h-auto object-cover transition-transform transform hover:scale-105"
        />
        {/* Text */}
        <p className="text-xl text-gray-600 mb-4">Sorry, the page you’re looking for doesn’t exist.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600 hover:shadow-xl transition-transform transform hover:scale-105"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
