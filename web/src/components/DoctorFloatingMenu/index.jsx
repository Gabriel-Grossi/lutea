import { useState } from "react";
import { Calendar, CalendarCheck, CaretDown, CaretUp, Clock, FileText, House, ListDashes, Pill, PlusCircle, UsersThree } from "phosphor-react";
import { Link } from "react-router-dom";
import clsx from 'clsx';

export function DoctorFloatingMenu() {
    const [appointmentMenu, setAppointmentMenu] = useState(false)
    const [documentMenu, setDocumentMenu] = useState(false)
    const [patientMenu, setPatientMenu] = useState(false)

    const toggleAppointment = () => appointmentMenu == true ? setAppointmentMenu(false): setAppointmentMenu(true)
    const toggleDocuments = () => documentMenu == true ? setDocumentMenu(false): setDocumentMenu(true)
    const togglePatient = () => patientMenu == true ? setPatientMenu(false): setPatientMenu(true)

    return (
        <section className="flex fixed bottom-4 justify-center w-full">
            <nav className="flex bg-pink-700 p-4 flex-col justify-start rounded-lg">
                <ul className="flex gap-8">
                    <li>
                        <Link
                            className="flex items-center text-white font-semibold text-base w-full gap-2"
                            to="/menu/doctor">
                            <House size={24} />
                            <p className="flex">Home</p>
                        </Link>
                    </li>
                    <li>
                        <span
                            className="flex items-center text-white font-semibold text-base w-full gap-2"
                            onClick={toggleAppointment}
                        >
                            <CalendarCheck size={28} />
                            <p className="flex justify-between w-full items-center cursor-pointer">
                                Consultas
                                {
                                    appointmentMenu == false ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />
                                }
                            </p>
                        </span>
                        <div className={
                            clsx(
                                "h-max justify-between w-full items-center pt-2 transition-all",
                                {
                                    "hidden": appointmentMenu == false
                                }
                            )}
                        >
                            <ul>
                                <li>
                                    <Link
                                        className="flex p-2 w-full rounded items-center gap-2 text-white text-sm hover:bg-pink-500"
                                        to="/currentDayAppointments">
                                        <Calendar size={28} />
                                        <p className="text-md">Consultas do Dia</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <span
                            className="flex items-center text-white font-semibold text-base w-full gap-2"
                            onClick={toggleDocuments}
                        >
                            <FileText size={28} />
                            <p className="flex justify-between w-full items-center cursor-pointer">
                                Documentos
                                {
                                    documentMenu == false ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />
                                }
                            </p>
                        </span>
                        <div className={
                            clsx(
                                "h-max justify-between w-full items-center pt-2 transition-all",
                                {
                                    "hidden": documentMenu == false
                                }
                            )}>
                            <ul>
                                <li>
                                    <Link
                                        className="flex p-2 w-full items-center gap-2 text-white text-sm rounded hover:bg-pink-500"
                                        to="/SickNote">
                                        <FileText size={28} />
                                        <p className="flex">Atestado</p>
                                    </Link>
                                </li>
                                {
                                    /*
                                    <li>
                                        <Link
                                            className="flex p-2 w-full items-center gap-2 text-white text-sm rounded  hover:bg-pink-500"
                                            to="/AddPatient">
                                            <Clock size={28} />
                                            <p className="flex">Comparecimento</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="flex p-2 w-full items-center gap-2 text-white text-sm rounded hover:bg-pink-500"
                                            to="/PregnancyLicense">
                                            <FileText size={28} />
                                            <p className="flex">Licença Maternidade</p>
                                        </Link>
                                    </li>                                  
                                    */
                                }
                                <li>
                                    <Link
                                        className="flex p-2 w-full items-center gap-2 text-white text-sm rounded hover:bg-pink-500"
                                        to="/Prescription">
                                        <Pill size={28} />
                                        <p className="flex">Receituário</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <span
                            className="flex items-center text-white font-semibold text-base w-full gap-2"
                            onClick={togglePatient}
                        >
                            <UsersThree size={28} />
                            <p className="flex justify-between w-full items-center cursor-pointer">
                                Paciente
                                {
                                    patientMenu == false ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />
                                }
                            </p>
                        </span>
                        <div className={
                            clsx(
                                "h-max justify-between w-full items-center pt-2 transition-all",
                                {
                                    "hidden": patientMenu == false
                                }
                            )}>
                            <ul>
                                <li>
                                    <Link
                                        className="flex p-2 w-full items-center gap-2 text-white text-sm rounded hover:bg-pink-500"
                                        to="/doc_PatientList">
                                        <ListDashes size={28} />
                                        <p className="flex">Listar Paciente</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </section >
    )
}