const express = require("express")
const app = express()
const cors= require("cors")
const mongoose = require("mongoose")
const {MONGOURI} = require("./utils/confing")
const {tokenExtractor} = require("./utils/middlewares")
require("express-async-errors")



mongoose.connect(MONGOURI).then(()=>{console.log("Mongo esta corriendo")}).catch((error)=>{console.log(error)})
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

const userRouter = require("./controllers/users")
app.use("/api/user", userRouter)

const patientRouter = require("./controllers/patient")
app.use("/api/patient",patientRouter )

const loginRouter = require ("./controllers/login")
app.use("/api/login", loginRouter)


module.exports = app





