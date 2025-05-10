import "./order.css";
import { useEffect, useState } from "react";

const OrderReceipt = () => {
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = localStorage.getItem("orderId");
        localStorage.removeItem("orderId");

        if (!orderId) {
          throw new Error("Order ID not found");
        } else {
          const response = await fetch(`/api/orders/${orderId}`, {
            method: "get",
            headers: { "Content-Type": "application/json" },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch order");
          }
          const order = await response.json();
          if (!order) {
            throw new Error("Order not found");
          }
          setReceipt(order);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setReceipt(null);
      }
    };

    fetchOrder();
  }, []);

  if (!receipt) {
    return (
      <div id="home" className="home-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  const orderItems = JSON.parse(receipt.userOrder); // [{ name, quantity }]
  const isEmergency = Boolean(receipt.isEmergency);
  const eta = isEmergency ? "1‑2h" : "2d";

  const boxStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  };

  return (
    <div id="home" className="home-container">
      <h1>✅ Success</h1>
      <h2>Ordre modtaget</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            paddingTop: 0,
            marginBottom: "20px",
            height: 200,
            overflowY: "auto",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}
          >
            {orderItems.map(({ name, quantity }) => (
              <li
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: 5,
                  paddingTop: 5,
                }}
              >
                <span style={{ fontWeight: "bold" }}>{name}</span>
                <span style={{ fontWeight: "bold" }}>{quantity} stk</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={boxStyle}>
          <span>Akut Order</span>
          <span>{isEmergency ? "✅" : "❌"}</span>
        </div>
        <div style={boxStyle}>
          <span>ETA</span>
          <span>{eta}</span>
        </div>
        <div style={boxStyle}>
          <span>OrderID</span>
          <span>#{receipt.orderId}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
