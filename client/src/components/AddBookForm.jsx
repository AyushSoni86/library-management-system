// AddBookForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    author: "",
    genre: "",
    publisher: "",
    year: "",
  });

  const navigateTo = useNavigate();

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleChange = (e) => {
    setNewBook({
      ...newBook,

      [e.target.name]: e.target.value,
    });
    console.log(newBook);
  };

  const handleAddBook = () => {
    // Open the confirmation modal
    setConfirmationModalOpen(true);
  };

  const [fieldMandatory, setFieldMandatory] = useState(false);

  const handleConfirmAdd = async () => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.genre ||
      !newBook.publisher ||
      !newBook.year
    ) {
      // Display an error message or handle the error as needed
      setFieldMandatory(true)
      console.error("All fields are mandatory");
      return;
    }

    setFieldMandatory(false) ;

    try {
      // Make a POST request to add a new book
      await axios.post("http://localhost:3000/api/books", newBook);

      setConfirmationModalOpen(false);
      // Redirect to the home page after successfully adding the book
      navigateTo("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      setConfirmationModalOpen(false);
      setExistingBookModal(true);
      return;
      // Handle error if needed
    }
  };

  const handleCancelAdd = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
  };

  const handleCancel = () => {
    // Redirect to the home page when the "Cancel" button is clicked
    navigateTo("/");
  };

  const [isExistingBookModalOpen, setExistingBookModal] = useState(false);
 

  const handleCancelExistingBook = () => {
    // Close the existing book modal
    setExistingBookModal(false);
  };

  const handleFieldMandatory = () => {
    // Close the existing book modal
    setFieldMandatory(false);
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Add a New Book
      </h2>

      <form>
        <div className="mb-6 text-left">
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-800"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter book title"
            value={newBook.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6 text-left">
          <label
            htmlFor="author"
            className="block text-lg font-semibold text-gray-800"
          >
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter book author"
            value={newBook.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6 text-left">
          <label
            htmlFor="genre"
            className="block text-lg font-semibold text-gray-800"
          >
            Genre:
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Enter book genre"
            value={newBook.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6 text-left">
          <label
            htmlFor="publisher"
            className="block text-lg font-semibold text-gray-800"
          >
            Publisher:
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            placeholder="Enter book publisher"
            value={newBook.publisher}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="mb-6 text-left">
          <label
            htmlFor="year"
            className="block text-lg font-semibold text-gray-800"
          >
            Year Published:
          </label>
          <input
            type="text"
            id="year"
            name="year"
            placeholder="Enter year of publication"
            value={newBook.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddBook}
            className="bg-blue-500 text-lg text-white px-10 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-lg text-white px-10 py-3 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <p className="text-xl font-semibold mb-4">
              Are you sure you want to add the book?
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleConfirmAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={handleCancelAdd}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isExistingBookModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <p className="text-xl font-semibold mb-4">
              This book already exists in the library...!!!
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleCancelExistingBook}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {fieldMandatory && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <p className="text-xl font-semibold mb-4">
              All Fields are Mandatory...!!!
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleFieldMandatory}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBookForm;
