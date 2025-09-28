import express from "express";
import { addBook, getBooks, borrowBook, reviewBook, unborrowBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/books -> Get all books
router.get("/", getBooks);

// POST /api/books/add -> Add new book (only logged-in user)
router.post("/add", authMiddleware, addBook);

// PUT /api/books/borrow/:id -> Borrow a book
router.put("/borrow/:id", authMiddleware, borrowBook);

// POST /api/books/review/:id -> Add a review
router.post("/review/:id", authMiddleware, reviewBook);

// POST /api/books/unborrow/:id ->unborrow
router.put("/unborrow/:id", authMiddleware, unborrowBook);

export default router;
