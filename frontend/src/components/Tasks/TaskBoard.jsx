import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllTasks, reset } from '../../features/tasks/tasksSlice'
import { Link, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, Button } from 'react-bootstrap';
import "./tasks.css"
 
const initialData = {
  todo: [
    { id: "1", title: "Task 1", description: "test description....", createdAt: "05/09/2024" },
    { id: "2", title: "Task 2", description: "test description....", createdAt: "05/09/2024" },
  ],
  inProgress: [
    { id: "3", title: "Task 3", description: "test description...." , createdAt: "05/09/2024"},
    { id: "4", title: "Task 4", description: "test description...." , createdAt: "05/09/2024"},
  ],
  done: [
    { id: "5", title: "Task 5", description: "test description...." , createdAt: "05/09/2024"},
  ],
};
 
export default function DragDropBoard({data}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.task
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    // dispatch((getAllTasks))
    const groupedTasks = tasks.reduce(
      (acc, task) => {
        const status = task.status.toLowerCase(); // Convert status to lowercase
        acc[status] = [...(acc[status] || []), task];
        return acc;
      },
      { todo: [], inprogress: [], done: [] } // Adjust statuses as needed
    );
    setColumns(data)

    return () => {
      dispatch(reset())
    }
  }, [ isError, message, dispatch])

  const [columns, setColumns] = useState(initialData);
  const [showTaskdetails, setShowTaskdetails] = useState(false)
  const [showTaskUpdate, setShowTaskUpdate] = useState(false)

  const handleCloseDetails = () => setShowTaskdetails(false);
  const handleShowdetails = () => setShowTaskdetails(true);
  const handleCloseupdate = () => setShowTaskUpdate(false);
  const handleShowUpdate = () => setShowTaskUpdate(true);

  // useEffect(() => {
    
  // }, [tasks])
 
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

    // console.log("moved task", movedTask);
  };

  const handleViewtask = (taskId) => {
    handleShowdetails()
    console.log("view details button clicked...", taskId);
  }

  const handleModifyDetails = (taskId) => {
    handleShowUpdate()
    console.log("Modify button clicked...", taskId);
  }

  const handleUpdateDetails = () => {
    console.log("Modify button clicked...");
  }

  const handleDelete = (taskId) => {
    console.log("Delete button clicked...", taskId);
  }
 
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ 
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px" 
        }}>
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
                  minHeight: "100px",
                  borderRadius: "5px",
                  flex: "1 1 10px"
                }}
              >
                <h2 style={{
                  backgroundColor: "#5596f5",
                  color: "#ffffff",
                  padding: "5px",
                  fontSize: "1rem",
                  textTransform: "uppercase"
                }}>{columnId}</h2>
                {tasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: "none",
                          padding: "5px 16px",
                          margin: "0 0 8px 0",
                          backgroundColor: "#d2e6fa",
                          borderRadius: "5px",
                          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <h5 style={{
                          color: "#000000",
                          fontWeight: "bold",
                        }}>{task.title}</h5>
                        <p style={{
                          color: "#545d6c",
                        }}>{task.description}</p>
                        <p style={{
                          fontSize: ".8rem",
                          color: "#6f7786",
                        }}>{task.createdAt}</p>

                        <div className="actions">
                          <div className="delete item" onClick={() => handleDelete(task.id)}>Delete</div>
                          <div className="edit item" onClick={() => handleModifyDetails(task.id)}>Edit</div>
                          <div className="details item" onClick={() => handleViewtask(task.id)}>View Details</div>
                        </div>
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


    {/* Dialog to view task */}
    <Modal className='' show={showTaskdetails} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Task details go here...</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>

      {/* Dialog to modify task */}
      <Modal className='' show={showTaskUpdate} onHide={handleCloseupdate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Task details go here...</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseupdate}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateDetails}>
              Save
            </Button>
          </Modal.Footer>
      </Modal>




    </>
  );
};