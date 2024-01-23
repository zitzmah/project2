//DEPENDENCIES
const mongoose = require("mongoose")

// CREATE PATIENT MODEL
// const {Schema, model} = mongoose;

const patientSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    dateOfBirth: Date,
    test: String,
    testCompleted: Boolean,
    gramStain: String,
    plates: String,
    colonyDescription: String,
    bacteriaIdentification: String,
    username: String
})


//MODEL
const Patient = mongoose.model("Patient", patientSchema)

//export model
module.exports = Patient