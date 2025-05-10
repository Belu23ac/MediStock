import { useState, useEffect } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import "./order.css";

const Order = () => {
  const navigate = useNavigate();
  const outlet = useOutlet(); // This returns the nested route element (or null if there is none)

  // State to hold the list of order items (each with name and quantity)
  const [orderItems, setOrderItems] = useState([]);
  // State to hold the currently selected item from the dropdown
  const [selectedItem, setSelectedItem] = useState("");
  // State to control the visibility of the scan popup overlay
  const [showPopup, setShowPopup] = useState(false);
  // State to manage the countdown timer for the scan popup
  const [countdown, setCountdown] = useState(2);
  // New state for emergency order checkbox
  const [emergencyOrder, setEmergencyOrder] = useState(false);
  // Array of items available for selection
  const itemsCatalog = [
    "Plaster",
    "Ble",
    "Kanylle",
    "Spøjter",
    "Bodywipes",
    "Spritservietter",
    "Hånddesinfektion",
    "Sprit",
  ];

  // Check localStorage when the component loads
  useEffect(() => {
    const scannedProduct = localStorage.getItem("scannedProduct");
    if (scannedProduct) {
      // Here we add "Plaster" to orderItems.
      setOrderItems((prev) => {
        if (prev.some((item) => item.name === "Plaster")) {
          return prev.map((item) =>
            item.name === "Plaster"
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { name: "Plaster", quantity: 1 }];
        }
      });
      localStorage.removeItem("scannedProduct");
    }
  }, []);

  // Adjusts the quantity of an order item; delta can be positive or negative
  const handleQuantityChange = (item, delta) => {
    setOrderItems((prev) =>
      prev.map((i) =>
        i.name === item.name
          ? { ...i, quantity: Math.max(1, i.quantity + delta) } // Avoid quantity less than 1
          : i
      )
    );
  };

  // Deletes an item from the order list by filtering it out
  const handleDeleteItem = (item) => {
    setOrderItems((prev) => prev.filter((i) => i.name !== item.name));
  };

  // Adds the currently selected item to the order list.
  // If the item exists, increases its quantity; otherwise, adds it as new with quantity 1.
  const handleAddItem = () => {
    if (!selectedItem) return; // Do nothing if no item is selected

    if (orderItems.some((i) => i.name === selectedItem)) {
      // Increase quantity for existing item
      setOrderItems((prev) =>
        prev.map((item) =>
          item.name === selectedItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item with quantity 1
      setOrderItems((prev) => [...prev, { name: selectedItem, quantity: 1 }]);
    }
    setSelectedItem(""); // Reset selection after adding
  };

  // Handles the scan action.
  // Adds "Plaster" to the order list when countdown reaches 2.
  const handleScan = () => {
    let timer = 6;
    setCountdown(timer);
    setShowPopup(true);

    const interval = setInterval(() => {
      timer -= 1;
      setCountdown(timer);

      if (timer === 2) {
        // When countdown is 2, add "Plaster" to the order list
        setOrderItems((prev) => {
          if (prev.some((item) => item.name === "Plaster")) {
            return prev.map((item) =>
              item.name === "Plaster"
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prev, { name: "Plaster", quantity: 1 }];
          }
        });
      }

      if (timer === 0) {
        clearInterval(interval);
        setShowPopup(false);
      }
    }, 1000);
  };

  // Submits the order by sending orderItems to the server via a POST request.
  const handleSubmitOrder = async () => {
    try {
      // Retrieve userId from localStorage
      const userId = localStorage.getItem("userid");
      // Create payload including userId, orderItems, and emergencyOrder
      const payload = { userId, orderItems, isEmergency: emergencyOrder };
      console.log("Submitting order:", payload);

      const response = await fetch("/api/orders/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Parse JSON from the response
      const data = await response.json();

      if (response.ok) {
        // Store orderId in localStorage and navigate to /receipt
        localStorage.setItem("orderId", data.orderId);

        navigate("/order/receipt");
        handleClearOrder(); // Clear order items after submission
        setEmergencyOrder(false);
      } else {
        alert("Failed to submit order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  // Clears all order items from the list
  const handleClearOrder = () => {
    setOrderItems([]);
  };

  return (
    <>
      <div className="centerContainer">
        {/* Only show main content if no nested route is rendered */}
        {!outlet && (
          <>
            <h1>Bestilling</h1>
            {/* Order List Box */}
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "20px",
                height: "200px",
                overflowY: "auto",
              }}
            >
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {orderItems.map((item) => (
                  <li
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "5px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: "bold" }}>{item.name}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <button
                        className="transparent-button"
                        onClick={() => handleQuantityChange(item, -1)}
                      >
                        –
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        style={{ fontWeight: "bold" }}
                        className="input-order"
                        onChange={(e) =>
                          setOrderItems((prev) =>
                            prev.map((i) =>
                              i.name === item.name
                                ? {
                                    ...i,
                                    quantity: Math.max(
                                      1,
                                      parseInt(e.target.value) || 1
                                    ),
                                  }
                                : i
                            )
                          )
                        }
                      />
                      <button
                        className="transparent-button"
                        onClick={() => handleQuantityChange(item, 1)}
                      >
                        +
                      </button>
                      <button
                        className="transparent-button delete"
                        onClick={() => handleDeleteItem(item)}
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scan Button Box */}
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={handleScan}
                style={{ width: "100%", cursor: "pointer" }}
              >
                Scan
              </button>
            </div>

            {/* Dropdown and Add to Order Box */}
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <select
                    value={selectedItem}
                    style={{ cursor: "pointer" }}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="select-order"
                  >
                    <option value="">Vælg en varer</option>
                    {itemsCatalog.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={handleAddItem} style={{ width: "100%" }}>
                  Tilføj til ordre
                </button>
              </div>
            </div>

            {/* Emergency Order Checkbox */}
            <div
              style={{
                border: "1px solid #ccc",
                marginBottom: "20px",
                borderRadius: "5px",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={emergencyOrder}
                  onChange={(e) => setEmergencyOrder(e.target.checked)}
                  style={{ marginRight: "10px" }}
                />
                {emergencyOrder ? "Akutordre" : "Klik for akutordre"}
              </label>
            </div>

            {/* Order Submission and Clear Buttons */}
            <div style={{ display: "flex" }}>
              <button className="order-button" onClick={handleSubmitOrder}>
                ✅ Bestil
              </button>
              <button className="cancel-button" onClick={handleClearOrder}>
                X
              </button>
            </div>
          </>
        )}

        {/* Popup overlay */}
        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                width: "320px",
                height: "240px",
                backgroundColor: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Barcode scan area */}
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(90deg, #f0f0f0, #fff)",
                  position: "relative",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 50"
                  style={{ width: "80%", height: "80%" }}
                >
                  <rect x="6" y="0" width="1" height="50" fill="black" />
                  <rect x="10" y="0" width="5" height="50" fill="black" />
                  <rect x="20" y="0" width="3" height="50" fill="black" />
                  <rect x="30" y="0" width="7" height="50" fill="black" />
                  <rect x="40" y="0" width="3" height="50" fill="black" />
                  <rect x="50" y="0" width="5" height="50" fill="black" />
                  <rect x="60" y="0" width="4" height="50" fill="black" />
                  <rect x="70" y="0" width="6" height="50" fill="black" />
                  <rect x="80" y="0" width="3" height="50" fill="black" />
                  <rect x="90" y="0" width="5" height="50" fill="black" />
                  <rect x="100" y="0" width="4" height="50" fill="black" />
                </svg>

                {/* Animated red scanning line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "red",
                    animation: "scanRedLine 2s linear infinite",
                  }}
                ></div>
              </div>

              {/* Overlay message area */}
              {countdown <= 2 ? (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}
                  >
                    ✅ Success!
                  </p>
                  <p style={{ margin: 0, fontSize: "16px" }}>
                    Plaster (ID: 43223) added to your order.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "16px" }}>
                    Scanning... ({countdown})
                  </p>
                </div>
              )}
            </div>
            <style>{`
              @keyframes scanRedLine {
                0% {
                  top: 0;
                }
                100% {
                  top: 100%;
                }
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Nested routes will be rendered here */}
      <Outlet />
    </>
  );
};

export default Order;
