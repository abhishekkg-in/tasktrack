const User = require('../model/userModel')
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // Get Token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get User from the Token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not Authorized, no Token")
    }

})

module.exports = {protect}