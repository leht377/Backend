const Patient = require('../models/patient');
const MedicalHistory = require('../models/medicalHistory');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://equipo2bdmongo:mongodb2027@cluster0.waoc7.mongodb.net/Odontologia-app?retryWrites=true&w=majority'
  )
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

async function deleteAll() {
  const promisePatient = Patient.deleteMany({});
  const promiseMedicalHistory = MedicalHistory.deleteMany({});
  Promise.all([promisePatient, promiseMedicalHistory])
    .then((response) => {
      console.log('eliminado: ' + response);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log(error);
      mongoose.connection.close();
    });
}

deleteAll();
