// Importing required libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Importing routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config(); // Load .env file

const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests (frontend <-> backend)
app.use(express.json()); // Parse JSON requests

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 API is working fine!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
