import { ArrowClockwise, ArrowsCounterClockwise, CaretCircleDown, CaretCircleUp, Download, FileX } from "phosphor-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { SecretaryFloatingMenu } from "../../components/SecretaryFloatingMenu";
import { api } from "../../lib/axios";
import * as Tabs from '@radix-ui/react-tabs'

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

export function ListAppointment() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [appointmentList, setAppointmentsList] = useState([])
    const [modal, setModal] = useState(false)

    const toggleModal = () => modal == false ? setModal(true) : setModal(false)
    //Aguardar teste no Back-End
    const isDateAfterOrEqualsToday = (date) => { return new Date(date.toDateString()) >= new Date(new Date().toDateString()); }

    async function getAllAppointments() {
        await api.get('/appointment')
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
    }

    useEffect(() => {
        getAllAppointments()
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
                    <div className="2xl:py-20 xl:py-16 lg:py-8 py-16 gap-2 grid">
                        <h1 className="font-bold text-pink-700 text-4xl">Listar Consultas</h1>
                        <span className="text-gray-500">Confira a seguir as consultas agendadas.</span>
                    </div>
                    <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
                        <Tabs.List className="shrink-0 flex max-w-fit  pb-2 gap-2 " aria-label="Tipos de Consulta">
                            <Tabs.Trigger
                                className="bg-white px-3 h-11 text-pink-700 flex items-center justify-center text-sm leading-none select-none w-fit font-medium outline outline-1 outline-pink-100 hover:bg-pink-700 hover:text-white first:rounded-tl-md data-[state='active']:bg-pink-700 data-[state='active']:text-white " value="tab1">
                                Próximas Consultas
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className="bg-white px-3 h-11 text-pink-700 flex items-center justify-center text-sm leading-none select-none w-fit font-medium outline outline-1 outline-pink-100 hover:bg-pink-700 hover:text-white first:rounded-tl-md data-[state='active']:bg-pink-700 data-[state='active']:text-white " value="tab2">
                                Consultas Passadas
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className="bg-white px-3 h-11 text-pink-700 flex items-center justify-center text-sm leading-none select-none w-fit font-medium outline outline-1 outline-pink-100 hover:bg-pink-700 hover:text-white last:rounded-tr-md data-[state='active']:bg-pink-700 data-[state='active']:text-white " value="tab3">
                                Consultas Canceladas
                            </Tabs.Trigger>
                        </Tabs.List>
                        {
                            /*
                            <button className="absolute flex gap-2 right-16 border border-pink-700 p-2 rounded text-white text-sm bg-pink-700 hover:text-pink-700  transition-colors">
                                <Download size={18} />
                                Baixar consultas
                            </button>
                            
                            */
                        }
                        <Tabs.Content className="flex-grow bg-white rounded-b-md outline-none" value="tab1">
                            <section className="grid">
                                <span className="flex pt-2 text-sm text-gray-500">
                                    {
                                        `A busca retornou ${appointmentList.filter((appointment) => { return appointment.isCanceled == false && isDateAfterOrEqualsToday(new Date(appointment.dateTime)) }).length} agendamentos`
                                    }
                                </span>
                                <div className="flex py-5 gap-2">
                                    {/*<Link
                                        to={''}
                                        className="border border-1 bg-pink-700 border-pink-700 px-4 py-2 rounded-md text-white font-medium hover:bg-pink-600 hover:text-white transition-colors"
                                >Todos os tipos</Link>*/}
                                    {/*
                                        appointmentTypeList.map(appointmentType => (
                                            <Link
                                                to={appointmentType.appointmentURL}
                                                className="border border-1 border-pink-700 px-4 py-2 rounded-md text-pink-700 font-medium hover:bg-pink-700 hover:text-white transition-colors"
                                            >
                                                {appointmentType.type}
                                            </Link>

                                        ))*/
                                    }
                                    <div className="absolute right-16">
                                        <ArrowsCounterClockwise size={28} className="text-pink-700" onClick={getAllAppointments} />
                                    </div>
                                </div>
                            </section>
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
                                            .sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
                                            .map(appointment => (
                                                appointment.isCanceled == false && isDateAfterOrEqualsToday(new Date(appointment.dateTime))
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
                                                                                    : appointment.type == "cir" ? "Pós-Cirúrgico"
                                                                                        : appointment.type == "rot" ? "Rotina" : null : 'Sem tipo informado'
                                                                }
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    : null
                                            ))
                                    }
                                </tbody>

                            </table>
                            <div className="grid grid-cols-22 gap-4 mb-8">
                                {
                                    /*
                                    appointmentList
                                        .sort((a, b) => { return a.patientName.localeCompare(b.patientName) })
                                        .map(appointment => (
                                            appointment.isCanceled == false && isDateAfterOrEqualsToday(new Date(appointment.dateTime))
                                                ?
                                                <div
                                                    className="border border-1 p-4 grid gap-3"
                                                    key={appointment._id}
                                                    onClick={toggleModal}
                                                >
                                                    <span className="px-2 bg-pink-700 w-max rounded-lg text-white text-sm py-1 h-fit">
                                                        {
                                                            appointment.type != null
                                                                ? appointment.type == "exm" ? "Exames de Rotina"
                                                                    : appointment.type == "pos" ? "Pós-Parto"
                                                                        : appointment.type == "pre" ? "Pré-Natal"
                                                                            : appointment.type == "cir" ? "Pós-Cirúrgico"
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
                                                            modal == true && (appointment.doctor != null && appointment.dateTime != null) ?
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
                                        ))
                                        */
                                }
                            </div>
                        </Tabs.Content>
                        <Tabs.Content className="flex-grow bg-white rounded-b-md outline-none" value="tab2">
                            <section className="grid">
                                <span className="flex pt-2 text-sm text-gray-500">
                                    {
                                        `A busca retornou ${appointmentList.filter((appointment) => { return appointment.isCanceled == false && !isDateAfterOrEqualsToday(new Date(appointment.dateTime)) }).length} agendamentos`
                                    }
                                </span>
                                <div className="flex py-5 gap-2">
                                    <div className="absolute right-16">
                                        <ArrowsCounterClockwise size={28} className="text-pink-700" onClick={getAllAppointments} />
                                    </div>
                                </div>
                            </section>
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
                                            .sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
                                            .map(appointment => (
                                                appointment.isCanceled == false && !isDateAfterOrEqualsToday(new Date(appointment.dateTime))
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
                                                                                    : appointment.type == "cir" ? "Pós-Cirúrgico"
                                                                                        : appointment.type == "rot" ? "Rotina" : null : null
                                                                }
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                    : null
                                            )
                                            )
                                    }
                                </tbody>
                            </table>
                        </Tabs.Content>
                        <Tabs.Content className="flex-grow py-5 bg-white rounded-b-md outline-none" value="tab3">
                            <span className="flex pt-2 text-sm text-gray-500">
                                {
                                    `A busca retornou 
                                    ${appointmentList.filter((appointment) => appointment.isCanceled == true).length > 1 ?
                                        `${appointmentList.filter((appointment) => appointment.isCanceled == true).length} agendamentos` :
                                        `${appointmentList.filter((appointment) => appointment.isCanceled == true).length} agendamento`} `
                                }
                            </span>
                            <section className="flex gap-2 my-8">
                                <div className="grid">
                                    {
                                        appointmentList.find((appointment) => {
                                            return appointment.isCanceled == true
                                        }) == undefined ? (
                                            <div className="grid justify-items-center text-center w-full pt-12 gap-6">
                                                <FileX size={84} weight="light" className="text-pink-700" />
                                                <h4 className="font-bold text-2xl text-pink-700"> 'Não há consultas canceladas' </h4>

                                            </div>
                                        )
                                            : null

                                    }
                                    {
                                        appointmentList.find((appointment) => {
                                            return appointment.isCanceled == true
                                        }) == undefined ? <span className="text-md">'Contate o Suporte Lutea para que o incidente seja analisado.'</span> : null
                                    }
                                </div>
                                <div className="absolute right-16">
                                        <ArrowsCounterClockwise size={28} className="text-pink-700" onClick={getAllAppointments} />
                                    </div>
                            </section>
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
                                            .sort((a, b) => Date.parse(a.dateTime) - Date.parse(b.dateTime))
                                            .map(appointment => (
                                                appointment.isCanceled == true
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
                                                                                    : appointment.type == "cir" ? "Pós-Cirúrgico"
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
                        </Tabs.Content>
                    </Tabs.Root>
                </main >
                <SecretaryFloatingMenu />
            </>
        )
    }
}