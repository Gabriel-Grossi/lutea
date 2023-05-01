const { Router } = require ('express');
const AppointmentController = require('./Controllers/AppointmentController');
const PatientController = require('./Controllers/PatientController');
const UsersController = require('./Controllers/UsersController');
const MedicalRecordsController = require('./Controllers/MedicalRecordsController');
const routes = Router();

/*routes.get('/teste', (req,res) =>{
    return res.status(200).json({message: "Server is ON..."});
})*/

// User Routes
routes.get('/user', UsersController.findByCredentials)
routes.post('/user', UsersController.authenticateWithCrenditials)
routes.post('/user/create', UsersController.store)
// Necessário testar
routes.patch('/user/:id/edit', UsersController.update)

// Patient Routes
routes.get('/patient', PatientController.findAll)
routes.get('/patient/:id', PatientController.findById)
routes.post('/patient', PatientController.store)
// Necessário testar
routes.patch('/patient/:id/edit', PatientController.update)

// Appointment Routes
routes.get('/appointment', AppointmentController.findAll)
routes.get('/appointment/:type', AppointmentController.findByType)
//routes.get('/appointment/:patientId', AppointmentController.show)
routes.get('/appointment/:patientId', AppointmentController.findById)
routes.get('/appointment_listByDay', AppointmentController.listCurrentDayAppointments)
routes.get('/appointment_listByMonth', AppointmentController.listAppointmentsFromThirtyDays)
routes.get('/appointment_listByLastSixMonths', AppointmentController.listAppointmentsFromSixMonths)
routes.get('/appointment_listByYear', AppointmentController.listAppointmentsFromTwelveMonths)
routes.post('/appointment', AppointmentController.store)

routes.put('/appointment/reschedule', AppointmentController.reschedule)
routes.patch('/appointment/cancel', AppointmentController.cancel)

// Medical Routes

routes.post('/medicalrecords', MedicalRecordsController.store)
routes.get('/medicalrecords/:id', MedicalRecordsController.findById)
// Necessário testar
routes.patch('/medicalrecords/:id/edit', MedicalRecordsController.update)

module.exports = routes;