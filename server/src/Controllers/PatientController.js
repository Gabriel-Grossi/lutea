const PatientModel = require('../Models/PatientModel');
const AppointmentModel = require('../Models/AppointmentModel');
const MedicalRecordsModel = require('../Models/MedicalRecordsModel');

class PatientController {
    async store(req, res) {
        PatientModel.create(req.body, (err, newProd) => {
            if (err) {
                console.log(err);
            } else {
                console.log(newProd);
            }
        });
        return res.status(200).json({ message: "Paciente criado com Sucesso!" });

    }
    async findAll(req, res) {
        //const { email, password } = req.body
        const patient = await PatientModel.find();
        if (patient.length === 0) {
            return res.status(404).json({ message: 'Dados Incorretos' });
        }

        return res.status(200).json(patient);
    }

    async findById(req, res) {
        const { id } = req.params

        // Encontrar o paciente pelo ID:
        const patientById = await PatientModel.findById(id)
        if (patientById.length == 0) return res.status(404).json({ message: "Paciente não encontrado" });
        // Listar todos os agendamentos do paciente
        const appointmentByPatientId = await AppointmentModel.find({ patientName: patientById.patientName })
        //if (appointmentByPatientId.length == 0) return res.json({ message: "Não foram encontradas consultas agendadas para esta paciente" });
        // Listar todos os prontuários do paciente
        const medicalRecordsByPatientId = await MedicalRecordsModel.find({ patientId: patientById._id })
        //if (medicalRecordsByPatientId.length == 0) return res.json({ message: "Não foram encontrados prontuários criados para esta paciente" });

        return res.status(200).json(
            {
                patient: patientById,
                appointmentPerPatient: appointmentByPatientId,
                medicalRecordsPerPatient: medicalRecordsByPatientId
            }
        );
    }
    /*async show(req, res) {
        const { id } = req.params;
        const patient = await PatientModel.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Paciente não existe" });
        }
        return res.status(200).json(patient);

    }*/
    async update(req, res) {
        const { id } = req.params;
        const { patientName, email, birthday, phone, address, cpf, rg, medicalInsurance } = req.body;

        try {
            const patient = await PatientModel.findById(id);

            if (!patient) {
                return res.status(404).json({ message: 'Paciente nÃ£o encontrado. ' + id });
            }

            patient.patientName = patientName || patient.patientName;
            patient.email = email || patient.email;
            patient.birthday = birthday || patient.birthday;
            patient.phone = phone || patient.phone;
            patient.address = address || patient.address;
            patient.cpf = cpf || patient.cpf;
            patient.rg = rg || patient.rg;
            patient.medicalInsurance = medicalInsurance || patient.medicalInsurance;

            await patient.save();

            return res.json(patient);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Erro ao atualizar o paciente.' });
        }
    }
    async delete (req, res) {
        try {
            const { id } = req.params;
            const productDelete = await PatientModel.findByIdAndDelete(id);
            if (!productDelete) {
                return res.status(404).json({ message: "Produto não existe" });
            }
            return res.status(200).json({ message: "Produto Deletado!" });

        } catch (error) {
            return res.status(404).json({ message: "Produto não existe" });
        }
    }
}
module.exports = new PatientController();