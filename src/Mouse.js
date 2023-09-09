import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert";

function Mouse({ id, onDrop, reset, existingCheeses }) {
  const [cheeses, setCheeses] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (reset) {
      setCheeses([]);
    }
  }, [reset]);

  const handleDropEvent = (e) => {
    e.preventDefault();
    const cheeseId = e.dataTransfer.getData("text/plain");
    if (!cheeses.includes(cheeseId)) {
      const updatedCheeses = [...cheeses, cheeseId];
      setCheeses(updatedCheeses);
      onDrop(id, cheeseId);
    } else {
      setAlertMessage("You've already given this cheese to this mouse!");
      setShowAlert(true);
    }
  };

  const handleUndo = (index) => {
    const updatedCheeses = [...cheeses];
    updatedCheeses.splice(index, 1);
    setCheeses(updatedCheeses);
  };

  return (
    <div
      id={id}
      className="mouse"
      onDrop={handleDropEvent}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="small-cheeses-container">
        {cheeses.map((cheeseId, idx) => (
          <div
            key={idx}
            className="small-cheese"
            onClick={() => handleUndo(idx)}
          ></div>
        ))}
      </div>
      {showAlert && (
        <CustomAlert 
          message={alertMessage} 
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default Mouse;
