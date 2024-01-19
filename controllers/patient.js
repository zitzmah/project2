//EXPORTS
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    seed,
    show,
}

//INDEX
async function index(req, res){
    try{
        let patients = await req.model.Patient.find({})
        res.render("patients/index.ejs", {patients: patients.reverse()})
    } catch(error){
        console.log(error.message)
        res.status(400).send("error, read logs for details")
    }
}

//NEW
async function newForm(req, res){
    res.render("patients/new.ejs")
}

//DELETE
async function destroy(req, res){
    try{
        let deletedPatient = await req.model.Patient.findByIdAndDelete(req.params.id)
        res.redirect("/")
    } catch (error) {
        res.status(400).send("error, read logs for details")
    }
}

//UPDATE
async function update(req, res){
    const id = req.params.id
    let updatedPatient = {
        // $set: {
        //     gramStain: req.body.gramStain,
        //     bacteriaIdentification: req.body.bacteriaIdentification
        // },
        // $push: {
        //     plates: req.body.newPlate,
        //     colonyDescription: req.body.newColonyDescription
        // },
    }
    // if (req.body.bacteriaIdentification) {
    //     updatedPatient.$set.testCompleted = true;
    // }
    if (req.body.testCompleted === "on"){
        req.body.testCompleted = true;
    } else{
        req.body.testCompleted = false;
    }
    console.log(req.body, req.params.id)
    try{
        updatedPatient = await req.model.Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
         res.redirect("/")
    }catch(error){
        console.log(error.message)
        res.status(400).send("error, read logs for details")
    } 
}

//CREATE
async function create(req, res){
    try{
        req.body.testCompleted = req.body.testCompleted === "on" ? true: false;
        req.body.username = req.session.username
        let newPatient = await req.model.Patient.create(req.body)
        res.redirect("/")
    } catch(error){
        console.log(error.message)
        res.status(400).send("error, read logs for details")
    }
}

//EDIT
async function edit(req, res){
    try{
        let foundPatient = await req.model.Patient.findById(req.params.id)
        res.render("patients/edit.ejs", { patient: foundPatient })
    } catch(error){
        console.log(error.message)
        res.status(400).send("error, read logs for details")
    }
}

//SEED ROUTE
async function seed(req, res){
    try{
        await req.model.Patient.deleteMany({})
        await req.model.Patient.create(
            req.model.seedData
        )
        res.redirect("/")
    } catch(error){
        console.log(error.message)
        res.send("There was an error read logs for error details")
    }
}

//SHOW
async function show(req, res){
    try{
        let foundPatient = await req.model.Patient.findById(req.params.id)
        res.render("patients/show.ejs", {patient: foundPatient})
    } catch(error){
        console.log(error.message)
        res.status(400).send("error, read logs for details")
    }
}