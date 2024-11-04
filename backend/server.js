const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
// const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 3001

// initializing app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // url encoded

// connecting to database
connectDB()


app.listen(port, () => {
    console.log(`Server running at ${port}...`)
})