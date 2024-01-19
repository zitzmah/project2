// Dependencies
require("dotenv").config()
require("./config/db") //
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const patientRouter = require("./routes/patients")
const userRouter = require("./routes/user")
const session = require("express-session")
const MongoStore = require("connect-mongo")
//const mongoose = require("mongoose")

const app = express()

// get .env variables
const {DATABASE_URL, SECRET, PORT} = process.env
const seedData = require("./models/seed")
const Patient = require("./models/Patient")
const User = require("./models/User")

app.use((req, res, next)=>{
    req.model = {
        Patient,
        seedData
    }
    console.log("this is middleware")
    next()
})

//REGISTER MIDDLEWARE
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use("/public", express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitalized: true,
    resave: false,
}))

app.use("/", patientRouter)
app.use("/user", userRouter)

// turn on the server (the listener)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
