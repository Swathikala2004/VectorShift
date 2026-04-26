// src/draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="draggable-chip" draggable onDragStart={onDragStart}>
      <span className="draggable-chip__icon">{icon}</span>
      {label}
    </div>
  );
};