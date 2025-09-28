import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaHome, FaBook, FaPlusCircle, FaUser } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Library", path: "/library", icon: <FaBook /> },
    { name: "Add Book", path: "/add-book", icon: <FaPlusCircle /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-green-600 to-green-500 bg-opacity-90 backdrop-blur-md shadow-2xl border-b border-green-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Heading */}
        <Link to="/">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-3xl font-extrabold flex items-center space-x-2 cursor-pointer select-none"
          >
            <span className="animate-bounce">📚</span>
            <span className="hidden sm:inline text-xl tracking-wide">
              Online Book Library
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 items-center">
          {links.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center space-x-1"
            >
              <Link
                to={link.path}
                className={`font-semibold text-lg flex items-center space-x-2 transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-200"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
              {/* Underline animation */}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-1 w-full bg-yellow-300 rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="focus:outline-none text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ☰
            </motion.span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-green-600/95 backdrop-blur-sm shadow-lg border-t border-green-400"
        >
          <div className="flex flex-col px-6 py-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`font-medium text-white text-lg flex items-center space-x-2 transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-yellow-300"
                    : "hover:text-yellow-200"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
