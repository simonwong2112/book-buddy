import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users.js";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await loginUser({
      email,
      password,
    });

    localStorage.setItem("token", result.token);
    navigate("/books");
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
