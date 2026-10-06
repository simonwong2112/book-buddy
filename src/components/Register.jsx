import { useState } from "react";
import { registerUser } from "../api/users.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await registerUser({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    });

    localStorage.setItem("token", result.token);
navigate("/books");
  }

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>

        <br />

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>

        <br />

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
