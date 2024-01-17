//DEPENDENCIES
const mongoose = require("mongoose")

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection.on("connected", () => console.log("Connected to Mongoose"))
mongoose.connection.on("disconnected", () => console.log("Disconnected from Mongoose"))
mongoose.connection.on("error", (error) => console.log(error))