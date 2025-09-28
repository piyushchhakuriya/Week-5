import { useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { FaBook, FaPen } from "react-icons/fa";

export default function AddBook() {
  const [form, setForm] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      alert("Please fill all fields!");
      return;
    }
    try {
      setLoading(true);
      await API.post("/books/add", form);
      alert("📚 Book added successfully ✅");
      setForm({ title: "", author: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding book ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex justify-center items-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden border border-green-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <h2 className="text-3xl font-extrabold text-green-900 mb-6 text-center drop-shadow-md flex justify-center items-center gap-2">
          <FaBook className="animate-bounce text-green-700" />
          Add a Book
        </h2>

        {/* Title Input */}
        <motion.div
          className="relative mb-4"
          whileFocus={{ scale: 1.02 }}
        >
          <FaPen className="absolute top-3 left-3 text-green-400" />
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
            className="w-full pl-10 p-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </motion.div>

        {/* Author Input */}
        <motion.div
          className="relative mb-6"
          whileFocus={{ scale: 1.02 }}
        >
          <FaPen className="absolute top-3 left-3 text-green-400" />
          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
            className="w-full pl-10 p-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-2xl font-bold shadow-lg hover:shadow-green-400 transition-all duration-300 flex justify-center items-center gap-2"
        >
          {loading ? "Adding..." : "Add Book"} <FaBook />
        </motion.button>

        {/* Decorative Circles */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
        <motion.div
          className="absolute -top-12 -left-10 w-24 h-24 bg-green-400 rounded-full opacity-10"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        />
      </motion.form>
    </div>
  );
}
