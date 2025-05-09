import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScanBarcodePage = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        localStorage.setItem("scannedProduct", "plaster");
        navigate("/order");
      }, 3000);
    } else {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, navigate]);

  return (
    <div>
      <div className="centerContainer">
        <div>
          <h1>Scan Varer</h1>
          <div
            style={{
              margin: "20px auto",
              width: "300px",
              height: "200px",
              border: "2px solid black",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 50"
              style={{ width: "100%", height: "100%" }}
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
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "2px",
                backgroundColor: "red",
                animation: "scan 2s infinite",
              }}
            ></div>
          </div>
          {countdown === 0 ? (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                ✅ Success!
              </p>
              <p style={{ fontSize: "18px", fontStyle: "italic" }}>
                <span style={{ fontWeight: "bold" }}>Plaster (ID: 43223)</span> er
                blevet tilføjet til din ordre.
              </p>
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  margin: "0 auto",
                  width: "50px",
                  height: "50px",
                  border: "5px solid gray",
                  borderTop: "5px solid black",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              <p style={{ fontStyle: "italic" }}>Scanner... ({countdown})</p>
            </div>
          )}
          <style jsx="true">
            {`
              @keyframes scan {
                0% {
                  top: 0;
                }
                100% {
                  top: 100%;
                }
              }
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default ScanBarcodePage;
