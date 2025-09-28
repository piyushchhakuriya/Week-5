import { useEffect, useState } from "react";
import API from "../api";
import BookCard from "../components/BookCard";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBorrow = async (id) => {
    try {
      await API.put(`/books/borrow/${id}`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Error borrowing book");
    }
  };

  const handleUnborrow = async (id) => {
    try {
      await API.put(`/books/unborrow/${id}`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Error unborrowing book");
    }
  };

  const handleReview = async (id) => {
    const comment = prompt("Enter your review:");
    if (!comment) return;
    try {
      await API.post(`/books/review/${id}`, { comment });
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding review");
    }
  };

  return (
    <div className="pt-28 px-6 pb-10 bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-8 text-center drop-shadow-lg">
        📚 Our Book Collection
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-green-700 text-xl font-semibold">
          Loading books...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onBorrow={handleBorrow}
              onUnborrow={handleUnborrow}
              onReview={handleReview}
            />
          ))}
        </div>
      )}
    </div>
  );
}
