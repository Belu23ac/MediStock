import React from "react";
import "../App.css";

const notifications = [
  {
    id: 1,
    message: "Din ordre er blevet afleveret",
    timestamp: "5h ago",
  },
  {
    id: 2,
    message: "Natawan har hentet din ordre...",
    timestamp: "7h ago",
  },
  {
    id: 3,
    message: "Din ordre bliver hentet af Nanta...",
    timestamp: "1d ago",
  },
  {
    id: 4,
    message: "Din ordre er klar til afhentning",
    timestamp: "2d ago",
  },
{
    id: 5,
    message: "Din ordre er blevet behandlet",
    timestamp: "3d ago",
},
{
    id: 6,
    message: "Din ordre er blevet modtaget",
    timestamp: "3d ago",
},
{
    id: 7,
    message: "Velkommen til MediStock!",
    timestamp: "6d ago",
}

];

export default function Notification() {
  return (
    <>
      <div className="centerContainer">
        <h1>Notifikation</h1>
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <span>{notification.message}</span>
                <small style={{ color: "#888" }}>
                  {notification.timestamp}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
