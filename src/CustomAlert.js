import React from "react";

function CustomAlert({ message, buttonAlertMessage, onClose }) {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-content">
        <p>{message}</p>
        <button onClick={onClose}>{buttonAlertMessage}</button>
      </div>
    </div>
  );
}

export default CustomAlert;
