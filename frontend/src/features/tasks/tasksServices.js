import axios from "axios";
const API_URL = "https://tasktrack-backend-gjon.onrender.com/api/"

const getAllTask = async () => {
    const user = localStorage.getItem('user')
    const id = JSON.parse(user)._id
    const response = await axios.post(`${API_URL}/tasks/user/${id}`)
    console.log("responce of all task for logged user...", response.data)
    // const groupedTasks = response.data.reduce(
    //     (acc, task) => {
    //       const status = task.status.toLowerCase(); // Convert status to lowercase
    //       acc[status] = [...(acc[status] || []), task];
    //       return acc;
    //     },
    //     { todo: [], inprogress: [], done: [] } // Adjust statuses as needed
    //   );
    return response.data
}

const createTask = async (data) => {
    console.log("got user task data to be created...", data);
    const response = await axios.post(`${API_URL}/tasks/create`, data)
    console.log("got responce after created task", response.data)
    return response.data
}

const updateTask = async (data) => {
    console.log("update data ....", data);
    const response = await axios.put(`${API_URL}/tasks/${data.id}`, data)
    console.log("res in service frontned  ", response.data)
    return response.data
}

const deleteTask = async (data) => {
    const response = await axios.delete(`${API_URL}/tasks/${data.id}`)
    console.log("res in service frontned  ", response.data)
    return response.data
}

// const getAllTaskforLoggedUser = async (id) => {
//     const response = axios.post(`${API_URL}/tasks/user/${id}`, id)
//     console.log("user tasks -> ", (await response).data);
//     return response.data
// }

const tasksServices = {
    getAllTask,
    createTask,
    updateTask,
    deleteTask
    // getAllTaskforLoggedUser,
}

export default tasksServices