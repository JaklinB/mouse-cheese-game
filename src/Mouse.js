import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert";

function Mouse({ id, onDrop, onUndo, reset, guessingPhase }) {
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

  const handleUndoEvent = (e) => {
    if (guessingPhase) return;
    const cheeseId = e.target.getAttribute("data-cheese-id");
    const updatedCheeses = cheeses.filter((c) => c !== cheeseId);
    setCheeses(updatedCheeses);
    onUndo(id, cheeseId);
  };

  return (
    <div
      id={id}
      className="mouse"
      onDrop={handleDropEvent}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="small-cheeses-container">
        {["cheese1", "cheese2", "cheese3", "cheese4"].map((cheeseId) => (
          <div
            key={cheeseId}
            className={`small-cheese ${
              cheeses.includes(cheeseId) ? "visible" : "hidden"
            }`}
            data-cheese-id={cheeseId}
            onClick={handleUndoEvent}
          ></div>
        ))}
      </div>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          buttonAlertMessage={"Close"}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default Mouse;
