import React, { useState, useEffect } from "react";

function Mouse({ id, onDrop, reset }) {
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
    </div>
  );
}

export default Mouse;
