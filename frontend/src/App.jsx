import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Library from "./pages/Library.jsx";
import Profile from "./pages/Profile.jsx";
import AddBook from "./pages/AddBook.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </Router>
  );
}
