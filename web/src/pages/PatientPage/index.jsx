import clsx from "clsx";
import { Plus, PlusCircle, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { DoctorFloatingMenu } from "../../components/DoctorFloatingMenu";
import { Header } from "../../components/Header";
import { api } from "../../lib/axios";
import { Root, Trigger, Portal, Overlay, Content, Title, Description, Close, } from '@radix-ui/react-dialog';
import { toast } from "react-toastify";


export function PatientPage() {
    const { patientId } = useParams()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [patientInfo, setPatientInfo] = useState([])
    //const [medicalRecords, setMedicalRecords] = useState([])

    const calculatePatientAge = (birthday, currentDay) => { return Math.floor(Math.ceil(Math.abs(birthday.getTime() - currentDay.getTime()) / (1000 * 3600 * 24)) / 365.25); }

    useEffect(() => {
        api.get(`/patient/${patientId}`)
            .then(
                (response) => {
                    setIsLoaded(true);
                    setPatientInfo(response.data)

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [])


    if (error) {
        if (error.message.includes("404")) {
            return (
                <>
                    <Helmet>
                        <title>Paciente | Lutea</title>
                    </Helmet>
                    <main className="px-16 py-6">
                        <Header />
                        <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                            <h1 className="font-bold text-pink-700 text-4xl">Paciente</h1>
                            <span className="text-gray-500">Confira a seguir as consultas agendadas.</span>
                        </div>
                        <div className="grid justify-items-center text-center w-full pt-12 gap-6">

                            <div className="grid">
                                <h4 className="font-bold text-2xl text-pink-700">Erro ao buscar informações da paciente</h4>
                                <span className="text-md">Contate o Suporte Lutea para que o incidente seja analisado.</span>
                                <span className="text-sm">Erro: {error.message}.</span>
                            </div>
                        </div>
                    </main>
                    <DoctorFloatingMenu />

                </>
            )
        }
        else {
            return (<div>Error: {error.message}</div>);
        }
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
                    <title>{patientInfo.patient.patientName} | Lutea</title>
                </Helmet>
                <main className="px-16 py-6">
                    <Header />
                    <div className="2xl:py-32 xl:py-16 lg:py-8 pt-16 gap-3 grid">
                        <Link
                            to={''}
                            className="border border-pink-700 w-max px-2 rounded font-medium text-sm text-pink-700 hover:text-white hover:bg-pink-700 transition-colors"
                        >
                            {patientInfo.patient.medicalInsurance}
                        </Link>
                        <h1 className="font-bold text-pink-700 text-4xl max-md:text-3xl">{patientInfo.patient.patientName}</h1>

                        <span className="text-gray-500">Confira a seguir as consultas agendadas para esta paciente.</span>
                    </div>
                    <div className="flex justify-between gap-16 max-md:flex-col-reverse max-md:gap-4">

                        <section className="gap-4 grid w-4/5 pr-8 border-1 border-r-2 border-l-0 border-t-0 border-b-0">
                            <div>
                                <h3 className="pb-4 text-lg font-semibold">Informações do paciente</h3>
                                <div>
                                    <span>Idade: {calculatePatientAge(new Date(patientInfo.patient.birthday), new Date())} anos</span>
                                </div>
                            </div>
                            <section>
                                <div className="flex justify-between w-full">
                                    <h3 className="text-lg font-semibold">Prontuário</h3>
                                    <DialogDemo />
                                </div>
                                <span className="py-4 flex text-gray-500 text-sm">Confira a seguir os prontuários criados para esta paciente</span>
                                <div className="grid grid-cols-22 gap-4 ">
                                    {
                                        patientInfo.medicalRecordsPerPatient.length >= 1 ?
                                        patientInfo.medicalRecordsPerPatient.map((records) => {
                                            return (
                                                <div className="grid rounded shadow-md text-sm leading-5 p-4  border border-1 border-gray-300">
                                                    <small>Criado em: {new Date(records.createdAt).toLocaleDateString()}</small>
                                                    <h4 className="py-4 font-semibold text-base text-pink-800">{records.title}</h4>
                                                    <p className="text-justify">{records.description}</p>
                                                </div>
                                            )
                                        })
                                        : <h1 className="pt-8">Não há prontuários criados para esta paciente</h1 >
                                    }
                                </div>
                            </section>
                        </section>
                        <aside className="w-1/5 h-full max-md:pt-8 ">
                            <h3 className="pb-4 text-lg font-semibold">Consultas</h3>
                            <div className={
                                clsx(
                                    `border border-l-4 border-r-0 border-t-0 border-b-0 border-pink-200 h-48 absolute`,
                                    {
                                        "hidden": patientInfo.appointmentPerPatient.length == 0,
                                        "h-48": patientInfo.appointmentPerPatient.length == 1,
                                        "h-52": patientInfo.appointmentPerPatient.length == 2,
                                        "h-56": patientInfo.appointmentPerPatient.length >= 3
                                    }
                                )

                            }>

                            </div>
                            <section className={
                                clsx(

                                    "grid gap-4 mb-8",
                                    {
                                        "ml-0": patientInfo.appointmentPerPatient.length == 0,
                                        "ml-4": patientInfo.appointmentPerPatient.length >= 1
                                    }
                                )
                            }>
                                {
                                    patientInfo.appointmentPerPatient.length == 0 ? <h2>Não há consultas</h2> :
                                        patientInfo.appointmentPerPatient.map(appointmentPerPatientInfo =>
                                            <div className="border border-1 grid items-center px-2 gap-1 h-16 py-2 rounded after:relative after:-left-8 after:content-[''] after:-translate-y-8 after:bg-pink-600 after:h-4 after:w-4 after:rounded-[50%]">
                                                <span className="text-base text-pink-700 font-semibold ">
                                                    {
                                                        appointmentPerPatientInfo.type != null
                                                            ? appointmentPerPatientInfo.type == "exm" ? "Exames de Rotina"
                                                                : appointmentPerPatientInfo.type == "pos" ? "Pós-Parto"
                                                                    : appointmentPerPatientInfo.type == "pre" ? "Pré-Natal"
                                                                        : appointmentPerPatientInfo.type == "rot" ? "Rotina" : null : null
                                                    }
                                                </span>
                                                <small className="text-xs text-gray-500">
                                                    {
                                                        `${new Date(appointmentPerPatientInfo.dateTime).toLocaleDateString()} | ${new Date(appointmentPerPatientInfo.dateTime).toLocaleTimeString()}`
                                                    }
                                                </small>
                                            </div>
                                        )

                                }
                            </section>
                        </aside>
                    </div>
                </main >
                <DoctorFloatingMenu />
            </>
        )
    }
}

export function DialogDemo() {
    const { patientId } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const createdAt = new Date()
    async function createMedicalRecord(event) {
        event.preventDefault()
        /*if (patientName == '') {
            return 'Algo deu errado';
        }*/
        try {
            await api.post('/medicalrecords', {
                title,
                description,
                patientId,
                createdAt
            }).then((response) => {
                console.log(response)
                toast.success('Prontuário criado com sucesso');
                setTitle('')
                setDescription('')
            })
        }
        catch (e) {
            toast.error('Erro ao agendar');
            toast.error(`${e}`);
        }
    }
    return (
        <Root>
            <Trigger asChild>
                <PlusCircle
                    size={28}
                    className="text-pink-700 hover:fill-pink-700"
                />
            </Trigger>
            <Portal>
                <Overlay className="bg-gray-900 opacity-70 fixed inset-0 transition-all" />
                <Content className="bg-white rounded-md shadow-xl fixed flex flex-col justify-center top-0 bottom-0 right-0 w-50 max-w-md p-6 focus:outline-none">
                    <Title className="m-0 font-semibold text-2xl pb-6 text-pink-700">Criar Prontuário</Title>
                    <Description className="mt-3 mr-0 mb-5 text-sm text-justify leading-normal">
                        Preencha os campos a seguir para criar um prontuário para esta paciente.
                    </Description>
                    <form onSubmit={createMedicalRecord}>
                        <fieldset className="grid gap-3 items-center mb-4 ">
                            <label className="text-[14px] text-pink-700 w-fit" htmlFor="name">
                                Título do Prontuário
                            </label>
                            <input
                                className="w-full flex-1 inline-flex items-center justify-center rounded outline outline-1 outline-pink-200 px-3 text-base leading-normal shadow-sm h-9 focus-within:outline-4 focus-within:outline-pink-700 transition-colors"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Prontuário - 26/03" />
                        </fieldset>
                        <fieldset className="grid gap-3 items-center mb-4">
                            <label className="text-[14px] text-pink-700 w-fit" htmlFor="description">
                                Descrição
                            </label>
                            <textarea
                                className="w-full resize-none h-36 outline outline-1 outline-pink-200 p-3 flex-1 inline-flex items-center justify-center rounded px-3 text-base leading-normal shadow-sm focus-within:outline-4 focus-within:outline-pink-700 transition-colors"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Digite aqui a descrição do prontuário" />
                        </fieldset>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }} cl>
                            
                                <button
                                    className="flex gap-2 items-center justify-center rounded px-4 text-base leading-normal font-medium h-9 border border-pink-700 text-pink-700"
                                    type="submit"
                                    >
                                    <XCircle size={20}/> Limpar
                                </button>
                                <button
                                    className="flex gap-2 items-center justify-center rounded px-4 text-base leading-normal font-medium h-9 bg-pink-700 text-white"
                                    type="submit"
                                    >
                                    <Plus size={20} className="text-white" /> Criar prontuário
                                </button>
                        </div>
                    </form>
                    <Close asChild>
                        <button className="rounded-[100%] h-9 w-9 flex items-center justify-center absolute text-pink-700 top-3 right-3" aria-label="Close">
                            <XCircle size={32} />
                        </button>
                    </Close>
                </Content>
            </Portal>
        </Root >
    )
}