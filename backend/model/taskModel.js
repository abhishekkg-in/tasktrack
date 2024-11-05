const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    userId: {
        type: String
    }
}, {timestamps:true})

module.exports = mongoose.model("Task", taskSchema)

