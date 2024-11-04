const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @desc    Register Users
// @route   POST api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, googleId, image} = req.body
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all the fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already registered')
    } 

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id) 
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    
  })


// @desc    Register Users
// @route   POST api/users/login
// @access  public
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("user does'nt exists")
    }
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            email: user.email,
            name: user.name,
            token: generateToken(user._id) 
        })
    } else{
        res.status(400)
        throw new Error('Wrong password')
    }
})

// @desc    Get Users
// @route   GET api/users/me
// @access  private
const getMe = asyncHandler(async (req, res) => {
    const user = await User.find()
    res.status(200).json(user)
  })

// @desc    Update Users
// @route   PUT api/users
// @access  private
const updateUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    } else{
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).json(updateUser)
    }
  })

// @desc    Delete Users
// @route   DELETE api/users
// @access  private
const deleteUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found')
    } else{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedUser)
    }
  })


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}



module.exports = {
    updateUsers,
    deleteUsers,
    registerUser,
    loginUser,
    getMe
}