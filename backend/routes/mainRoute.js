const express = require('express')
const router = express.Router()

const {updateUsers, deleteUsers, registerUser, loginUser, getMe} = require("../controller/userController")

// User Routes
router.route('/users/:id').put(updateUsers).delete(deleteUsers)
router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.get('/users/me', getMe)


module.exports = router