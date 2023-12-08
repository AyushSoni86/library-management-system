const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "..", "data", "books.json");
const deletedFilePath = path.join(__dirname, "..", "data", "deletedBooks.json");

let books = loadBooks();
let deletedBooks = loadDeletedBooks();

function loadBooks() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Error reading data file please do check the :",
      error.message
    );
    return [];
  }
}

function loadDeletedBooks() {
  try {
    const data = fs.readFileSync(deletedFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("No Deleted Records found yet !!");
    return [];
  }
}

function saveBooks() {
  try {
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync(dataFilePath, data, "utf-8");
  } catch (error) {
    console.error("Error writing data file:", error.message);
  }
}

function saveDeletedBooks() {
  try {
    const data = JSON.stringify(deletedBooks, null, 2);
    fs.writeFileSync(deletedFilePath, data, "utf-8");
  } catch (error) {
    console.error("Error writing deleted books file:", error.message);
  }
}

const createBook = (newBook) => {
  const existingBook = books.find(
    (b) => b.title === newBook.title && b.author === newBook.author
  );

  if (existingBook) {
    throw new Error(
      "Duplicate entry. This book already exists in the library."
    );
  }

  const deletedBookIndex = deletedBooks.findIndex(
    (b) => b.title === newBook.title && b.author === newBook.author
  );

  if (deletedBookIndex !== -1) {
    // If a deleted book with the same title and author exists, remove it from deletedBooks
    const restoredBook = deletedBooks.splice(deletedBookIndex, 1)[0];
    books.push(restoredBook);
    saveBooks();
    saveDeletedBooks();
    return {
      message: `Book '${restoredBook.title}' by ${restoredBook.author} has been restored.`,
      book: restoredBook,
      val: true,
    };
  }

  books.push(newBook);
  saveBooks();
  return newBook;
};

const getBooks = () => {
  return books;
};

const getBookById = (bookId) => {
  return books.find((b) => b.id === bookId);
};

const updateBook = (bookId, updatedBook) => {
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    saveBooks();
    return books[index];
  } else {
    throw new Error("Book not found. Cannot update a non-existing book.");
  }
};

const deleteBook = (bookId) => {
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    const deletedBook = books.splice(index, 1)[0];
    deletedBooks.push(deletedBook);
    saveBooks();
    saveDeletedBooks();
  } else {
    throw new Error("Book not found. Cannot delete a non-existing book.");
  }
};

const getDeletedBooks = () => {
  return deletedBooks;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getDeletedBooks,
};
