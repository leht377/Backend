const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const patientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minlength: 3,
  },

  edad: {
    type: String,
    minlength: 1,
  },
  cedula: {
    type: String,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    minlenght: 11,
    required: true,
  },

  medicalHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalHistory',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

patientSchema.plugin(uniquevalidator);
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
