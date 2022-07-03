const express = require("express")
const app = express()
const cors= require("cors")
const mongoose = require("mongoose")
const {MONGOURI} = require("./utils/confing")
require("express-async-errors")


//get read
//update = put atualizar
//delete eliminar
//post crear
//(()=>{}) funcion flecha
mongoose.connect(MONGOURI).then(()=>{console.log("Mongo esta corriendo")}).catch((error)=>{console.log(error)})
app.use(cors())
app.use(express.json())

const userRouter = require("./controllers/users")
app.use("/api/user", userRouter)

const directorioRouter = require("./controllers/directorio")
app.use("/api/director", directorioRouter)

const loginRouter = require ("./controllers/login")
app.use("/api/login", loginRouter)

//modulo.exprots es porta una variable un objeto o una funcion 
//para que pueda ser utilizado en cualquier parte de nuestro codigo 
module.exports = app





