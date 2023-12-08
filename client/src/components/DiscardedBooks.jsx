import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DiscardedBooks = () => {
  const [deletedBooks, setDeletedBooks] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/deletedBooks")
      .then((response) => {
        // console.log(response.data);
        setDeletedBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Discarded Books
      </h2>
      <div className="flex mb-8 gap-3">
        <Link
          to="/"
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 text-xl"
        >
          <button>Home</button>
        </Link>
        <Link
          to="/books"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 text-xl"
        >
          <button>ShowAllBooks</button>
        </Link>
        <Link
          to="/add-books"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 text-xl"
        >
          <button>Add a new book</button>
        </Link>
      </div>
      <table className="min-w-full  border border-white">
        <thead>
          <tr>
            <th className="border border-gray-300 px-6 py-4  bg-red-500 text-center uppercase text-lg font-bold text-blue-50">
              Title
            </th>
            <th className="border border-gray-300 px-6 py-4 bg-red-500 text-center uppercase text-lg font-bold text-blue-50">
              Author
            </th>
            <th className="border border-gray-300 px-6 py-4 bg-red-500 text-center uppercase text-lg font-bold text-blue-50">
              Genre
            </th>
            <th className="border border-gray-300 px-6 py-4 bg-red-500 text-center uppercase text-lg font-bold text-blue-50">
              Year Published
            </th>
            <th className="border border-gray-300 px-6 py-4 bg-red-500 text-center uppercase text-lg font-bold text-blue-50">
              Publisher
            </th>
          </tr>
        </thead>
        <tbody>
          {deletedBooks.map((book, index) => (
            <tr
              key={book.id}
              className={index % 2 === 0 ? "bg-red-200" : "bg-red-100"}
            >
              <td className="border border-red-50 px-6 py-3">{book.title}</td>
              <td className="border border-red-50 px-6 py-3">{book.author}</td>
              <td className="border border-red-50 px-6 py-3">{book.genre}</td>
              <td className="border border-red-50 px-6 py-3">{book.year}</td>
              <td className="border border-red-50 px-6 py-3">
                {book.publisher}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiscardedBooks;
