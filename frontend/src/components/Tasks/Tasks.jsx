import React, {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import { getAllTasks, createTask, reset } from '../../features/tasks/tasksSlice'
import { toast } from 'react-toastify'
import TaskBoard from './TaskBoard'


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({});
  const [searchTerm, setSearchTerm] = useState("")

  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showTaskdetails, setShowTaskdetails] = useState(false)
  const [showTaskUpdate, setShowTaskUpdate] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )

  const {isLoading, isError, message } = useSelector(
    (state) => state.task
  )

  const handleCreate = () => {
    setShowCreateTask(true)
  }

  const handleClose = () => setShowCreateTask(false);
  const handleShow = () => setShowCreateTask(true);
  const handleCloseDetails = () => setShowTaskdetails(false);
  const handleShowdetails = () => setShowTaskdetails(true);
  const handleCloseupdate = () => setShowTaskUpdate(false);
  const handleShowUpdate = () => setShowTaskUpdate(true);


  // Fetch tasks from backend
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/tasks/all"); // Replace with actual API URL
  //       const fetchedTasks = response.data;
        
  //       console.log("data -> ", fetchedTasks);
  //       // Group tasks by their status
  //       const groupedTasks = fetchedTasks.reduce(
  //         (acc, task) => {
  //           const status = task.status.toLowerCase(); // Convert status to lowercase
  //           acc[status] = [...(acc[status] || []), task];
  //           return acc;
  //         },
  //         { todo: [], inprogress: [], done: [] } // Adjust statuses as needed
  //       );
  //       console.log("groupedtasks -> ", groupedTasks);
  //       setTasks(fetchedTasks);
  //       setColumns(groupedTasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };
  //   fetchTasks();
  // }, []);

  const handleCreateTask = () => {
    const userData = {
      id: user._id,
      title,
      description,
      status: "todo"
    }
    dispatch(createTask(userData))
    window.location.reload();
    toast.success('Task created Succesful')
    handleClose();
    console.log('Task created', userData);
    
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


  // const [columns, setColumns] = useState(initialData);
 
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

  const [data, setData] = useState({
    title: "",
    description:"",
  })

  const {title, description} = data

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  // if(isLoading){
  //   return <Spinner />
  // }

  
  return (
    <div className='container mt-4'>
      {/* <h2>All tasks...</h2>, */}
      <button className='btn btn-primary' onClick={handleCreate}>Add task</button>

      <div className="search-sort mt-3 mb-3" style={{border:"1px solid black", padding:"10px"}}>
        search & sort
      </div>


      <div className="tasks-container">
        {
          columns && (
            <TaskBoard />
          )
        }
       
      </div>


      {/* Dialog to create new task */}
      <Modal className='' show={showCreateTask} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateTask}>
              Save
            </Button>
          </Modal.Footer>
      </Modal>



      

    </div>
  )
}
