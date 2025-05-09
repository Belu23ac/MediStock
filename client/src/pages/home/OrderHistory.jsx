import React from "react";

const OrderHistory = () => {
  return (
    <>
      <div className="centerContainer">
        <h1>Din Historik</h1>

    <ul style={{ listStyleType: "none", padding: 0 }}>
      {[
        { id: 1234, status: "Aktiv" },
        { id: 5678, status: "Aktiv" },
        { id: 9123, status: "Aktiv" },
        { id: 1122, status: "Leveret" },
        { id: 3344, status: "Leveret" },
        { id: 5566, status: "Leveret" },
        { id: 7788, status: "Leveret" },
        { id: 9900, status: "Leveret" }
      ].map((order) => (
        <li
        key={order.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 0",
          borderBottom: "1px solid #ccc",
        }}
        >
        <span>Ordre #{order.id}</span>
        <span>{order.status}</span>
        </li>
      ))}
    </ul>
      </div>
    </>
  );
};

export default OrderHistory;
