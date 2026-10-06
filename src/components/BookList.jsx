import { Link } from "react-router-dom";

export default function BookList({ books }) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h3>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </h3>

          <p>By {book.author}</p>
        </div>
      ))}
    </div>
  );
}
