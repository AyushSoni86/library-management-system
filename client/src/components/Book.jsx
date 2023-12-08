// src/components/Book.js

// import React from "react";
import { useParams } from "react-router-dom";
import sampleBooks from "./SampleBooks";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Book = () => {

  const { bookID } = useParams();

  const [book, setBook] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${bookID}`)
      .then((response) => {
        // console.log(response.data);
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


  // const selectedBook = sampleBooks.find((book) => book.id == bookID);

  const handleEdit = () => {
    // Add your edit logic here
    console.log(`Editing book with ID ${bookID}`);
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log(`Deleting book with ID ${bookID}`);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h2 className="text-4xl font-bold mb-4">{book.title}</h2>
        <p className="text-lg font-semibold">Author: {book.author}</p>
        <p className="text-lg font-semibold">Genre: {book.genre}</p>
        <p className="text-lg font-semibold">Year: {book.year}</p>
        <p className="text-lg font-semibold">Publisher: {book.publisher}</p>
       
        <div className="mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
