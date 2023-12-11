import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Book = () => {
  const { bookID } = useParams();
  const navigate = useNavigate();

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
  }, [bookID]);

  // const selectedBook = sampleBooks.find((book) => book.id == bookID);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmEditModalOpen, setConfirmEditModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState({ ...book });
  // const [editedBook, setEditedBook] = useState({
  //   id: "",
  //   title: "",
  //   author: "",
  //   genre: "",
  //   publisher: "",
  //   year: "",
  // });

  const handleCancelEdit = () => {
    // Close the confirmation modal
    setConfirmEditModalOpen(false);
    // Close the edit modal
    setEditModalOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      // Make a PUT request to update the book
      await axios.put(`http://localhost:3000/api/books/${bookID}`, editedBook);
      // Close the confirmation modal
      setConfirmEditModalOpen(false);
      // Close the edit modal
      setEditModalOpen(false);
      // Refresh book data
      setBook(editedBook);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEditedBook(book);

    setEditModalOpen(true);
    // Add your edit logic here
    console.log(`Editing book with ID ${bookID}`);
  };

  const handleDelete = () => {
    // Add your delete logic here
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Make a DELETE request to delete the book
      await axios.delete(`http://localhost:3000/api/books/${bookID}`);
      // Close the delete modal
      setDeleteModalOpen(false);
      // Navigate to the show all books page
      navigate("/books");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDelete = () => {
    // Close the delete modal
    setDeleteModalOpen(false);
  };

  const handleChange = (e) => {
    setEditedBook({
      ...editedBook,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-yellow-50 p-8 rounded-md shadow-md text-center ">
        <h2 className="text-4xl font-bold mb-4">{book.title}</h2>
        <p className="text-lg font-semibold">Author: {book.author}</p>
        <p className="text-lg font-semibold">Genre: {book.genre}</p>
        <p className="text-lg font-semibold">Year: {book.year}</p>
        <p className="text-lg font-semibold">Publisher: {book.publisher}</p>

        <div className="mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-6 py-3 rounded-md mr-4 hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md text-center">
              <p className="text-xl font-semibold mb-4">
                Are you sure you want to delete?
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md text-center max-w-xl w-full">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Edit Book
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
                    value={editedBook.title}
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
                    value={editedBook.author}
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
                    value={editedBook.genre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
                  />
                </div>
                <div className="mb-6 text-left">
                  <label
                    htmlFor="publisher"
                    className="block text-lg font-semibold text-gray-800"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={editedBook.publisher}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
                  />
                </div>
                <div className="mb-6 text-left">
                  <label
                    htmlFor="year"
                    className="block text-lg font-semibold text-gray-800"
                  >
                    year:
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={editedBook.year}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 text-lg"
                  />
                </div>
                {/* Repeat similar blocks for other fields (author, genre, year, publisher) */}
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setConfirmEditModalOpen(true)}
                    className="bg-blue-500 text-lg text-white px-10 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-lg text-white px-10 py-3 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Confirmation Modal */}
        {isConfirmEditModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md text-center">
              <p className="text-xl font-semibold mb-4">
                Are you sure you want to save changes?
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;
