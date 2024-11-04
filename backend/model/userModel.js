const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a Name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    googleId: {
        type: String,
    },
    image: {
        type: String
    }
}, {timestamps:true})

module.exports = mongoose.model("User", userSchema)