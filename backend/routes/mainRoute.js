const express = require('express')
const router = express.Router()

const {createTask, getAlltask, updateTask, deleteTask} = require("../controller/taskController")
const {updateUsers, deleteUsers, registerUser, loginUser, getMe} = require("../controller/userController")


// User Routes
router.route('/users/:id').put(updateUsers).delete(deleteUsers)
router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.get('/users/me', getMe)

// Tasks Routes
router.route("/tasks/:id").put(updateTask).delete(deleteTask)
router.get("/tasks/all", getAlltask)
router.post("/tasks/create", createTask)


module.exports = router