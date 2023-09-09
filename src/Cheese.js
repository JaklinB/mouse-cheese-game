import React from 'react';

function Cheese({ id }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div 
      id={id} 
      className="cheese" 
      draggable 
      onDragStart={handleDragStart}
    ></div>
  );
}

export default Cheese;
