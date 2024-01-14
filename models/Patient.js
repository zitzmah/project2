//DEPENDENCIES


// CREATE PATIENT MODEL
const {Schema, model} = mongoose;

const patientSchema = new Schema ({
    name: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    test: String,
    testCompleted: Boolean,
    gramStain: String,
    plates: {type: [String]},
    colonyDescription: {type: [String]},
    bacteriaIdentification: String
})


//MODEL
const Patient = model("Patient", patientSchema)

//export model
module.exports = Fruit