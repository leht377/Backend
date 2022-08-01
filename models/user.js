const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    minlenght: 3,
  },
  passwordHash: {
    type: String,
    minlenght: 3,
  },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
});

//plugin es mongoose sirve para añadirle una modalidad al esquema
usersSchema.plugin(uniquevalidator);
const User = mongoose.model('User', usersSchema);
module.exports = User;
