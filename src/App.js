import React, { useState, useRef } from "react";
import Mouse from "./Mouse";
import "./App.css";

function App() {
  const [feedback, setFeedback] = useState("");
  const [reset, setReset] = useState(false);

  const mouse1Cheeses = useRef([]);
  const mouse2Cheeses = useRef([]);

  const handleDrop = (mouseId, cheeseId) => {
    if (mouseId === "mouse1" && !mouse1Cheeses.current.includes(cheeseId)) {
      mouse1Cheeses.current.push(cheeseId);
    } else if (mouseId === "mouse2" && !mouse2Cheeses.current.includes(cheeseId)) {
      mouse2Cheeses.current.push(cheeseId);
    }

    checkSolution();
  };

  const handleUndo = (mouseId, cheeseId) => {
    if (mouseId === "mouse1") {
      const index = mouse1Cheeses.current.indexOf(cheeseId);
      if (index > -1) mouse1Cheeses.current.splice(index, 1);
    } else if (mouseId === "mouse2") {
      const index = mouse2Cheeses.current.indexOf(cheeseId);
      if (index > -1) mouse2Cheeses.current.splice(index, 1);
    }

    setFeedback("");
  };

  const checkSolution = () => {
    const mouse1Set = new Set(mouse1Cheeses.current);
    const mouse2Set = new Set(mouse2Cheeses.current);

    if (mouse1Set.size !== 2 || mouse2Set.size !== 2) return;

    const sharedCheese = [...mouse1Set].find(cheese => mouse2Set.has(cheese));

    if (!sharedCheese) return;

    mouse1Set.delete(sharedCheese);
    mouse2Set.delete(sharedCheese);

    if ([...mouse1Set][0] !== [...mouse2Set][0]) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again.");
    }
  };

  const handleReset = () => {
    setFeedback("");
    setReset(true);
    setTimeout(() => setReset(false), 10);
    mouse1Cheeses.current = [];
    mouse2Cheeses.current = [];
  };

  return (
    <div className="app">
      <div className="instructions">
        <h3>💡 Instructions</h3>
        <p>
          You have two mice and four pieces of cheese. One of the pieces of
          cheese is poisoned, but you don't know which one. The mice can eat a
          small amount of the cheese, and within 24 hours, if the cheese was
          poisoned, the mouse will die. If the cheese wasn't poisoned, the mouse
          will be perfectly fine.
        </p>
        <p>
          Your goal is to determine which piece of cheese is poisoned, but you
          only have 24 hours. How can you be certain which piece of cheese is
          poisoned without risking both mice dying?
        </p>
      </div>
      <div className="mice-container">
        <Mouse id="mouse1" onDrop={handleDrop} onUndo={handleUndo} reset={reset} />
        <Mouse id="mouse2" onDrop={handleDrop} onUndo={handleUndo} reset={reset} />
      </div>
      <div className="cheeses-container">
        <div
          id="cheese1"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "cheese1")}
        ></div>
        <div
          id="cheese2"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "cheese2")}
        ></div>
        <div
          id="cheese3"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "cheese3")}
        ></div>
        <div
          id="cheese4"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "cheese4")}
        ></div>
      </div>
      <p className="feedback">{feedback}</p>
      <button onClick={handleReset}>Reset ↻</button>
    </div>
  );
}

export default App;
