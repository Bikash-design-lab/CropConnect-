import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to right, #d4edda, #a8e6cf)",
    // background: "linear-gradient(to right, #ffffff,rgb(191, 254, 230))",
    padding: "20px",
  };

  const errorTextStyle = {
    fontSize: "100px",
    fontWeight: "bold",
    color: "#e63946",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    marginBottom: "10px",
  };

  const messageStyle = {
    fontSize: "22px",
    color: "#2c3e50",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const descriptionStyle = {
    fontSize: "16px",
    color: "#555",
    maxWidth: "500px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    fontSize: "18px",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2563eb",
    transform: "scale(1.05)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={errorTextStyle}>404</h1>
      <p style={messageStyle}>Oops! Page Not Found</p>
      <p style={descriptionStyle}>
        The page you're looking for doesn't exist or has been moved. Please
        check the URL or return to the dashboard.
      </p>
      <button
        onClick={() => navigate("/")}
        style={buttonStyle}
        onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)}
        onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;

