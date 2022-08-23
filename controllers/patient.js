const jwt = require('jsonwebtoken');
const MedicalHistory = require('../models/medicalHistory');
const patientRouter = require('express').Router();
const Patient = require('../models/patient');

patientRouter.get('/:id', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  let Patients;

  //BUSCAR POR CEDULA
  Patients = await Patient.find({
    cedula: request.params.id,
    user: decodeToken.id,
  });

  if (JSON.stringify(Patients) === '[]') {
    Patients = await Patient.find({
      _id: request.params.id,
      user: decodeToken.id,
    })
      .populate([
        {
          path: 'medicalHistory',
          populate: [{ path: 'Alergias', select: 'Nombre' }],
        },
      ])
      .populate('user', {
        name: 1,
        _id: 0,
      });
  }

  response.json(Patients);
});

patientRouter.get('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const Patients = await Patient.find({ user: decodeToken.id });
  response.json(Patients);
});

patientRouter.post('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const medicalHistory = new MedicalHistory({
    Derecha_sup: request.body.Derecha_sup,
    Derecha_inf: request.body.Derecha_inf,
    Izquierda_sup: request.body.Izquierda_sup,
    Izquierda_inf: request.body.Izquierda_inf,
    Alergias: request.body.alergias,
    precio_del_tratamiento: Number(request.body.precio),
  });

  console.log(medicalHistory);
  const { _id } = await medicalHistory.save({
    validateModifiedOnly: true,
  });

  const patinet = new Patient({
    nombre: request.body.nombre,
    edad: request.body.edad,
    cedula: request.body.cedula,
    number: request.body.number,
    user: decodeToken.id,
    medicalHistory: _id,
  });

  const patientSaved = await patinet.save();

  response.json(patientSaved).status(201);
});

/*
patientRouter.put("/:id", async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);
  const bodyPatient = request.body
  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: "Token perdido o Invalido" });
  }

  const Patient = {
    name: bodyPatient.name,
    number: bodyPatient.number,
    user: decodeToken.id
  };

  const {id} = await Patient.findByIdAndUpdate(request.params.id, Patient, {new: true})
  const PatientUpdated = await Patient.findById(id)
  response.json(PatientUpdated).status(200)


});

*/

module.exports = patientRouter;
