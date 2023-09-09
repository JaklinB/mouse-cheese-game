import React, { useState, useEffect } from "react";

function Mouse({ id, onDrop, onUndo, reset }) {
  const [cheeses, setCheeses] = useState([]);

  useEffect(() => {
    if (reset) {
      setCheeses([]);
    }
  }, [reset]);

  const handleDropEvent = (e) => {
    e.preventDefault();
    const cheeseId = e.dataTransfer.getData("text/plain");
    if (cheeses.length < 2) {
      const updatedCheeses = [...cheeses, cheeseId];
      setCheeses(updatedCheeses);
      onDrop(id, cheeseId);
    }
  };

  const handleUndoAction = (index) => {
    const removedCheese = cheeses[index];
    const updatedCheeses = [...cheeses];
    updatedCheeses.splice(index, 1);
    setCheeses(updatedCheeses);

    if (typeof onUndo === "function") {
      onUndo(id, removedCheese);
    }
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
            onClick={() => handleUndoAction(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Mouse;
