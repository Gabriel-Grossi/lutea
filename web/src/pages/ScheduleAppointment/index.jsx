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

export function ScheduleAppointment() {
    const [patientName, setPatientName] = useState('')
    const [dateTime, setDateTime] = useState()
    const [doctor, setDoctor] = useState("")
    const [type, setAppointmentType] = useState("")


    //const dateTimeAsISO = new Date(scheduleDateTime).toISOString()
    async function schedule(event) {
        event.preventDefault()
        if (doctor == '' || patientName == '') {
            return 'Algo deu errado';
        }
        try {
            await api.post('/appointment', {
                patientName,
                dateTime,
                doctor,
                type
            }).then(() => {
                setPatientName('')
                setDateTime()
                setDoctor('')
                setAppointmentType('')
                toast.success('Agendamento realizado');
            })
        }
        catch (e) {
            toast.error('Erro ao agendar');
            toast.error(`${e}`);
        }

    }
    return (
        <>
            <Helmet>
                <title>Agendar Consulta | Lutea</title>
            </Helmet>
            <main className="px-16 py-6">
                <Header />
                <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                    <h1 className="font-bold text-pink-600 text-4xl">Agendar Consulta</h1>
                    <span className="text-gray-500">Preencha os campos a seguir para agendar consulta.</span>
                </div>
                <form onSubmit={schedule}>
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
                        {
                            /*
                            <section className="w-1/4 flex flex-col gap-6 justify-center">
                                <h4 className="font-semibold">Tipos de Consulta</h4>
                                <div className="grid w-full gap-2 items-center" >
                                    {
                                        availableAppointmentTypes.map((appointmentType, index) => {
                                            return (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        className="h-6 w-6 rounded-lg flex text-teal-500 items-center justify-center accent-pink-700 border-2 border-pink-700 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-pink-700"
                                                        value={appointmentType.typeValue}
                                                        title={appointmentType.typeName}
                                                        key={appointmentType.typeValue}
                                                        //checked={appointmentType.includes(index)}
                                                        onChange={() => handleToggleAppointmentType(appointmentType.typeName)}
                                                        required
                                                    />
                                                    <label htmlFor={appointmentType.typeValue}>
                                                        {appointmentType.typeName}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </section>
                            
                            */
                        }
                    </section>
                    <div className="flex gap-4 py-8">
                        <button
                            type="submit"
                            className="bg-pink-700 px-4 py-2 font-medium text-white rounded w-max">
                            Agendar Consulta
                        </button>
                        <button
                            type="reset"
                            className="outline outline-1 outline-pink-700 px-4 py-2 font-medium text-pink-700 rounded w-max">
                            Limpar
                        </button>
                    </div>
                </form>
            </main>
            <SecretaryFloatingMenu />
            <ToastContainer />
        </>
    )
}