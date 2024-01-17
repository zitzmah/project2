//DEPENDENCIES
const express = require("express")
const router = express.Router()

const patientController = require("../controllers/patient")

//ROUTES
router.get("/", patientController.index)
router.get("/new", patientController.newForm)
router.delete("/:id", patientController.destroy)
router.put("/:id", patientController.update)
router.post("/", patientController.create)
router.get("/:id/edit", patientController.edit)
router.get("/seed", patientController.seed)
router.get("/:id", patientController.show)

module.exports = router