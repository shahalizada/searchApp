const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  unID: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: Date.now,
  },
  nationality: {
    type: String,
    uppercase: true,
  },
  entryDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  process: {
    type: String,
  },
});

const Search = mongoose.model("Search", searchSchema);
module.exports = Search;
