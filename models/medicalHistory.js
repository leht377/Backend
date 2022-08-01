const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const medicalHistorySchema = new mongoose.Schema({
  Derecha_sup: [
    {
      type: Object,
      required: true,
    },
  ],

  Derecha_inf: [
    {
      type: Object,
      required: true,
    },
  ],

  Izquierda_sup: [
    {
      type: Object,
      required: true,
    },
  ],

  Izquierda_inf: [
    {
      type: Object,
      required: true,
    },
  ],
});

medicalHistorySchema.plugin(uniquevalidator);
const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);
module.exports = MedicalHistory;
