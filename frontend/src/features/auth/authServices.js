import axios from "axios";
const API_URL = "https://tasktrack-backend-gjon.onrender.com/api/"


// user registration
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


// user login
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData)
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// user logout
const logout =  () => {
    localStorage.removeItem('user')
}



const authServices = {
    register,
    login,
    logout
}

export default authServices