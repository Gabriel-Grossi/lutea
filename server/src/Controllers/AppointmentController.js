const AppointmentModel = require('../Models/AppointmentModel');

class AppointmentController {
    async store(req, res) {
        AppointmentModel.create(req.body, (err, newAppointment) => {
            if (err) {
                console.log(err)
                return res.status(401).json({ message: err });
            } else {
                console.log(newAppointment)
                //console.log(req.body)
                return res.status(200).json({ message: "Consulta Agendada com Sucesso!" });
            }
        })

    }
    async findAll(req, res) {
        const users = await AppointmentModel.find();
        return res.status(200).json(users);
    }
    async findByType(req, res) {
        const { type } = req.params;
        const appointmentByType = await AppointmentModel.find({ type: type });

        return res.status(200).json(appointmentByType);
    }
    /*async indexByPatientId(req, res) {
        const { patientId } = req.params;
        const users = await AppointmentModel.find({ type: type });

        return res.status(200).json(users);
    }*/
    async listCurrentDayAppointments(req, res) {
        try {
            const currentDay = new Date()
            const currentDayAppointments = await AppointmentModel.find({
                dateTime: {
                    $gte: new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()),
                    $lt: new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1),
                },
            });
            if (currentDayAppointments.length == 0) {
                return res.status(404).json({ message: 'Não foram encontradas consultas para o dia de hoje' });
            }
            else {
                return res.status(200).json(currentDayAppointments);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar consultas.');
        }
    }
    async listAppointmentsFromThirtyDays(req, res) {
        try {
            const hoje = new Date();
            const appointmentsFromThirtyDays = await AppointmentModel.find({
                dateTime: {
                    $gte: new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate()),
                    $lt: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
                },
            });
            if (appointmentsFromThirtyDays.length == 0) {
                return res.status(404).json({ message: 'Não foram encontradas consultas para os últimos 30 dias' });
            }
            else {
                return res.status(200).json(appointmentsFromThirtyDays);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar consultas.');
        }
    }
    async listAppointmentsFromSixMonths(req, res) {
        try {
            const hoje = new Date();
            const appointmentsFromSixMonths = await AppointmentModel.find({
                dateTime: {
                    $gte: new Date(hoje.getFullYear(), hoje.getMonth() - 6, hoje.getDate()),
                    $lt: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
                },
            });
            if (appointmentsFromSixMonths.length == 0) {
                return res.status(404).json({ message: 'Não foram encontradas consultas para os últimos 6 meses' });
            }
            else {
                return res.status(200).json(appointmentsFromSixMonths);
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar consultas.');
        }
    }
    async listAppointmentsFromTwelveMonths(req, res) {
        //try {
        const hoje = new Date();
        const consultas = await AppointmentModel.find({
            dateTime: {
                $gte: new Date(hoje.getFullYear() - 1, hoje.getMonth(), hoje.getDate()),
                $lt: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()),
            },
        });

        /*} catch (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar consultas.');
        }*/
        return res.json(consultas);
    }

    async findById(req, res) {
        const { id } = req.params;
        const users = await AppointmentModel.findById(id);
        if (users.length == 0) {
            return res.status(404).json({ message: "Não foram encontradas consultas com esse ID" });
        }
        else {
            //return res.status(200).json(users);
        }
    }
    async reschedule(req, res) {
        const { dateTime, doctor, type, patientName, newDateTime, newDoctor, newType } = req.body;
        const isCanceled = false
        try {
            const appointment = await AppointmentModel.findOneAndUpdate(
                {
                    "dateTime": new Date(dateTime),
                    "patientName": patientName,
                    "type": type,
                    "doctor": doctor,
                },
                {
                    "dateTime": new Date(newDateTime),
                    "doctor": newDoctor,
                    "type": newType,
                    //"isCanceled": isCanceled
                },
                {
                    upsert: false
                }
            )
            //console.log(req.body)

            if (!appointment) {
                return res.status(404).json({ message: 'Consulta não encontrada. ' });
            } else {
                return res.status(200).json({ message: 'Consulta alterada com sucesso' })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Erro ao atualizar o Consulta.' });
        }

    }
    async cancel(req, res) {
        //const { id } = req.params;
        const { dateTime, patientName, doctor, type } = req.body;

        try {
            const appointment = await AppointmentModel.findOneAndUpdate(
                {
                    "dateTime": dateTime,
                    "patientName": patientName,
                    "type": type,
                    "doctor": doctor,
                },
                {
                    "isCanceled": true
                },
                { upsert: false }
            );

            if (!appointment) {
                return res.status(404).json({ message: 'Consulta não encontrada.' });
            }
            else {
                return res.status(200).json({ message: 'Consulta cancelada com sucesso!' });
            }

        } catch (err) {
            //console.log(err);
            return res.status(500).json({ message: 'Erro ao atualizar o Consulta.' });
        }
    }


    async delete(req, res) {
        try {
            const { id } = req.params;
            const userDelete = await AppointmentModel.findByIdAndDelete(id);
            if (!userDelete) {
                return res.status(500).json({ message: "Usuário não existe" });
            }
            return res.status(200).json({ message: "Usuário Deletado!" });

        } catch (error) {
            return res.status(500).json({ message: "Usuário não existe" });
        }
    }
}
module.exports = new AppointmentController();