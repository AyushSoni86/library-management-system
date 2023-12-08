import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Books from "./components/Books";
import DiscardedBooks from "./components/DiscardedBooks";
import AddBookForm from "./components/AddBookForm";
import Book from "./components/Book";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookID" element={<Book />} />

        <Route path="/discarded-books" element={<DiscardedBooks />} />
        <Route path="/add-books" element={<AddBookForm />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
