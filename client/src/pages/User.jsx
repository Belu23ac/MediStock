import React from "react";
import "../App.css";

const Users = () => {
  const username = localStorage.getItem("username");

  return (
    <>
      <div className="centerContainer">
        <h1>Bruger</h1>

        <label style={{ display: "block", marginBottom: "10px" }}>
          Brugernavn: {username ? username : "No username found"}
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Funktion: Sygeplejeske
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Sporg: Dansk
        </label>

        <button
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("userid");
            window.location.reload();
          }}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Log Ud
        </button>
      </div>
    </>
  );
};

export default Users;
