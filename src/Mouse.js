import React, { useState } from 'react';

function Mouse({ id, onDrop }) {
    const [cheeses, setCheeses] = useState([]);

    const handleDropEvent = (e) => {
        e.preventDefault();
        const cheeseId = e.dataTransfer.getData('text/plain');
        if (cheeses.length < 2) {
            const updatedCheeses = [...cheeses, cheeseId];
            setCheeses(updatedCheeses);
            onDrop(id, cheeseId);
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
                    <div key={idx} className="small-cheese"></div>
                ))}
            </div>
        </div>
    );
}

export default Mouse;
