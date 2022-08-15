
const Allergy = require("../models/allergy");
const { post } = require("./login");
const allergyRouter = require('express').Router();

allergyRouter.get("/", async (req,res)=>{
const allergies= await  Allergy.find({})
res.json(allergies)
});

allergyRouter.post("/", async (request,response)=>{

const allergy = new Allergy({
    Nombre: request.body.Nombre
});

const allergySaved = await allergy.save()
response.json(allergySaved)






});

module.exports = allergyRouter;