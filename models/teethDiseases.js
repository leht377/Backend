const mongoose = require('mongoose');

const teethDiseasesSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  precioDeTratamiento: { type: Number, require: true },
});

const TeethDiseases = mongoose.model('TeethDiseases', teethDiseasesSchema);
module.exports = TeethDiseases;
