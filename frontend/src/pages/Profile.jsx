import { useState } from "react";
import API from "../api";
import { motion } from "framer-motion";

export default function Profile() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(url, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        alert("Logged in ✅");
      } else {
        alert("Registered ✅");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center px-4">
      
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      >
        <motion.h2
          className="text-3xl font-extrabold text-green-900 mb-6 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLogin ? "Login" : "Register"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <motion.input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full p-3 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        <motion.button
          className="mt-4 text-green-700 font-semibold underline hover:text-green-900 transition-colors"
          onClick={() => setIsLogin(!isLogin)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLogin ? "Create new account" : "Already have an account? Login"}
        </motion.button>

        {/* Decorative Floating Circle */}
        <motion.div
          className="absolute -top-16 -right-16 w-32 h-32 bg-green-300 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-24 h-24 bg-green-400 rounded-full opacity-10"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
