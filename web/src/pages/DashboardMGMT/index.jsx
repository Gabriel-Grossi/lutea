import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header";
import { api } from "../../lib/axios";
import { ArrowsCounterClockwise, CalendarBlank, CalendarCheck, CalendarX, Percent } from "phosphor-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Tooltip } from 'recharts';
import * as Tabs from '@radix-ui/react-tabs'


export function ManagementDashboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //appointments
    const [appointmentList, setAppointmentsList] = useState([])
    const [appointmentCountToday, setAppointmentsCountToday] = useState([])
    const [appointmentMonthlyCount, setAppointmentsMonthlyCount] = useState([])
    const [appointmentSemesterCount, setAppointmentsSemesterCount] = useState([])
    const [appointmentYearlyCount, setAppointmentsYearlyCount] = useState([])
    const [appointmentGlobalCount, setAppointmentsGlobalCount] = useState([])
    const [modal, setModal] = useState(false)
    //patient
    const [patientList, setPatientList] = useState([])


    const toggleModal = () => modal == false ? setModal(true) : setModal(false)


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
        api.get('/appointment_listByDay')
            .then(
                (response) => {
                    setIsLoaded(true)
                    setAppointmentsCountToday(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }

            )
        api.get('/appointment_listByMonth')
            .then(
                (response) => {
                    setIsLoaded(true)
                    setAppointmentsMonthlyCount(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }

            )
        api.get('/appointment_listByLastSixMonths')
            .then(
                (response) => {
                    setIsLoaded(true)
                    setAppointmentsSemesterCount(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }

            )
        api.get('/appointment_listByYear')
            .then(
                (response) => {
                    setIsLoaded(true)
                    setAppointmentsYearlyCount(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }

            )
        api.get('/appointment')
            .then(
                (response) => {
                    setIsLoaded(true)
                    setAppointmentsGlobalCount(response.data)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        api.get('/patient').then(
            (response) => {
                setIsLoaded(true)
                setPatientList(response.data)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }

        )
    }, [])

    const appointmentsOverview = [
        {
            name: 'Geral',
            valor: appointmentGlobalCount.length,
            pv: 3000
        },
        {
            name: 'Ano',
            valor: appointmentYearlyCount.length,
            pv: 3000
        },
        {
            name: 'Semestre',
            valor: appointmentSemesterCount.length,
            pv: 2000
        },
        {
            name: 'Mês',
            valor: appointmentMonthlyCount.length,
            pv: 2000
        },
        {
            name: 'Hoje',
            valor: appointmentCountToday.length,
            pv: 2000
        }
    ]

    const patientOverview = [
        {
            name: '18-25',
            valor: patientList.filter((appointment) =>( new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() >= 18 && new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() <=24)).length,
            pv: 2000
        },
        {
            name: '26-33',
            valor: patientList.filter((appointment) => new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() >= 25 && new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() <=32).length,
            pv: 2000
        },
        {
            name: '34-41',
            valor: patientList.filter((appointment) => new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() >= 33 && new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() <=40).length,
            pv: 2000
        },
        {
            name: '42-49',
            valor: patientList.filter((appointment) => new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() >= 41 && new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() <=49).length,
            pv: 2000
        },
        {
            name: '50-59',
            valor: patientList.filter((appointment) => new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() >= 50 && new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() <=59).length,
            pv: 2000
        },
        {
            name: '60+',
            valor: patientList.filter((appointment) => new Date().getUTCFullYear() - new Date(appointment.birthday).getUTCFullYear() >= 60).length,
            pv: 2000
        }
    ]
    return (
        <>
            <Helmet>
                <title>Dashboard | Lutea</title>
            </Helmet>
            <main className="px-16 py-6">
                <Header />
                <div className="2xl:py-24 xl:py-16 lg:py-16 py-16 gap-2 grid">
                    <h1 className="font-bold text-pink-700 text-4xl">Dashboard</h1>
                    <span className="text-gray-500">Um visão dinâmica e otimizada de seu consultório.</span>
                    <div className="absolute right-16">
                        <ArrowsCounterClockwise size={28} className="text-pink-700" onClick={getAllAppointments} />
                    </div>
                </div>
                <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
                    <Tabs.List className="shrink-0 flex max-w-fit  pb-2 gap-2 " aria-label="Tipos de Consulta">
                        <Tabs.Trigger
                            className="bg-white px-3 h-11 text-pink-700 flex items-center justify-center text-sm leading-none select-none w-fit font-medium outline outline-1 outline-pink-100 hover:bg-pink-700 hover:text-white first:rounded-tl-md data-[state='active']:bg-pink-700 data-[state='active']:text-white " value="tab1">
                            Consultas
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            className="bg-white px-3 h-11 text-pink-700 flex items-center justify-center text-sm leading-none select-none w-fit font-medium outline outline-1 outline-pink-100 hover:bg-pink-700 hover:text-white first:rounded-tl-md data-[state='active']:bg-pink-700 data-[state='active']:text-white " value="tab2">
                            Pacientes
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            className="bg-white px-3 h-11 text-pink-700 flex items-center justify-center text-sm leading-none select-none w-fit font-medium outline outline-1 outline-pink-100 hover:bg-pink-700 hover:text-white last:rounded-tr-md data-[state='active']:bg-pink-700 data-[state='active']:text-white " value="tab3">
                            Usuários
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content className="flex-grow bg-white rounded-b-md outline-none" value="tab1">
                        <div className="flex-grow text-pink-800 bg-white shadow">
                            <main className="p-0 space-y-6">
                                <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    <div className="flex items-center p-6 bg-white shadow rounded-lg">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                            <CalendarCheck size={24} />
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold">{appointmentGlobalCount.length}</span>
                                            <small className="max-xl:text-sm text-xs text-gray-500">Total de consultas</small>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 bg-white shadow rounded-lg">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                                            <CalendarBlank size={24} />
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold">{appointmentCountToday.length}</span>
                                            <small className="max-xl:text-sm text-xs text-gray-500">Consultas do Dia</small>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 bg-white shadow rounded-lg">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                                            <CalendarX size={24} />
                                        </div>
                                        <div className="grid">
                                            <div className="flex gap-2 items-center">
                                                <span className="text-2xl font-bold">{appointmentGlobalCount.filter((appointment) => appointment.isCanceled == true).length}</span>
                                                <span className="text-md text-gray-500 font-semibold">({
                                                    Number((((appointmentGlobalCount.filter((appointment) => appointment.isCanceled == true).length) / appointmentGlobalCount.length))).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
                                                })</span>

                                            </div>
                                            <small className="max-xl:text-sm text-xs text-gray-500">Consultas Canceladas</small>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 bg-white shadow rounded-lg">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                            <Percent size={24} />
                                        </div>
                                        <div className="grid">
                                            <span className="text-2xl font-bold">{Number(100 - (((appointmentGlobalCount.filter((appointment) => appointment.isCanceled == true).length) / appointmentGlobalCount.length) * 100)).toFixed(2)}%</span>
                                            <small className="max-xl:text-sm text-xs text-gray-500">Taxa de frequência</small>
                                        </div>
                                    </div>
                                </section>
                                <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:grid-flow-col gap-6">
                                    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Visão geral das consultas</div>
                                        <div className="-ml-8 w-full scale-90 2xl:scale-100 2xl:ml-0 2xl:py-4">
                                            {/*<div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>*/}
                                            <BarChart width={600} height={300} data={appointmentsOverview}>
                                                <XAxis dataKey="name" stroke="#be185d" />
                                                <YAxis />
                                                <Tooltip wrapperStyle={{ outline: 'none', background: '#be185d' }} />
                                                <CartesianGrid />
                                                <Bar dataKey="valor" fill="#be185d" barSize={30} />
                                            </BarChart>
                                        </div>
                                    </div>
                                    <div className="row-span-2 bg-white shadow rounded-lg">
                                        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                                            <span>Consultas por médico(a)</span>
                                        </div>
                                        <div className="overflow-y-auto max-h-96">
                                            <ul className="p-6 space-y-6">
                                                <li className="flex items-center text-gray-600 px-2 py-1 hover:text-white hover:bg-pink-700 hover:rounded">
                                                    <span>Luiza Bueno</span>
                                                    <span className="ml-auto font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.doctor == 'Dra. Luiza Bueno').length}</span>
                                                </li>
                                                <li className="flex items-center text-gray-600 px-2 py-1 hover:text-white hover:bg-pink-700 hover:rounded">
                                                    <span>Silvia Bueno</span>
                                                    <span className="ml-auto font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.doctor == 'Dra. Silvia Bueno').length}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex flex-col row-span-2 bg-white shadow rounded-lg">
                                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Consultas por tipo</div>
                                        <div className="p-4 flex-grow">
                                            <ul className="p-6 space-y-6">
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Exames de rotina</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.type == 'exm').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Pré-Natal</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.type == 'pre').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Pós-Parto</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.type == 'pos').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Pós-Cirúrgico</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.type == 'cir').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Rotina</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{appointmentGlobalCount.filter((appointment) => appointment.type == 'rot').length}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </main>
                        </div >
                    </Tabs.Content>
                    <Tabs.Content className="flex-grow bg-white rounded-b-md outline-none" value="tab2">
                        <div className="flex-grow text-pink-800 bg-white shadow">
                            <main className="p-0 space-y-6">
                                <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    <div className="flex items-center p-6 bg-white shadow rounded-lg">
                                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                            <CalendarCheck size={24} />
                                        </div>
                                        <div>
                                            <span className="block text-2xl font-bold">{patientList.length}</span>
                                            <small className="max-xl:text-sm text-xs text-gray-500">Pacientes cadastradas</small>
                                        </div>
                                    </div>
                                    
                                    
                                </section>
                                <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:grid-flow-col gap-6">
                                    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Faixa Etária das pacientes</div>
                                        <div className="-ml-8 w-max scale-90 2xl:scale-100 2xl:ml-0 2xl:py-4">
                                            {/*<div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>*/}
                                            <BarChart width={600} height={300} data={patientOverview}>
                                                <XAxis dataKey="name" stroke="#be185d" />
                                                <YAxis />
                                                <Tooltip wrapperStyle={{ outline: 'none', background: '#be185d' }} />
                                                <CartesianGrid />
                                                <Bar dataKey="valor" fill="#be185d" barSize={30} />
                                            </BarChart>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Pacientes por convênio</div>
                                        <div className="p-4 flex-grow">
                                            <ul className="p-6 space-y-6">
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Amil</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{patientList.filter((patient) => patient.medicalInsurance == 'Amil').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Bradesco Saúde</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{patientList.filter((patient) => patient.medicalInsurance == 'Bradesco Saúde').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Notredame Intermédica</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{patientList.filter((patient) => patient.medicalInsurance == 'Notredame Intermédica').length}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span className="text-gray-600">Sul América</span>
                                                    <span className="ml-auto rounded-[50%] h-7 w-7 flex justify-center  items-center bg-pink-700 text-white font-semibold">{patientList.filter((patient) => patient.medicalInsurance == 'Sul América').length}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </main>
                        </div >
                    </Tabs.Content>
                </Tabs.Root>
            </main >
        </>
    )
}