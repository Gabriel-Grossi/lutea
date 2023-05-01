const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  patientId:{
    type: String,
    required: true
  } 
});

const MedicalRecordsModel = mongoose.model('medicalrecords', MedicalRecordSchema);

module.exports = MedicalRecordsModel;