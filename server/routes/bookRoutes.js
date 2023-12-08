const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/books', (req, res) => {
    try {
        const newBook = req.body;
        const createdBook = bookController.createBook(newBook);
        console.log(createdBook);
        // res.status(201).json(createdBook);
        if (createdBook.val)
            res.status(201).json({ message: `Book '${createdBook.book.title}' by ${createdBook.book.author} has been added.`, createdBook });

        else
            res.status(201).json({ message: `Book '${createdBook.title}' by ${createdBook.author} has been added.`, createdBook });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}); 

router.get('/books', (req, res) => {
    const allBooks = bookController.getBooks();
    res.json(allBooks);
});

router.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = bookController.getBookById(bookId);

    if (!book) {
        res.status(404).json({ error: 'Book not found' });
    } else {
        res.json(book);
    }
});

router.put('/books/:id', (req, res) => {
    try {
        const bookId = req.params.id;
        const updatedBook = req.body;
        const result = bookController.updateBook(bookId, updatedBook);
        // res.json(result);
        res.json({ message: `Book with ID '${bookId}' has been updated.`, book: result });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/books/:id', (req, res) => {
    try {
        const bookId = req.params.id;
        bookController.deleteBook(bookId);
        // res.status(204).end();
        res.status(200).json({ message: `Book with ID '${bookId}' has been deleted.` });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/deletedBooks',(req, res) => {
    const allBooks = bookController.getDeletedBooks();
    res.json(allBooks);
  })
  
module.exports = router;
