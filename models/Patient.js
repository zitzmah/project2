//DEPENDENCIES


// CREATE PATIENT MODEL
const {Schema, model} = mongoose;

const patientSchema = new Schema ({
    name: String,
    dateOfBirth: Date,
    test: String,
    testCompleted: Boolean
})


//MODEL
const Patient = model("Patient", patientSchema)

//export model
module.exports = Fruit