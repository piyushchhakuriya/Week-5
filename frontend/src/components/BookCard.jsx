import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function BookCard({ book, onBorrow, onReview, onUnborrow }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-green-50 to-green-100 shadow-2xl p-6 rounded-3xl border border-green-200 relative overflow-hidden cursor-pointer hover:shadow-emerald-400"
      whileHover={{ scale: 1.06, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
    >
      {/* Status Ribbon */}
      <motion.div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-xs shadow-lg ${
          book.status === "available"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {book.status.toUpperCase()}
      </motion.div>

      {/* Title & Author */}
      <h2 className="text-2xl font-extrabold mb-1 text-green-900 hover:text-green-700 transition-colors duration-300">
        {book.title}
      </h2>
      <p className="text-green-800 mb-3 italic text-sm">by {book.author}</p>

      {/* Star Rating */}
      <div className="flex items-center mb-3">
        {Array(5)
          .fill(0)
          .map((_, i) =>
            i < (book.rating || 0) ? (
              <FaStar key={i} className="text-yellow-400 mr-1" />
            ) : (
              <FaRegStar key={i} className="text-yellow-300 mr-1" />
            )
          )}
      </div>

      {/* Divider */}
      <div className="border-t border-green-200 my-3"></div>

      {/* Buttons */}
      <div className="flex justify-between mt-2">
        {book.status === "available" ? (
          <motion.button
            onClick={() => onBorrow(book._id)}
            className="px-5 py-2 bg-green-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Borrow
          </motion.button>
        ) : (
          <motion.button
            onClick={() => onUnborrow(book._id)}
            className="px-5 py-2 bg-red-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Unborrow
          </motion.button>
        )}
        <motion.button
          onClick={() => {
            const comment = prompt("Enter your review:");
            if (comment) onReview(book._id, comment);
          }}
          className="px-5 py-2 bg-green-200 text-green-900 font-semibold rounded-2xl shadow-lg hover:bg-green-300 hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Review
        </motion.button>
      </div>

      {/* Decorative Circles */}
      <motion.div
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-10 -left-10 w-20 h-20 bg-green-400 rounded-full opacity-10"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
    </motion.div>
  );
}
