const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGOURI } = require('./utils/confing');
const { tokenExtractor } = require('./utils/middlewares');
const path = require('path');

require('express-async-errors');

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log('Mongo esta corriendo');
  })
  .catch((error) => {
    console.log(error);
  });
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(tokenExtractor);

const userRouter = require('./controllers/users');
app.use('/api/user', userRouter);

const patientRouter = require('./controllers/patient');
app.use('/api/patient', patientRouter);

const loginRouter = require('./controllers/login');
app.use('/api/login', loginRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
module.exports = app;
