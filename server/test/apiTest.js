const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Adjust the path to point to your index file
const expect = chai.expect;

chai.use(chaiHttp);

describe("Book API Tests", () => {
  let createdBookId;

  it("should get all books", (done) => {
    chai
      .request(app)
      .get("/api/books")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should create a new book", (done) => {
    const newBook = {
      title: "Mahabharat",
      author: "Lord Krishna",
      genre: "Religious",
      publisher: "Richard Bentley",
      year: "1851",
    };

    chai
      .request(app)
      .post("/api/books")
      .send(newBook)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.equal(
          `Book '${newBook.title}' by ${newBook.author} has been added.`
        );
        expect(res.body.createdBook).to.have.property("title", newBook.title);
        expect(res.body.createdBook).to.have.property("author", newBook.author);
        createdBookId = res.body.createdBook.id;
        done();
      });
  });

  // Test GET /books/:id
  it("should get a specific book by ID", (done) => {
    chai
      .request(app)
      .get(`/api/books/${createdBookId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        // expect(res.body).to.have.property('id').equal(createdBookId);
        done();
      });
  });

  // Test PUT /books/:id
  it("should update a specific book by ID", (done) => {
    const updatedBook = {
      title: "Updated Test Book",
    };

    chai
      .request(app)
      .put(`/api/books/${createdBookId}`)
      .send(updatedBook)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("message")
          .eql(`Book with ID '${createdBookId}' has been updated.`);
        expect(res.body).to.have.property("book");
        expect(res.body.book)
          .to.have.property("title")
          .eql("Updated Test Book");
        done();
      });
  });

  // Test DELETE /books/:id
  it("should delete a specific book by ID", (done) => {
    chai
      .request(app)
      .delete(`/api/books/${createdBookId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("message")
          .eql(`Book with ID '${createdBookId}' has been deleted.`);
        done();
      });
  });
});
