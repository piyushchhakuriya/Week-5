import { motion } from "framer-motion";
import { FaBookOpen, FaStar, FaUsers, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden flex flex-col">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center py-20 px-4 flex-grow"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6 drop-shadow-md flex items-center justify-center gap-3">
          📚 Online Book Library
        </h1>
        <p className="text-lg md:text-xl text-green-800 max-w-2xl mb-8">
          Discover, borrow, and review your favorite books. Build your personal library, share reviews, and explore thousands of titles all in one place.
        </p>

        {/* Explore Library Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/library")}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-green-400 transition-all duration-300 mb-4"
        >
          Explore Library
        </motion.button>

        {/* Sign Up Now Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profile")}
          className="bg-white text-green-700 font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-green-400 transition-all duration-300"
        >
          Sign Up Now
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          {
            icon: <FaBookOpen className="text-green-600 text-4xl" />,
            title: "Add & Manage Books",
            desc: "Easily add new books to your library and manage them efficiently.",
          },
          {
            icon: <FaUsers className="text-green-600 text-4xl" />,
            title: "Borrow Books",
            desc: "Borrow books from the library and track availability in real-time.",
          },
          {
            icon: <FaStar className="text-green-600 text-4xl" />,
            title: "Review Books",
            desc: "Share your thoughts, rate books, and see what others think.",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            {feature.icon}
            <h3 className="text-xl font-bold text-green-900 mt-4 mb-2">{feature.title}</h3>
            <p className="text-green-800 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-green-800 text-white py-10 mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold">📚 Online Book Library</h2>
            <p className="text-green-200 mt-2">© 2025 All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-2xl">
            <a href="#" className="hover:text-green-400"><FaFacebook /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram /></a>
          </div>
        </div>
      </motion.footer>

      {/* Decorative Circles */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-300 rounded-full opacity-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />
      <motion.div
        className="absolute -top-32 -left-16 w-48 h-48 bg-green-400 rounded-full opacity-10"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
    </div>
  );
}
