// Dependencies
require("dotenv").config()
require("./config/db") //
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const patientRouter = require("./routes/patients")
//const mongoose = require("mongoose")

const app = express()

// get .env variables
const {DATABASE_URL, SECRET, PORT} = process.env
const seedData = require("./models/seed")
const Patient = require("./models/Patient")

// database connection
// mongoose.connect(DATABASE_URL)

// mongoose.connection
// .on("open", () => console.log("Connected to Mongoose"))
// .on("close", () => console.log("Disconnected from Mongoose"))
// .on("error", (error) => console.log(error))

// CREATE PATIENT MODEL
// const {Schema, model} = mongoose;

// const patientSchema = new Schema ({
//     name: String,
//     dateOfBirth: Date,
//     test: String,
//     testCompleted: Boolean
// })

//MODEL
// const Patient = model("Patient", patientSchema)

// create app object
// const app = express()

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

app.use("/", patientRouter)


//ROUTES

// //SEED ROUTE
// app.get("/seed", async (req, res)=>{
//     try{
//         const starterPatients =[
//             {
//                 name: "Alice Johnson",
//                 test: "blood culture",
//                 testCompleted: false,
//                 dateOfBirth: new Date("1995-03-12")
//             },
//             {
//                 name: "Bob Smith",
//                 test: "blood culture",
//                 testCompleted: false,
//                 dateOfBirth: new Date("1980-07-22")
//             },
//             {
//                 name: "Charlie Brown",
//                 test: "respiratory culture",
//                 testCompleted: false,
//                 dateOfBirth: new Date("1992-11-05")
//             }]
//             await Patient.deleteMany({})
//             const patients = await Patient.create(starterPatients)
//             res.redirect("/")
//     } catch(error){
//         console.log(error.message)
//         res.send("There was an error read logs for error details")
//     }
// })

// //INDEX
// app.get("/", async (req, res)=>{
//     try{
//         const patients = await Patient.find({})
//         res.render("patients/index.ejs", {patients})
//     } catch(error){
//         console.log(error.message)
//         res.status(400).send("error, read logs for details")
//     }
// })

// //NEW
// app.get("/new", (req, res)=>{
//     res.render("patients/new.ejs")
// })

// //DELETE
// app.delete("/:id", async(req, res)=>{
//     const id = req.params.id
//     await Patient.findByIdAndDelete(id)
//     res.redirect("/")
// })

// //UPDATE
// app.put("/:id", async (req, res)=>{
//     const id = req.params.id
//     const updatedPatient = {
//         $set: {
//             gramStain: req.body.gramStain,
//             bacteriaIdentification: req.body.bacteriaIdentification
//         },
//         $push: {
//             plates: req.body.newPlate,
//             colonyDescription: req.body.newColonyDescription
//         },
//     }
//     if (req.body.bacteriaIdentification) {
//         updatedPatient.$set.testCompleted = true;
//     }
//     console.log(req.body)
//     try{
//         await Patient.findByIdAndUpdate(id, updatedPatient)
//         res.redirect("/")
//     }catch(error){
//         console.log(error.message)
//         res.status(400).send("error, read logs for details")
//     }
    
// })

// //CREATE
// app.post("/", async(req, res)=>{
//     try{
//         await Patient.create(req.body)
//         res.redirect("/")
//     } catch(error){
//         console.log(error.message)
//         res.status(400).send("error, read logs for details")
//     }
// })

// //EDIT
// app.get("/:id/edit", async (req, res)=>{
//     try{
//         const id = req.params.id
//         const patient = await Patient.findById(id)
//         res.render("patients/edit.ejs", { patient })
//     } catch(error){
//         console.log(error.message)
//         res.status(400).send("error, read logs for details")
//     }
// })

// //SHOW
// app.get("/:id", async (req, res)=>{
//     try{
//         const id = req.params.id
//         const patient = await Patient.findById(id)
//         res.render("patients/show.ejs", { patient })
//     } catch(error){
//         console.log(error.message)
//         res.status(400).send("error, read logs for details")
//     }
// })

// turn on the server (the listener)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
