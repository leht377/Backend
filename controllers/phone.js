const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const phoneRouter = require('express').Router();
const Phone = require('../models/phone');
const User = require('../models/user');

phoneRouter.get('/:id', async (request, response) => {});

phoneRouter.get('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const phones = await Phone.find({ user: decodeToken.id });
  response.json(phones);
});

phoneRouter.post('/', async (request, response) => {
  const bodyphone = request.body;
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const user = await User.findById(decodeToken.id);
  const phone = new Phone({
    name: bodyphone.name,
    number: bodyphone.number,
    user: user._id,
  });
  const { _id } = await phone.save();
  const phoneSaved = await Phone.findById(_id).populate('user', {
    userName: 1,
    name: 1,
  });
  user.phones = user.phones.concat(phoneSaved._id);
  await user.save({ validateModifiedOnly: true });
  response.status(201).json(phoneSaved);
});

phoneRouter.put('/', (request, respose) => {});

phoneRouter.delete('/', (request, response) => {});

module.exports = phoneRouter;
