import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { DoctorFloatingMenu } from "../../components/DoctorFloatingMenu";
import { Header } from "../../components/Header";
import { SecretaryFloatingMenu } from "../../components/SecretaryFloatingMenu";
import { api } from "../../lib/axios";

export function DocPatientList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [patientList, setPatientList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/patient')
            .then(
                (response) => {
                    setIsLoaded(true);
                    setPatientList(response.data)
                },
                (error) => {
                    setError(error);
                }
            )
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
                    <title>Listar Pacientes | Lutea</title>
                </Helmet>
                <main className="px-16 py-6">
                    <Header />
                    <div className="2xl:py-32 xl:py-16 lg:py-8 gap-2 grid">
                        <h1 className="font-bold text-pink-600 text-4xl">Listar Pacientes</h1>
                        <span className="text-gray-500">Confira a seguir as pacientes cadastradas.</span>
                    </div>
                    <table class="table-auto w-full overflow-x-visible">
                        <thead>
                            <tr>
                                <th className="text-justify text-sm">Nome do Paciente</th>
                                <th className="text-justify text-sm">Data de Nascimento</th>
                                <th className="text-justify text-sm max-sm:hidden">Convênio</th>
                            </tr>
                        </thead>
                        {
                            patientList
                                .sort((a, b) => { return a.patientName.localeCompare(b.patientName) })
                                .map(patient => (
                                    <tbody className="table-row-group gap-4">
                                        <tr
                                            className="my-16 table-row border-y hover:bg-pink-100 hover:text-pink-700"
                                            onClick={() => navigate(`/patient/${patient._id}`)}
                                            key={patient._id}
                                        >
                                            <td className="pr-1 py-1 table-cell text-sm">{patient.patientName != null ? patient.patientName : null}</td>

                                            <td className="pr-1 py-1 table-cell text-xs max-sm:hidden">{new Date(patient.birthday).toLocaleDateString()}</td>
                                            <td className="pr-1 py-1 table-cell text-xs max-md:hidden">
                                                <Link
                                                    to={`/ListAppointment/`} className="bg-pink-700 rounded-lg text-white py-[.0375rem]  h-fit px-2">
                                                    {
                                                        patient.medicalInsurance
                                                        /*
                                                        appointment.type != null
                                                             ? appointment.type == "exm" ? "Exames de Rotina"
                                                                 : appointment.type == "pos" ? "Pós-Parto"
                                                                     : appointment.type == "pre" ? "Pré-Natal"
                                                                         : appointment.type == "cir" ? "Pós-Cirúrgico"
                                                                             : appointment.type == "rot" ? "Rotina" : null : null
                                                                             */
                                                    }
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                        }
                    </table>
                </main>
                <DoctorFloatingMenu />
            </>
        )
    }
}