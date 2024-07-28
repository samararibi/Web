const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  requirements: [String],
  // Ajoutez d'autres champs selon vos besoins
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
