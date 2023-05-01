import { useState } from "react";
import { CalendarCheck, CaretDown, CaretUp, House, ListDashes, PencilSimpleLine, PlusCircle, UsersThree, XCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import clsx from 'clsx';

export function SecretaryFloatingMenu() {
    const [appointmentMenu, setAppointmentMenu] = useState(false)
    const [patientMenu, setPatientMenu] = useState(false)

    const toggleAppointment = () => appointmentMenu == true ? setAppointmentMenu(false) : setAppointmentMenu(true)
    const togglePatient = () => patientMenu == true ? setPatientMenu(false) : setPatientMenu(true)

    return (
        <section className="flex fixed bottom-4 justify-center w-full">
            <nav className="flex bg-pink-700 p-4 flex-col justify-start rounded-lg">
                <ul className="flex gap-8">
                    <li>
                        <Link
                            className="flex items-center text-white font-semibold text-base w-full gap-2"
                            to="/menu/secretary">
                            <House size={24} />
                            <p className="flex">Home</p>
                        </Link>
                    </li>
                    <li>
                        <section
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
                        </section>
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
                                        to="/ScheduleAppointment">
                                        <PlusCircle size={28} />
                                        <p className="text-md">Agendar Consultas</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex p-2 w-full rounded items-center gap-2 text-white text-sm hover:bg-pink-500"
                                        to="/CancelAppointment">
                                        <XCircle size={28} />
                                        <p className="text-md">Cancelar Consultas</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex p-2 w-full rounded items-center gap-2 text-white text-sm hover:bg-pink-500"
                                        to="/ListAppointment">
                                        <ListDashes size={28} />
                                        <p className="text-md">Listar Consultas</p>
                                    </Link>
                                    <Link
                                        className="flex p-2 w-full rounded items-center gap-2 text-white text-sm hover:bg-pink-500"
                                        to="/RescheduleAppointment">
                                        <PencilSimpleLine size={28} />
                                        <p className="text-md">Remarcar Consultas</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <section
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
                        </section>
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
                                        className="flex p-2 w-full items-center gap-2 text-white text-sm rounded  hover:bg-pink-500"
                                        to="/AddPatient">
                                        <PlusCircle size={28} />
                                        <p className="flex">Cadastrar Paciente</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex p-2 w-full items-center gap-2 text-white text-sm rounded hover:bg-pink-500"
                                        to="/PatientList">
                                        <ListDashes size={28} />
                                        <p className="flex">Listar Paciente</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </section>
    )
}