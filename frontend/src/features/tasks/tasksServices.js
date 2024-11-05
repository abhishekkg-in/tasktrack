import axios from "axios";
const API_URL = "http://localhost:5000/api/"

const getAllTask = async () => {
    const response = await axios.get(`${API_URL}/tasks/all`)
    console.log("res in service frontned  ", response.data)
    return response.data
}

const tasksServices = {
    getAllTask
}

export default tasksServices