const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  patientName: String,
  email: String,
  birthday: Date,
  phone: String,
  address: String,
  cpf: String,
  rg:String,
  medicalInsurance: String
});

const PatientModel = mongoose.model('patient', PatientSchema);

module.exports = PatientModel;