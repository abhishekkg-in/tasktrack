import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
 
const initialData = {
  todo: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
  ],
  inProgress: [
    { id: "3", content: "Task 3" },
    { id: "4", content: "Task 4" },
  ],
  done: [
    { id: "5", content: "Task 5" },
  ],
};
 
export default function DragDropBoard() {
  const [columns, setColumns] = useState(initialData);
 
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
 
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
 
    destColumn.splice(destination.index, 0, movedTask);
 
    setColumns({
      ...columns,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };
 
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Object.entries(columns).map(([columnId, tasks]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  backgroundColor: "#e2e2e2",
                  padding: "10px",
                  width: "250px",
                  minHeight: "500px",
                  borderRadius: "5px",
                }}
              >
                <h2>{columnId}</h2>
                {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: "none",
                          padding: "16px",
                          margin: "0 0 8px 0",
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};