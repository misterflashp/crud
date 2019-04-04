let mongoose = require('mongoose');

let itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    required: true
  }
}, {
  versionKey: false,
  strict: true
});
module.exports = mongoose.model('item', itemSchema);