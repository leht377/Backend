const mongoose = require('mongoose');


const allergySchema = new mongoose.Schema({
    
    Nombre:{type:String, required: true}
  
  });
  
  const Allergy = mongoose.model('Allergy', allergySchema);
  module.exports = Allergy;