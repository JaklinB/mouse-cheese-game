import React, { useState, useRef } from 'react';
import Mouse from './Mouse';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState('');
  const [reset, setReset] = useState(false); 

  const mouse1Cheeses = useRef([]);
  const mouse2Cheeses = useRef([]);

  const handleDrop = (mouseId, cheeseId) => {
    if (mouseId === 'mouse1') {
      mouse1Cheeses.current.push(cheeseId);
    } else if (mouseId === 'mouse2') {
      mouse2Cheeses.current.push(cheeseId);
    }

    if (mouse1Cheeses.current.length >= 2 && mouse2Cheeses.current.length >= 2) {
      checkSolution();
    }
  };

  const checkSolution = () => {
    if (
      mouse1Cheeses.current.includes('cheese1') &&
      mouse2Cheeses.current.includes('cheese2') &&
      mouse1Cheeses.current.includes('cheese3') &&
      mouse2Cheeses.current.includes('cheese3')
    ) {
      setFeedback('Correct!');
    } else {
      // setFeedback('Try again.');
    }
  };

  const handleReset = () => {
    setFeedback('');
    setReset(true);
    setTimeout(() => setReset(false), 10);
    mouse1Cheeses.current = [];
    mouse2Cheeses.current = [];
  };

  return (
    <div className="app">
      <div className="mice-container">
        <Mouse id="mouse1" onDrop={handleDrop} reset={reset} />
        <Mouse id="mouse2" onDrop={handleDrop} reset={reset} />
      </div>
      <div className="cheeses-container">
        <div
          id="cheese1"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'cheese1')}
        ></div>
        <div
          id="cheese2"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'cheese2')}
        ></div>
        <div
          id="cheese3"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'cheese3')}
        ></div>
        <div
          id="cheese4"
          className="cheese"
          draggable="true"
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'cheese4')}
        ></div>
      </div>
      <p className="feedback">{feedback}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
