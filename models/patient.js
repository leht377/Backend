const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const patientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minlength: 3,
    required: true,
  },

  edad: {
    type: Number,
    minlength: 1,
    maxlength: 2,
    required: true,
  },
  cedula: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minlenght: 11,
    required: true,
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
