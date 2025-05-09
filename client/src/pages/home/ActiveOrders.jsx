import React from "react";

const ActiveOrders = () => {
  const orders = [
    { id: 1234, timestamp: "2h ago", status: "Bestilling modtaget" },
    { id: 5678, timestamp: "1d ago", status: "Klar til at afhentning" },
    { id: 9123, timestamp: "3d ago", status: "Bliver leveret" },
  ];

  return (
    <>
      <div className="centerContainer">
        <h1>Aktive Ordre</h1>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                <span>Ordre #{order.id}</span>
                <span>{order.timestamp}</span>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#888",
                  marginTop: "5px",
                }}
              >
                Status: {order.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ActiveOrders;
