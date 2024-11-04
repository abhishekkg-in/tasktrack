const asyncHandler = require('express-async-handler')
const Task = require("../model/taskModel")

const createTask = asyncHandler(async (req, res) => {
    const {title, description, status} = req.body

    const task = await Task.create({
        title,
        description,
        status,
    })

    if(task){
        res.status(201).json({
            _id: task.id,
            title: title,
            description: description,
            status: status
        })
    } else{
        res.status(400)
        throw new Error('Error creating task...')
    }
})

const getAlltask = asyncHandler(async (req, res) => {
    const tasks = await Task.find()
    res.status(200).json(tasks)
})

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400)
        throw new Error('Task not found')
    } else{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updatedTask)
    }
})

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task){
        res.status(400)
        throw new Error('Task not found')
    } else{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedTask)
    }
})

module.exports = {
    createTask,
    getAlltask,
    updateTask,
    deleteTask,
}

