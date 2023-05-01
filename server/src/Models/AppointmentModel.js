const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const AppointmentSchema = new mongoose.Schema({
  id: {
    type: ObjectId
  },
  dateTime: {
    type: Date,

  },
  doctor: {
    type: String,

  },
  isCanceled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
  },
  patientName: {
    type: mongoose.Schema.Types.String,
    ref: 'Patient',
    //unique: false
  },
});

const Appointment = mongoose.model('appointments', AppointmentSchema);

module.exports = Appointment;
