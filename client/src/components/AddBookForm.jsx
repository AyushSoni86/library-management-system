// AddBookForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = async () => {
    try {
      // Make a POST request to add a new book
      await axios.post("http://localhost:3000/api/books", newBook);

      // Redirect to the home page after successfully adding the book
      navigateTo.push("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error if needed
    }
  };

  const handleCancel = () => {
    // Redirect to the home page when the "Cancel" button is clicked
    navigateTo.push("/");
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Add a New Book
      </h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-600"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-semibold text-gray-600"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={newBook.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-sm font-semibold text-gray-600"
          >
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearPublished"
            className="block text-sm font-semibold text-gray-600"
          >
            Year Published:
          </label>
          <input
            type="text"
            id="yearPublished"
            name="yearPublished"
            value={newBook.yearPublished}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddBook}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
