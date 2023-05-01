import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { SecretaryFloatingMenu } from "../../components/SecretaryFloatingMenu";
import { api } from "../../lib/axios";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const availableAppointmentTypes = [
    {
        value: 'exm',
        label: 'Exames de rotina'
    },
    {
        value: 'cir',
        label: 'Pós-Cirúrgico'
    },
    {
        value: 'pos',
        label: 'Pós-Parto'
    },
    {
        value: 'pre',
        label: 'Pré-Natal'
    },
    {
        value: 'rot',
        label: 'Rotina'
    },
]

const doctorsList = [
    {
        value: "#",
        label: "Selecione um valor"
    },
    {
        value: "Dra. Luiza Bueno",
        label: "Dra. Luiza Bueno"
    },
    {
        value: "Dra. Silvia Bueno",
        label: "Dra. Silvia Bueno",
    }
]

export function RescheduleAppointment() {
    const [patientName, setPatientName] = useState('')
    const [dateTime, setDateTime] = useState()
    const [doctor, setDoctor] = useState('')
    const [type, setAppointmentType] = useState("")
    const [newDateTime, setNewDateTime] = useState('')
    const [newDoctor, setNewDoctor] = useState('')
    const [newType, setNewAppointmentType] = useState("")

    async function reschedule(event) {
        event.preventDefault()
        try {
            await api.put('/appointment/reschedule', {
                patientName,
                dateTime,
                doctor,
                type,
                newDateTime,
                newDoctor,
                newType
            }).then((response) => {
                setPatientName('')
                setDateTime()
                setDoctor('')
                setAppointmentType('')
                setNewDateTime('')
                setNewDoctor('')
                setNewAppointmentType('')
                toast.success('Consulta reagendada');
            })
        }
        catch (e) {
            toast.error('Erro ao reagendar');
            toast.error(`${e}`);
        }
    }
    return (
        <>
            <Helmet>
                <title>Reagendar Consulta | Lutea</title>
            </Helmet>
            <main className="px-16 py-6">
                <Header/>
                <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                    <h1 className="font-bold text-pink-600 text-4xl">Reagendar Consulta</h1>
                    <span className="text-gray-500">Preencha os campos a seguir para reagendar consulta.</span>
                </div>
                <form onSubmit={reschedule}>
                    <section className="grid gap-4 py-12 ">
                        <section className="grid grid-cols-22 w-full  gap-8 pr-8">
                            <div className="grid">
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="patientName">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="patientName"
                                    className="outline outline-1 outline-pink-200 py-2 px-4 rounded-sm"
                                    placeholder="Ex: Maria da Silva"
                                    value={patientName}
                                    onChange={event => setPatientName(event.target.value)}
                                    required
                                />
                            </div>
                        </section>
                        <h2 className="font-semibold text-xl py-5 text-pink-700 before:content-[''] before:absolute before:h-8 before:w-[.125rem] before:bg-pink-700 before:-ml-3 ">Agendamento Inicial</h2>
                        <section className="grid grid-cols-22 w-full  gap-8 pr-8">
                            <div className="grid" >
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="scheduleDateTime">Data e Hora</label>
                                <input
                                    className="outline outline-1 outline-pink-200 px-4 w-full py-2 text-gray-500 rounded-sm"
                                    name="scheduleDateTime"
                                    placeholder="dd/mm/aaaa hh:mm"
                                    title="scheduleDateTime"
                                    id="scheduleDateTime"
                                    type="datetime-local"
                                    value={dateTime}
                                    onChange={(event) => setDateTime(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid">
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="scheduleDateTime">
                                    Doutor(a)
                                </label>
                                <Select
                                    isClearable={false}
                                    className="focus:ring-1 focus:ring-pink-700"
                                    classNamePrefix="select"
                                    defaultValue='Selecione o(a) doutor(a)'
                                    name="doctor"
                                    placeholder="Selecione o(a) doutor(a)"
                                    options={doctorsList}
                                    onChange={(doctor) => setDoctor(doctor.value)}
                                >
                                </Select>
                            </div>
                            <div className="grid">
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="appointmentTypes">
                                    Tipo de Consulta
                                </label>
                                <Select
                                    isClearable={false}
                                    className="focus:ring-1 focus:ring-pink-700 text-sm"
                                    classNamePrefix="select"
                                    defaultValue='Selecione o tipo de consulta'
                                    name="type"
                                    placeholder="Selecione o tipo de consulta"
                                    options={availableAppointmentTypes}
                                    onChange={(type) => setAppointmentType(type.value)}
                                >
                                </Select>
                            </div>
                        </section>
                        <h2 className="font-semibold text-xl py-5 text-pink-700 before:content-[''] before:absolute before:h-8 before:w-[.125rem] before:bg-pink-700 before:-ml-3 ">Novo Agendamento</h2>
                        <section className="grid grid-cols-22 w-full  gap-8 pr-8">
                            <div className="grid" >
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="scheduleDateTime">Data e Hora</label>
                                <input
                                    className="outline outline-1 outline-pink-200 px-4 w-full py-2 text-gray-500 rounded-sm"
                                    name="scheduleDateTime"
                                    placeholder="dd/mm/aaaa hh:mm"
                                    title="scheduleDateTime"
                                    id="scheduleDateTime"
                                    type="datetime-local"
                                    value={newDateTime}
                                    onChange={(event) => setNewDateTime(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid">
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="scheduleDateTime">
                                    Doutor(a)
                                </label>
                                <Select
                                    isClearable={false}
                                    className="focus:ring-1 focus:ring-pink-700"
                                    classNamePrefix="select"
                                    defaultValue='Selecione o(a) doutor(a)'
                                    name="doctor"
                                    placeholder="Selecione o(a) doutor(a)"
                                    options={doctorsList}
                                    onChange={(doctor) => setNewDoctor(doctor.value)}
                                >
                                </Select>
                            </div>
                            <div className="grid">
                                <label
                                    className="font-medium pb-2"
                                    htmlFor="appointmentTypes">
                                    Tipo de Consulta
                                </label>
                                <Select
                                    isClearable={false}
                                    className="focus:ring-1 focus:ring-pink-700 text-sm"
                                    classNamePrefix="select"
                                    defaultValue='Selecione o tipo de consulta'
                                    name="type"
                                    placeholder="Selecione o tipo de consulta"
                                    options={availableAppointmentTypes}
                                    onChange={(type) => setNewAppointmentType(type.value)}
                                >
                                </Select>
                            </div>
                        </section>
                    </section>
                    <div className="flex gap-4 py-8">
                        <button
                            type="submit"
                            className="bg-pink-700 px-4 py-2 font-medium text-white rounded w-max">
                            Reagendar Consulta
                        </button>
                        <button
                            type="reset"
                            className="outline outline-1 outline-pink-700 px-4 py-2 font-medium text-pink-700 rounded w-max">
                            Limpar
                        </button>
                    </div>
                </form>
            </main>
            <SecretaryFloatingMenu/>
            <ToastContainer/>
        </>
    )
}