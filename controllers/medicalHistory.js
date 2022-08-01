const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const medicalHistoryRouter = require('express').Router();
const MedicalHistory = require('../models/medicalHistory');
const Patient = require('../models/patient');

medicalHistoryRouter.get('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const medicalHistories = await MedicalHistory.find({});

  response.json(medicalHistories);
});

medicalHistoryRouter.get('/:idPatient', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const medicalHistories = await MedicalHistory.find({
    patient: request.params.idPatient,
  });

  response.json(medicalHistories);
});

medicalHistoryRouter.post('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const medicalHistory = new MedicalHistory({
    Derecha_sup: request.body.Derecha_sup,
    Derecha_inf: request.body.Derecha_inf,
    Izquierda_sup: request.body.Izquierda_sup,
    Izquierda_inf: request.body.Izquierda_inf,
    patient: request.body.patient,
  });

  await medicalHistory.save({
    validateModifiedOnly: true,
  });

  response.json(medicalHistories);
});
