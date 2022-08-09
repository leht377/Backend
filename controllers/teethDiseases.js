const TeethDiseases = require('../models/teethDiseases');
const teethDiseasesRouter = require('express').Router();

teethDiseasesRouter.get('/', async (req, res) => {
  const teethDiseases = await TeethDiseases.find({});
  res.json(teethDiseases);
});

teethDiseasesRouter.post('/', async (req, res) => {
  const teethDiseases = new TeethDiseases({
    nombre: req.body.nombre,
    precioDeTratamiento: req.body.precioDeTratamiento,
  });

  const teethDiseasesSaved = await teethDiseases.save();

  res.json(teethDiseasesSaved);
});

module.exports = teethDiseasesRouter;
