const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const session = require('express-session')
const passport = require('passport')
const OAuth2Streategy = require('passport-google-oauth2').Strategy
const cookieSession = require("cookie-session")
const User = require("./model/userModel")
const port = process.env.PORT || 3001
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET



// initializing app
const app = express()

// Middleware
app.use(cors({
    // origin: "https://tasktrack-backend-gjon.onrender.com",
    // methods: "GET, POST, PUT, DELETE",
    // credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // url encoded

// setup session
// app.use(session({
//     secret: "abhishek-gupta123",
//     resave: false,
//     saveUninitialized: true
// }))
app.use(
    cookieSession({
        name: "session",
        keys: ["trasktrackermernstack"],
        maxAge: 24*60*60*100,
    })
)

// cors origin
// const corsOptions = {
//     origin: 'https://tasktrack-backend-gjon.onrender.com', // Replace with your frontend URL
//     credentials: true, // Allow credentials
//     optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };

// app.use(cors(corsOptions));


// connecting to database
connectDB()


// our own errorHAndler
app.use(errorHandler)

// calling routes
app.use('/api', require('./routes/mainRoute'))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2Streategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: "https://tasktrack-backend-gjon.onrender.com/auth/google/callback",
        passReqToCallback: true,
        scope: ["profile", "email"]
    },
    async (accessToken,refreshToken,profile,done) => {
        return done(null, profile)
        // console.log("Profile... -> ", profile);
        // try {

        //     console.log("profile.........", profile);
        //     // console.log("inside try --->>>>>>>>", );
        //     // let user = await User.findOne({googleId: profile.id})
        //     // console.log(profile);
        //     // // console.log("User ---->>>", user);
        //     // if(!user){
        //     //     const savedUser = await User.create({
        //     //         googleId: profile.id,
        //     //         name: profile.displayName,
        //     //         email: profile.emails[0].value,
        //     //         image: profile.photos[0].value,
        //     //         password: "1234" 
        //     //     })
        //     //     console.log("new User ->>>", savedUser);

        //     //     
        //     // }  
        //     return done(null, profile)

        // } catch (error) {
        //     console.log("error,--->>", error)
        //     return done(error, null)
        // }
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
    successRedirect: "https://tasktrack-frontend.onrender.com/",
    failureRedirect: "https://tasktrack-frontend.onrender.com/login",
}))

app.get("/login/success", async(req, res) => {
    console.log("req--------->>> ", req.user);
    if(req.user){
        res.status(200).json({error:false, message:"user Login success",user:req.user})
    }else{
        res.status(403).json({error: true,message:"Not Authorized login failed"})
    }
})

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        req.session.destroy(() => {
            res.redirect("https://tasktrack-frontend.onrender.com");
        })
    })
})






 
app.listen(port, () => {
    console.log(`Server running at ${port}...`)
})