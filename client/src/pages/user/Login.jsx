import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function Login() {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Checker…");

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        throw new Error("Wrong credentials");
      }


      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const me = await res.json(); // { id, username }
      setStatus(`✅ Welcome ${me.username}!`);

      localStorage.setItem("userid", me.id);
      localStorage.setItem("username", me.username);

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
    e.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
        <input
          className="input"
          name="username"
          onChange={handleChange}
          placeholder="Brugernavn"
        />
        <input
          className="input"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
        </div>
        <button>Login</button>
        {status && <p>{status}</p>}
      </form>

      <p>
        Ikke allerede en bruger? <Link to="/register">Opret dig her</Link>
      </p>
    </>
  );
}
