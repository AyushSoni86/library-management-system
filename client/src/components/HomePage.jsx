import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
       
        <h1 className="text-5xl font-semibold mb-10">
          Library Management System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/books"
            className="bg-blue-500 text-white px-14 py-8 rounded-md hover:bg-blue-600 text-2xl"
          >
            <button>Show All Books</button>
          </Link>

          <Link
            to="/discarded-books"
            className="bg-red-500 text-white px-14 py-8 rounded-md hover:bg-red-600 text-2xl"
          >
            <button>Show Deleted Books</button>
          </Link>

          <Link
            to="/add-books"
            className="bg-green-500 text-white px-14 py-8 rounded-md hover:bg-green-600 text-2xl"
          >
            <button>Add a New Book</button>
          </Link>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
