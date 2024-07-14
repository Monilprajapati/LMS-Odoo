import React from 'react';

const About = () => {
  return (
    <div className="p-6 bg-gray-100  flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center h-75  mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex-1 mb-6 md:mb-0 md:mr-6">
          <iframe
            src="https://lottie.host/embed/ad5cb207-dd8c-4cc6-9c51-8fe074793608/P2WOOcSqnb.json"
            className="w-full h-96 border-0"
            title="About Us Animation"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-extrabold mb-6 font-poppins text-gray-800 leading-tight">
            About Our Library Management System
          </h2>
          <p className="text-lg text-gray-700 mb-6 font-roboto leading-relaxed">
            Welcome to our Library Management System! Our platform is designed to streamline and enhance the management of libraries, providing a comprehensive solution for book cataloging, member management, and circulation tracking.
          </p>
          <p className="text-lg text-gray-700 mb-6 font-roboto leading-relaxed">
            Our mission is to make library management more efficient and user-friendly, enabling librarians to focus on what they do best - fostering a love for reading and learning.
          </p>
          <h3 className="text-3xl font-semibold mb-4 font-poppins text-gray-800">
            Key Features:
          </h3>
          <ul className="list-disc pl-6 text-gray-700 font-roboto space-y-2">
            <li className="text-lg">Automated book cataloging and inventory management</li>
            <li className="text-lg">Efficient member registration and tracking</li>
            <li className="text-lg">Real-time circulation and loan management</li>
            <li className="text-lg">Advanced search and filter options for books and members</li>
            <li className="text-lg">Detailed reporting and analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
