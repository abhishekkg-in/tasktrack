import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllTasks, updateTask, deleteTask, reset } from '../../features/tasks/tasksSlice'
import { Link, useNavigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner/Spinner'
import "./tasks.css"
 
const initialData = {
  todo: [
    // { _id: "1", title: "Task 1", description: "test description....", createdAt: "05/09/2024" },
    // { _id: "2", title: "Task 2", description: "test description....", createdAt: "05/09/2024" },
  ],
  inProgress: [
    // { _id: "3", title: "Task 3", description: "test description...." , createdAt: "05/09/2024"},
    // { _id: "4", title: "Task 4", description: "test description...." , createdAt: "05/09/2024"},
  ],
  done: [
    // { _id: "5", title: "Task 5", description: "test description...." , createdAt: "05/09/2024"},
  ],
};
 
export default function DragDropBoard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [columns, setColumns] = useState(initialData);
  const [showTaskdetails, setShowTaskdetails] = useState(false)
  const [showTaskUpdate, setShowTaskUpdate] = useState(false)
  const [selectedTask, setSelectedtask] = useState({title: "", description:""})
  const [forseUpdate, setForseUpdate] = useState(false)

  const handleCloseDetails = () => setShowTaskdetails(false);
  const handleShowdetails = () => setShowTaskdetails(true);
  const handleCloseupdate = () => setShowTaskUpdate(false);
  const handleShowUpdate = () => setShowTaskUpdate(true);

  const { user } = useSelector((state) => state.auth)

  const { tasks,taskWithColumn,  isLoading, isError, message } = useSelector(
    (state) => state.task
  )

  useEffect(() => {
    const groupedTasks = tasks.reduce(
      (acc, task) => {
        const status = task.status.toLowerCase(); // Convert status to lowercase
        acc[status] = [...(acc[status] || []), task];
        return acc;
      },
      { todo: [], inprogress: [], done: [] } // Adjust statuses as needed
    );

    console.log("task updated capture --->>> ", tasks);

    // if(Object.keys(groupedTasks).length>0){
    //   setColumns(groupedTasks)
    // }

    if(Object.keys(taskWithColumn).length>0){
      setColumns(groupedTasks)
    }

    return () => {
      dispatch(reset())
    }
  },[tasks, forseUpdate])


  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getAllTasks())

    const groupedTasks = tasks.reduce(
      (acc, task) => {
        const status = task.status.toLowerCase(); // Convert status to lowercase
        acc[status] = [...(acc[status] || []), task];
        return acc;
      },
      { todo: [], inprogress: [], done: [] } // Adjust statuses as needed
    );

    if(Object.keys(groupedTasks).length>0){
      setColumns(groupedTasks)
    }

    return () => {
      dispatch(reset())
    }
  }, [ isError, message, dispatch, forseUpdate])


  

  const [data, setData] = useState({
    title: selectedTask.title,
    description: selectedTask.description,
  })

  const {title, description} = data

  useEffect(() => {
    setData({title: selectedTask.title, description: selectedTask.description})
  }, [selectedTask])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleUpdateDetails = (e) => {
    e.preventDefault()
    const userData = {
      id: selectedTask._id,
      title,
      description,
      status: selectedTask.status
    }
    dispatch(updateTask(userData))
    window.location.reload();
    setForseUpdate(!forseUpdate)

    handleCloseupdate()
    console.log(userData);
    toast.success('Task updated Succesful')
  }

  
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

  const handleViewtask = (taskId) => {
    let task = tasks.find(obj => obj._id === taskId);
    setSelectedtask(task)
    console.log("view details button clicked...", task);
    handleShowdetails()
    
  }

  const handleModidyClick = (taskId) => {
    let task = tasks.find(obj => obj._id === taskId);
    setSelectedtask(task)
    handleShowUpdate()
    console.log("Modify button clicked...", task);
  }

  const handleDelete = (taskId) => {
    let task = tasks.find(obj => obj._id === taskId);
    setSelectedtask(task)
    dispatch(deleteTask({id: taskId}))
    window.location.reload();
    console.log("Delete button clicked...", task);
  }



  if(!user){
    console.log("user", user);
    navigate('/')
  }

  if(isLoading){
    return <Spinner />
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
                    <Draggable key={`${index}`} draggableId={task._id} index={index}>
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
                        }}><strong>CreatedAt: </strong> {task.createdAt}</p>

                        <div className="actions">
                          <div className="delete item" onClick={() => handleDelete(task._id)}>Delete</div>
                          <div className="edit item" onClick={() => handleModidyClick(task._id)}>Edit</div>
                          <div className="details item" onClick={() => handleViewtask(task._id)}>View Details</div>
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
          {
              selectedTask && (
                <>
                <h6>{selectedTask.title}</h6>
                <p>{selectedTask.description}</p>
                </>
              )
            }
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
            <>
            <form className='form'>
            <input
              type='text'
              value={title}
              onChange={handleChange}
              placeholder='title'
              id='title'
              name='title'
            />
            <input
              type='text'
              value={description}
              onChange={handleChange}
              placeholder='description'
              name='description'
            />
          </form>
            </>
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