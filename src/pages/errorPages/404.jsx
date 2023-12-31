// NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
        <a href="/" className="bg-purple-500 text-white px-4 py-2 rounded-md">Go back to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
