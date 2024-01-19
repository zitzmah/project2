//DEPENDENCIES
const express = require("express")
const router = express.Router()

const userController = require("../controllers/user")

router.use((req, res, next)=>{
    if(req.session.loggedIn){
        next()
    }else {
        res.redirect("/user/login")
    }
})

//ROUTES
router.get("/signup", userController.signup)
router.post("/signup", userController.signupSubmit)
router.get("/login", userController.login)
router.post("/login", userController.loginSubmit)
router.get("/logout", userController.logout)

module.exports = router