import { Calendar, FileText, ListDashes, PencilSimpleLine, Pill, PlusCircle, XCircle } from "phosphor-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { DoctorFloatingMenu } from "../../components/DoctorFloatingMenu";

export function DoctorMenuPage() {
    return (
        <>
            <Helmet>
                <title>Menu Principal | Lutea</title>
            </Helmet>
            <main className="px-16 py-6">
                <Header />
                <div className="2xl:py-32 xl:py-20 lg:py-8  gap-2 grid">
                    <h1 className="font-bold text-pink-700 text-4xl">Menu Principal</h1>
                    <span className="text-gray-500 text-justify">
                        Estas são as funções disponíveis para você. Clique para descobrir.
                    </span>
                </div>

                <div className="grid grid-cols-22 gap-y-6 gap-x-4 py-4">
                    <Link to={'/SickNote'} className="rounded border border-pink-200 flex flex-col pt-0 pb-4 px-4 my-6">
                        <div className=" relative -top-12 bg-pink-700 rounded-[50%] h-20 w-20 text-white font-semibold justify-center items-center flex border-2 border-transparent hover:bg-white hover:text-pink-700 hover:border-pink-700 transition-colors" >
                            <FileText size={40} />
                        </div>
                        <h4 className="-mt-4 font-bold text-lg text-left pb-4">Atestado</h4>
                        <p className="text-gray-500 text-sm">Clique nesta opção para emitir um atestado médico.</p>
                    </Link>

                    <Link to={'/currentDayAppointments'} className="rounded border border-pink-200 flex flex-col pt-0 pb-4 px-4 my-6">
                        <div className=" relative -top-12 bg-pink-700 rounded-[50%] h-20 w-20 text-white font-semibold justify-center items-center flex border-2 border-transparent hover:bg-white hover:text-pink-700 hover:border-pink-700 transition-colors">
                            <Calendar size={40} />
                        </div>
                        <h4 className="-mt-4 font-bold text-lg text-left pb-4">Consultas do dia</h4>
                        <p className="text-gray-500 text-sm text-justify">Clique nesta opção para visualizar as consultas agendadas para o dia atual.</p>
                    </Link>
                    <Link to={'/doc_PatientList'} className="rounded border border-pink-200 flex flex-col pt-0 pb-4 px-4 my-6">
                        <div className=" relative -top-12 bg-pink-700 rounded-[50%] h-20 w-20 text-white font-semibold justify-center items-center flex border-2 border-transparent hover:bg-white hover:text-pink-700 hover:border-pink-700 transition-colors" >
                            <ListDashes size={28} />
                        </div>
                        <h4 className="-mt-4 font-bold text-lg text-left pb-4">Listar Pacientes</h4>
                        <p className="text-gray-500 text-sm">Clique nesta opção para os pacientes já cadastrados.</p>
                    </Link>
                    <Link to={'/Prescription'} className="rounded border border-pink-200 flex flex-col pt-0 pb-4 px-4 my-6">
                        <div className=" relative -top-12 bg-pink-700 rounded-[50%] h-20 w-20 text-white font-semibold justify-center items-center flex border-2 border-transparent hover:bg-white hover:text-pink-700 hover:border-pink-700 transition-colors" >
                            <Pill size={28} />
                        </div>
                        <h4 className="-mt-4 font-bold text-lg text-left pb-4">Receituário</h4>
                        <p className="text-gray-500 text-sm">Clique nesta opção para emitir um receituário médico.</p>
                    </Link>
                </div>
            </main>
            <DoctorFloatingMenu/>
        </>
    )
}