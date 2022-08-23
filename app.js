const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGOURI } = require('./utils/confing');
const middlewares = require('./utils/middlewares');
//const morgan = require('morgan');
const path = require('path');

var bodyParser = require('body-parser');

require('express-async-errors');

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log('Mongo esta corriendo');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
//app.use(morgan('tiny'));
app.use(express.static('build'));
app.use(express.json());
app.use(middlewares.tokenExtractor);

const userRouter = require('./controllers/users');
app.use('/api/user', userRouter);

const patientRouter = require('./controllers/patient');
app.use('/api/patient', patientRouter);

const loginRouter = require('./controllers/login');
app.use('/api/login', loginRouter);

const teethDiseasesRouter = require('./controllers/teethDiseases');
app.use('/api/teethDiseases', teethDiseasesRouter);

const allergyRouter = require('./controllers/allergy');
app.use('/api/allergy', allergyRouter);

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = app;
