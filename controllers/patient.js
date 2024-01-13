//DEPENDENCIES
const express = require("express")
const Patient = require("../models/Patient")

//ROUTER
const router = express.Router();

//MIDDLWARE

//ROUTES
//INDEX ROUTE GET
router.get("/", async(req, res)=>{
    let patients = await req.model.Patient.find({})
    res.render("index.ejs",{
        patients: patients.reverse()
    })
})