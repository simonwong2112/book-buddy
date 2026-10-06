import { useEffect, useState } from "react";
import { getCurrentUser, getReservations, returnBook } from "../api/users.js";
import { Link } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token")),
  );

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  async function handleReturn(reservationId) {
    await returnBook(reservationId);

    const updatedReservations = await getReservations();
    setReservations(updatedReservations);
  }

  useEffect(() => {
    async function loadUser() {
      const userResult = await getCurrentUser();
      const reservationResult = await getReservations();

      setUser(userResult);
      setReservations(reservationResult);
    }

    loadUser();
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Account</h2>
        <p>You are not logged in.</p>
        <Link to="/login">Login</Link>
        {" | "}
        <Link to="/register">Register</Link>
      </div>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Account</h2>

      <p>First Name: {user.firstname}</p>
      <p>Last Name: {user.lastname}</p>
      <p>Email: {user.email}</p>
      <h3>Reserved Books</h3>

      {reservations.length === 0 ? (
        <p>You don't have any reserved books.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title}

              <button onClick={() => handleReturn(reservation.id)}>
                Return
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
