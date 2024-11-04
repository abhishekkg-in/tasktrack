import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from '../Task/Task';
import Test from './Test'


export default function Tasks() {
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showTaskdetails, setShowTaskdetails] = useState(false)
  const [showTaskUpdate, setShowTaskUpdate] = useState(false)

  const handleCreate = () => {
    setShowCreateTask(true)
  }

  const handleClose = () => setShowCreateTask(false);
  const handleShow = () => setShowCreateTask(true);
  const handleCloseDetails = () => setShowTaskdetails(false);
  const handleShowdetails = () => setShowTaskdetails(true);
  const handleCloseupdate = () => setShowTaskUpdate(false);
  const handleShowUpdate = () => setShowTaskUpdate(true);

  const createTask = () => {
    console.log('Task created');
    handleClose();
  };

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
    <div className='container mt-4'>
      {/* <h2>All tasks...</h2>, */}
      <button className='btn btn-primary' onClick={handleCreate}>Add task</button>

      <div className="search-sort mt-3 mb-3" style={{border:"1px solid black", padding:"10px"}}>
        search & sort
      </div>


      <div className="tasks-container">
       <Test />
      </div>


      {/* Dialog to create new task */}
      <Modal className='' show={showCreateTask} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Task details go here...</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={createTask}>
              Save
            </Button>
          </Modal.Footer>
      </Modal>

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
      <Modal className='' show={showCreateTask} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Task details go here...</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={createTask}>
              Save
            </Button>
          </Modal.Footer>
      </Modal>

    </div>
  )
}
