import clsx from "clsx";
import { ArrowsCounterClockwise, CaretCircleDown, CaretCircleUp, FileX } from "phosphor-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SecretaryFloatingMenu } from "../../components/SecretaryFloatingMenu";
import { api } from "../../lib/axios";
import '../../main.css'
import { ThreeDots } from 'react-loader-spinner'

const appointmentTypeList = [
    {
        type: "Exames de Rotina",
        appointmentURL: '/ListAppointment/exm'
    },
    {
        type: "Pós-Cirúrgico",
        appointmentURL: '/ListAppointment/cir'
    },
    {
        type: "Pós-Parto",
        appointmentURL: '/ListAppointment/pos'
    },
    {
        type: "Pré-Natal",
        appointmentURL: '/ListAppointment/pre'
    },
    {
        type: "Rotina",
        appointmentURL: '/ListAppointment/rot'
    },
]

export function ListAppointmentByType() {
    const { type } = useParams()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [appointmentList, setAppointmentsList] = useState([])
    const [modal, setModal] = useState(false)

    const toggleModal = () => modal == false ? setModal(true) : setModal(false)

    async function getAllAppointmentsByType() {
        await api.get(`/appointment/${type}`)
            .then(
                (response) => {
                    setIsLoaded(true);
                    setAppointmentsList(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        getAllAppointmentsByType()
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
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
                    <title>Listar Consultas | Lutea</title>
                </Helmet>
                <main className="px-16 py-6">
                    <Header />
                    <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                        <h1 className="font-bold text-pink-700 text-4xl">
                            Listar Consultas | {
                                type != null
                                    ? type == "exm" ? "Exames de Rotina"
                                        : type == "cir" ? "Pós-Cirúrgico"
                                            : type == "pos" ? "Pós-Parto"
                                                : type == "pre" ? "Pré-Natal"
                                                    : type == "rot" ? "Rotina" : null : null
                            }</h1>
                        <span className="text-gray-500">Confira a seguir as consultas agendadas.</span>
                    </div>
                    <section className="flex gap-2 mb-8">
                        <Link
                            to={'/ListAppointment'}
                            className="border border-1 border-pink-700 px-4 py-2 rounded-md text-pink-700 font-medium hover:bg-pink-700 hover:text-white transition-colors"
                        >Todos os tipos</Link>
                        {
                            appointmentTypeList.map((appointmentType, acc) => (
                                <a
                                    href={`${appointmentType.appointmentURL}`}
                                    key={acc}
                                    className="border border-1 border-pink-700 px-4 py-2 rounded-md text-pink-700 font-medium hover:bg-pink-700 hover:text-white transition-colors"
                                >
                                    {appointmentType.type}
                                </a>

                            ))
                        }
                        <div className="absolute right-16">
                            <ArrowsCounterClockwise size={28} className="text-pink-700" onClick={getAllAppointmentsByType} />
                        </div>
                    </section>
                    <div className={
                        clsx({
                            "grid grid-cols-22 gap-4 mb-8": appointmentList.length >= 1,
                            "grid justify-center w-full pt-12 mb-8": appointmentList.length === 0
                        })
                    }
                    >
                        {
                            appointmentList.length >= 1 ?
                                appointmentList
                                    .sort((a, b) => { return a.patientName.localeCompare(b.patientName) })
                                    .map(appointment => (
                                        appointment.isCanceled == false
                                            ?
                                            <div
                                                className="border border-1 p-4 grid gap-3"
                                                key={appointment._id}
                                                onClick={toggleModal}
                                            >
                                                <span className="px-2 bg-pink-700 w-max rounded-lg text-white text-sm py-1">
                                                    {
                                                        appointment.type != null
                                                            ? appointment.type == "exm" ? "Exames de Rotina"
                                                                : type == "cir" ? "Pós-Cirúrgico"

                                                                    : appointment.type == "pos" ? "Pós-Parto"
                                                                        : appointment.type == "pre" ? "Pré-Natal"
                                                                            : appointment.type == "rot" ? "Rotina" : null : null
                                                    }
                                                </span>
                                                <div className="flex justify-between w-full">
                                                    <h3 className="font-bold text-pink-700 text-xl">{appointment.patientName != null ? appointment.patientName : null}</h3>
                                                    {
                                                        modal == true ? <CaretCircleUp className="text-pink-700" size={24} /> : <CaretCircleDown className="text-pink-700" size={24} />
                                                    }
                                                </div>
                                                <div>
                                                    {
                                                        modal == true && (appointment.doctor != null | undefined && appointment.dateTime != null | undefined) ?
                                                            <div className="grid">
                                                                <h5 className="text-sm font-medium">Informações do agendamento</h5>
                                                                <div className="grid pt-2 gap-1">

                                                                    <small>Médica(o): {appointment.doctor}</small>
                                                                    <small>Data do agendamento: {new Date(appointment.dateTime).toLocaleDateString()}</small>
                                                                    <small>Hórario do agendamento: {new Date(appointment.dateTime).toLocaleTimeString()}</small>
                                                                </div>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                            : null
                                    )) :
                                <div className="grid justify-items-center text-center w-full pt-12 gap-6">
                                    <FileX size={84} weight="light" className="text-pink-700" />
                                    <div>
                                        <h4 className="font-bold text-xl">Não há consultas agendadas com esse tipo.</h4>
                                        <span>Tente buscar por outro tipo. Caso o problema persista, contate o Suporte Lutea.</span>
                                    </div>
                                </div>
                        }
                    </div>
                </main>
                <SecretaryFloatingMenu />
            </>
        )
    }
}