const  directorioRouter = require("express").Router()


directorioRouter.get("/", (request, response)=>{
    response.json({
      "mensaje":"este es el directorio"
    })
  
  })
  
  directorioRouter.post("/", (request, response)=>{
  
  })
  
  directorioRouter.put("/", (request, respose)=>{
  
  })
  
  directorioRouter.delete("/", (request, response)=>{
    
  })

  module.exports = directorioRouter 


