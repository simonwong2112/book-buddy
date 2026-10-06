const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

/** Registers a new user */
export async function registerUser(user) {
  try {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

//handles login
export async function loginUser(user) {
  try {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

//get authorized user's info
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(API + "/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

//gets list of reserved books for token-associated user
export async function getReservations() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(API + "/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//reserves book
export async function reserveBook(bookId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(API + "/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookId,
      }),
    });

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

//returns book
export async function returnBook(reservationId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(API + "/reservations/" + reservationId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}
