const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const session = require('express-session')
const passport = require('passport')
const OAuth2Streategy = require('passport-google-oauth2').Strategy
const User = require("./model/userModel")
const port = process.env.PORT || 3001
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET



// initializing app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // url encoded

// setup session
app.use(session({
    secret: "tasktrack1234",
    resave: false,
    saveUninitialized: true
}))

// cors origin
const corsOptions = {
    origin: 'https://tasktrack-backend-gjon.onrender.com', // Replace with your frontend URL
    credentials: true, // Allow credentials
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// setup passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2Streategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true,
        scope: ["profile", "email"]
    },
    async (accessToken,refreshToken,profile,done) => {
        // console.log("Profile... -> ", profile);
        try {

            console.log("profile.........", profile);
            // console.log("inside try --->>>>>>>>", );
            // let user = await User.findOne({googleId: profile.id})
            // console.log(profile);
            // // console.log("User ---->>>", user);
            // if(!user){
            //     const savedUser = await User.create({
            //         googleId: profile.id,
            //         name: profile.displayName,
            //         email: profile.emails[0].value,
            //         image: profile.photos[0].value,
            //         password: "1234" 
            //     })
            //     console.log("new User ->>>", savedUser);

            //     return done(null, user)
            // }  
        } catch (error) {
            console.log("error,--->>", error)
            return done(error, null)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})



// Initialize google auth login
app.get("/test", (req, res) => {
    res.status(200).json({"success": true})
})

app.get("/auth/google",
 (req, res, next) => {
    req.session = null
    next()
 },
 passport.authenticate("google", {scope:["profile", "email"], prompt: 'select_account'}))
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/tasks",
    failureRedirect: "http://localhost:3000/login",
}))

app.get("/login/success", async(req, res) => {
    console.log("req--------->>> ", req.user);
    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        req.session.destroy(() => {
            res.redirect("http://localhost:3000");
        })
    })
})




// connecting to database
connectDB()

// our own errorHAndler
app.use(errorHandler)

// calling routes
app.use('/api', require('./routes/mainRoute'))

 
app.listen(port, () => {
    console.log(`Server running at ${port}...`)
})