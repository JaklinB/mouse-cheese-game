import React, { useState, useRef } from "react";
import Mouse from "./Mouse";
import "./App.css";
import CustomAlert from "./CustomAlert";

function App() {
  const [feedback, setFeedback] = useState("");
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deadMouse, setDeadMouse] = useState(null);
  const [guessingPhase, setGuessingPhase] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const mouse1Cheeses = useRef([]);
  const mouse2Cheeses = useRef([]);

  const determineDeadMouse = () => {
    const randomNum = Math.random();
    if (randomNum < 0.25) return "mouse1";
    if (randomNum < 0.5) return "mouse2";
    if (randomNum < 0.75) return "both";
    return "none";
  };

  const handleWait = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDeadMouse(determineDeadMouse());
      setGuessingPhase(true);
    }, 4000);
  };

  const handleCheeseGuess = (cheeseId) => {
    let poisonedCheese;
    if (deadMouse === "mouse1")
      poisonedCheese = mouse1Cheeses.current.find(
        (c) => !mouse2Cheeses.current.includes(c)
      );
    else if (deadMouse === "mouse2")
      poisonedCheese = mouse2Cheeses.current.find(
        (c) => !mouse1Cheeses.current.includes(c)
      );
    else if (deadMouse === "both")
      poisonedCheese = mouse1Cheeses.current.find((c) =>
        mouse2Cheeses.current.includes(c)
      );
    else
      poisonedCheese = ["cheese1", "cheese2", "cheese3", "cheese4"].find(
        (c) =>
          !mouse1Cheeses.current.includes(c) &&
          !mouse2Cheeses.current.includes(c)
      );

    if (cheeseId === poisonedCheese)
      setFeedback("Correct! That's the poisoned cheese.");
    else setFeedback("Incorrect. Try again.");
  };

  const handleDrop = (mouseId, cheeseId) => {
    if (guessingPhase) return;

    if (mouseId === "mouse1" && !mouse1Cheeses.current.includes(cheeseId)) {
      mouse1Cheeses.current.push(cheeseId);
    } else if (
      mouseId === "mouse2" &&
      !mouse2Cheeses.current.includes(cheeseId)
    ) {
      mouse2Cheeses.current.push(cheeseId);
    }
    checkSolution();
  };

  const handleUndo = (mouseId, cheeseId) => {
    if (guessingPhase) return;

    if (mouseId === "mouse1") {
      const index = mouse1Cheeses.current.indexOf(cheeseId);
      if (index > -1) mouse1Cheeses.current.splice(index, 1);
    } else if (mouseId === "mouse2") {
      const index = mouse2Cheeses.current.indexOf(cheeseId);
      if (index > -1) mouse2Cheeses.current.splice(index, 1);
    }
    setFeedback("");
    checkSolution();
  };

  const checkSolution = () => {
    const mouse1Set = new Set(mouse1Cheeses.current);
    const mouse2Set = new Set(mouse2Cheeses.current);

    if (mouse1Set.size !== 2 || mouse2Set.size !== 2) return;

    const sharedCheese = [...mouse1Set].find((cheese) => mouse2Set.has(cheese));

    if (!sharedCheese) return;

    mouse1Set.delete(sharedCheese);
    mouse2Set.delete(sharedCheese);

    if ([...mouse1Set][0] !== [...mouse2Set][0]) {
      setAlertMessage("Correct! Now let's wait for the poison to take effect!");
      setShowAlert(true);
      handleWait();
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
    setDeadMouse(null);
    setGuessingPhase(false);
    setLoading(false);
    setShowAlert(false);
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
          poisoned?
        </p>
      </div>
      <div className="mice-container">
        <Mouse
          id="mouse1"
          onDrop={handleDrop}
          onUndo={handleUndo}
          reset={reset}
          guessingPhase={guessingPhase}
        />
        <Mouse
          id="mouse2"
          onDrop={handleDrop}
          onUndo={handleUndo}
          reset={reset}
          guessingPhase={guessingPhase}
        />
      </div>
      {deadMouse && (
        <div className="dead-mouse-status">
          <span role="img" aria-label="skull">
            💀
          </span>
          {deadMouse === "mouse1"
            ? " Mouse 1 is dead."
            : deadMouse === "mouse2"
            ? " Mouse 2 is dead."
            : deadMouse === "both"
            ? " Both mice are dead."
            : " None of the mice died."}
        </div>
      )}
      <div className="cheeses-container">
        {["cheese1", "cheese2", "cheese3", "cheese4"].map((cheeseId) => (
          <div
            key={cheeseId}
            id={cheeseId}
            className="cheese"
            draggable={!guessingPhase}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", cheeseId)}
            onClick={guessingPhase ? () => handleCheeseGuess(cheeseId) : null}
          ></div>
        ))}
      </div>
      <p className={feedback ? "feedback active" : "feedback"}>{feedback}</p>
      <button onClick={handleReset}>Reset ↻</button>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          buttonAlertMessage={"Wait ⏱️"}
          onClose={() => setShowAlert(false)}
        />
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-indicator">Time is passing by ... ⏳</div>
        </div>
      )}
    </div>
  );
}

export default App;
