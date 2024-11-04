import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    't1': { id: '1', content: 'Task 1' },
    't2': { id: '2', content: 'Task 2' },
    't3': { id: '3', content: 'Task 3' },
    't4': { id: '4', content: 'Task 4' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['t1', 't2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['t3'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['t4'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default function Task() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    console.log("Result", result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        console.log("column -> ", column)
        console.log("takss -> ", tasks)

        return (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ margin: '8px', border: '1px solid lightgrey', borderRadius: '2px', width: '220px', display: 'inline-block', verticalAlign: 'top' }}
              >
                <h3>{column.title}</h3>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: '16px',
                          margin: '0 0 8px 0',
                          minHeight: '50px',
                          backgroundColor: '#fff',
                          color: '#333',
                          border: '1px solid lightgrey',
                          borderRadius: '2px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.content}id{task.id}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </DragDropContext>
  );
};

