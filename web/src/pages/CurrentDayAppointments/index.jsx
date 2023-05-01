import { CaretCircleDown, CaretCircleUp, FileX } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { DoctorFloatingMenu } from "../../components/DoctorFloatingMenu";
import { Header } from "../../components/Header";

const appointmentTypeList = [
    {
        type: "Pré-Natal",
        appointmentURL: '/ListAppointment/pre'
    },
    {
        type: "Pós-Parto",
        appointmentURL: '/ListAppointment/pos'
    },
    {
        type: "Rotina",
        appointmentURL: '/ListAppointment/rot'
    },
    {
        type: "Exames de Rotina",
        appointmentURL: '/ListAppointment/exm'
    }
]

export function CurrentDayAppointments() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [appointmentList, setAppointmentsList] = useState([])
    const [modal, setModal] = useState(false)

    const toggleModal = () => modal == false ? setModal(true) : setModal(false)

    useEffect(() => {
        api.get('/appointment_listByDay')
            .then(
                (response) => {
                    setIsLoaded(true)
                    setAppointmentsList(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }

            )
    }, [])

    if (error) {
        return (
            <>
                <Helmet>
                    <title>Consultas do dia | Lutea</title>
                </Helmet>
                <main className="px-16 py-6">
                    <Header />
                    <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                        <h1 className="font-bold text-pink-700 text-4xl">Consultas do dia</h1>
                        <span className="text-gray-500">Confira a seguir as consultas agendadas.</span>
                    </div>
                    <div className="grid justify-items-center text-center w-full pt-12 gap-6">
                        <FileX size={84} weight="light" className="text-pink-700" />
                        <div className="grid">
                            <h4 className="font-bold text-2xl text-pink-700">Não há consultas agendadas para o dia de hoje.</h4>
                            <span className="text-md">Contate o Suporte Lutea para que o incidente seja analisado.</span>
                            <span className="text-sm">Erro: {error.message}.</span>
                        </div>
                    </div>
                </main>
                <DoctorFloatingMenu />
            </>
        )
    } else if (!isLoaded) {
        return (
            <div className="flex flex-col justify-center h-screen items-center">
                <ThreeDots
                    height="160"
                    width="160"
                    radius="9"
                    color="#be185d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
                <h2 className="font-semibold text-lg text-pink-700">Carregando...</h2>
            </div>
        )
    } else {
        return (
            <>
                <Helmet>
                    <title>Consultas do dia | Lutea</title>
                </Helmet>
                <main className="px-16 py-6">
                    <Header />
                    <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                        <h1 className="font-bold text-pink-700 text-4xl">Consultas do dia</h1>
                        <span className="text-gray-500">Confira a seguir as consultas agendadas.</span>
                    </div>

                    <table class="table-auto w-full overflow-x-visible">
                        <thead>
                            <tr>
                                <th className="text-justify text-sm">Nome do Paciente</th>
                                <th className="text-justify text-sm">Médico(a)</th>
                                <th className="text-justify text-sm">Data</th>
                                <th className="text-justify text-sm max-sm:hidden">Horário</th>
                                <th className="text-justify text-sm max-md:hidden">Tipo de Consulta</th>
                            </tr>
                        </thead>
                        <tbody className="table-row-group gap-4">
                            {
                                appointmentList
                                    .sort((a, b) => { return a.patientName.localeCompare(b.patientName) })
                                    .map(appointment => (
                                        appointment.isCanceled == false
                                            ?
                                            <tr className="my-16 table-row border-y hover:bg-pink-100 hover:text-pink-700" >
                                                <td className="pr-1 py-1 table-cell text-sm">{appointment.patientName != null ? appointment.patientName : null}</td>
                                                <td className="pr-1 py-1 table-cell text-xs">{appointment.doctor}</td>
                                                <td className="pr-1 py-1 table-cell text-xs">{new Date(appointment.dateTime).toLocaleDateString()}</td>
                                                <td className="pr-1 py-1 table-cell text-xs max-sm:hidden">{new Date(appointment.dateTime).toLocaleTimeString()}</td>
                                                <td className="pr-1 py-1 table-cell text-xs max-md:hidden">
                                                    <Link
                                                        to={`/ListAppointment/${appointment.type}`} className="bg-pink-700 rounded-lg text-white py-[.0375rem]  h-fit px-2">
                                                        {
                                                            appointment.type != null
                                                                ? appointment.type == "exm" ? "Exames de Rotina"
                                                                    : appointment.type == "pos" ? "Pós-Parto"
                                                                        : appointment.type == "pre" ? "Pré-Natal"
                                                                            : appointment.type == "rot" ? "Rotina" : null : null
                                                        }
                                                    </Link>
                                                </td>
                                            </tr>
                                            : null
                                    ))
                            }
                        </tbody>
                    </table>

                </main >
                <DoctorFloatingMenu />
            </>
        )
    }
}