import mongoose from "mongoose";

// Book Schema -> defines how a book will be stored in DB
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ["available", "borrowed"], default: "available" },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
    },
  ],
});

export default mongoose.model("Book", bookSchema);
