const MedicalRecordsModel = require('../Models/MedicalRecordsModel');
const AppointmentModel = require('../Models/AppointmentModel');

class MedicalRecordsController {
    async store(req, res) {
        MedicalRecordsModel.create(req.body, (err, newProd) => {
            if (err) {
                console.log(err);
            } else {
                console.log(newProd);
            }
        });
        return res.status(200).json({ message: "Prontuário criado com Sucesso!" });
    }
    async findAll(req, res) {
        //const { email, password } = req.body
        const medicalRecords = await MedicalRecordsModel.find();
        if (medicalRecords.length === 0) {
            return res.status(404).json({ message: 'Dados Incorretos' });
        }

        return res.status(200).json(medicalRecords);
    }

    async findById(req, res) {
        const { id } = req.params
        
        // Encontrar o paciente pelo ID:
        //const patientById = await MedicalRecordsModel.findById(id)
        //if(patientById.length == 0) return res.status(404).json({ message: "Paciente não encontrado" });
        
        // Listar todos os agendamentos do paciente
        const medicalRecordsByPatientId = await MedicalRecordsModel.find({ patientId: id })
        if(medicalRecordsByPatientId.length == 0) return res.status(404).json({ message: "Não foram encontradas consultas agendadas para esta paciente" });

        return res.status(200).json(medicalRecordsByPatientId);
    }
    /*async show(req, res) {
        const { id } = req.params;
        const patient = await MedicalRecordsModel.findById(id);

        if (!patient) {
            return res.status(404).json({ message: "Paciente não existe" });
        }
        return res.status(200).json(patient);

    }*/
    async update(req, res) {
        try {
            const { id } = req.params;

            await MedicalRecordsModel.findByIdAndUpdate(id, req.body)
            return res.status(200).json({ message: "Produto Atualizado" });

        } catch (error) {
            return res.status(404).json({ message: "Produto não existe" });
        }
    }
    async delete (req, res) {
        try {
            const { id } = req.params;
            const productDelete = await MedicalRecordsModel.findByIdAndDelete(id);
            if (!productDelete) {
                return res.status(404).json({ message: "Produto não existe" });
            }
            return res.status(200).json({ message: "Produto Deletado!" });

        } catch (error) {
            return res.status(404).json({ message: "Produto não existe" });
        }
    }
}
module.exports = new MedicalRecordsController();