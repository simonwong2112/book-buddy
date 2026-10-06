import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/books.js";
import { reserveBook } from "../api/users.js";

export default function BookDetails({ isLoggedIn }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  async function handleReserve() {
    const result = await reserveBook(book.id);
    console.log(result);
    const updatedBook = await getBookById(id);
    setBook(updatedBook);
  }

  useEffect(() => {
    async function loadBook() {
      const result = await getBookById(id);
      setBook(result);
    }

    loadBook();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>By {book.author}</p>

      <img src={book.coverimage} alt={book.title} />

      <p>{book.description}</p>

      <p>{book.available ? "Available" : "Currently checked out"}</p>
      {isLoggedIn && book.available && (
        <button onClick={handleReserve}>Reserve</button>
      )}
    </div>
  );
}
