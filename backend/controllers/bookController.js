import Book from "../models/Book.js";

// GET ALL BOOKS
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("reviews.user", "username");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD BOOK
export const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully ✅", book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// BORROW BOOK
export const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "borrowed")
      return res.status(400).json({ message: "Book already borrowed ❌" });

    book.status = "borrowed";
    await book.save();

    res.json({ message: "Book borrowed successfully ✅", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REVIEW BOOK
export const reviewBook = async (req, res) => {
  try {
    const { comment } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.reviews.push({ user: req.user.id, comment });
    await book.save();

    res.json({ message: "Review added successfully ✅", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UNBORROW BOOK
export const unborrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found ❌" });

    if (book.status === "available")
      return res.status(400).json({ message: "Book is already available ✅" });

    book.status = "available";
    await book.save();

    res.json({ message: "Book returned successfully ✅", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

