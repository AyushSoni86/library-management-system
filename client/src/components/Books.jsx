import React, { useEffect, useState } from "react";
// import Book from "./Book";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">All Books</h2>
      <div className="flex mb-8 gap-3">
        <Link
          to="/"
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 text-xl"
        >
          <button>Home</button>
        </Link>
        <Link
          to="/discarded-books"
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 text-xl"
        >
          <button>GetDeletedBooks</button>
        </Link>
        <Link
          to="/add-books"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 text-xl"
        >
          <button>Add a new book</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          // <Book key={book.id} {...book} />
          <Link to={`/books/${book.id}`} key={book.id}>
            <div className="bg-white p-4 mb-4 rounded-md shadow-md"  style={{ backgroundColor: "#ffd58ab8"}}>
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              {/* Add more book details as needed */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Books;
