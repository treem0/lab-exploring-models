const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  horsepower: {
    type: Number,
    required: true
  }
})
    ;
module.exports = mongoose.model('Car', schema);
