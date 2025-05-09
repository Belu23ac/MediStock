import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Opretter…");

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Parse error response
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      const saved = await res.json(); // { id, username, password }
      setStatus(`✅ Tilføjet (${saved.username})`);

      localStorage.setItem("userid", saved.id);
      localStorage.setItem("username", saved.username);

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
        <button>Opret dig</button>
        {status && <p>{status}</p>}
      </form>

      <p>
        Allerede en bruger? <Link to="/login">Login her</Link>
      </p>
      <p>
        <strong>OBS:</strong> Dette er en prototype. Sikker håndtering af password er ikke
        implementeret, så brug venligst ikke dine normale passwords.
      </p>
    </>
  );
}
