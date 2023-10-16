const mongoose = require('mongoose');

// Define the user schema
const dataSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true,"Please enter a label"],
    unique: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

// Create the Data model
const Data = mongoose.model('Datas', dataSchema);

module.exports = Data;