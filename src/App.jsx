import { useEffect, useState } from "react";
import { getBooks } from "./api/books.js";
import BookList from "./components/BookList.jsx";
import { Routes, Route, Link } from "react-router-dom";
import BookDetails from "./components/BookDetails.jsx";
import Account from "./components/Account.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

export default function App() {
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function loadBooks() {
      const result = await getBooks();
      setBooks(result);
    }

    loadBooks();
  }, []);

  return (
    <div>
      <nav>
        <Link to="/books">Books</Link>
        {" | "}
        <Link to="/account">Account</Link>
        {" | "}
        {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
      </nav>
      <h1>Book Buddy</h1>

      <Routes>
        {" "}
        <Route path="/" element={<BookList books={books} />} />{" "}
        <Route path="/books" element={<BookList books={books} />} />{" "}
        <Route
          path="/books/:id"
          element={<BookDetails isLoggedIn={isLoggedIn} />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
