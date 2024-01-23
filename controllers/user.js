const bcrypt = require("bcrypt")
const User = require("../models/User.js")

module.exports = {
    signup,
    signupSubmit,
    login,
    loginSubmit,
    logout,
}
//ROUTES
//Signup page
async function signup(req, res){
    console.log("Rendering signup page");
    res.render("user/signup.ejs");
}

//Signup Submit Route
async function signupSubmit (req, res) {
    try{
        req.body.password = await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(10)
        )

        console.log("Hashed Password: ", req.body.password)

        await User.create(req.body)
        res.redirect("/user/login")
    }catch(error){
        console.log("---------", error.message, "-----------")
        res.status(400).send("error, read logs for details")
    }
}

//Login page Route
async function login(req, res){
    res.render("user/login.ejs")
}

//Login submit route
async function loginSubmit(req, res){
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username})

        if (!user){
            throw new Error("User Error: User doesn't exist")
        }
        const result = await bcrypt.compareSync(password, user.password)
        if(!result){
            throw new Error("User Error: Password Doesn't Match")
        }
        req.session.username = username
        req.session.loggedIn = true
        res.redirect("/")
    } catch(error){
        console.log("--------", error.message, "---------")
        res.status(400).send("error, read logs for details")
    }
}

//Logout route
async function logout(req, res){
    req.session.destroy((err)=>{
        res.redirect("/")
    })
}