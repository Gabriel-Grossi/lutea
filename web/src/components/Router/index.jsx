import { Route, Routes } from "react-router-dom";
import { AddPatient } from "../../pages/AddPatient";
import { CancelAppointment } from "../../pages/CancelAppointment";
import { ManagementDashboard } from "../../pages/DashboardMGMT";
import { HomePage } from "../../pages/HomePage";
import { ListAppointmentByType } from "../../pages/ListAppointmentByType";
import { ListAppointment } from "../../pages/ListAppointments";
import { LoginPage } from "../../pages/Login";
import { PatientList } from "../../pages/PatientList";
import { PatientPage } from "../../pages/PatientPage";
import { Prescription } from "../../pages/Prescription";
import { RescheduleAppointment } from "../../pages/RescheduleAppointment";
import { ScheduleAppointment } from "../../pages/ScheduleAppointment";
import { SecretaryMenuPage } from "../../pages/SecretaryMenuPage";
import { SickNote } from "../../pages/SickNote";
import { Component } from "../Component";
import { DocPatientList } from "../../pages/DocPatientList";
import { NotFoundPage } from "../../pages/404Page";
import { CurrentDayAppointments } from "../../pages/CurrentDayAppointments";
import { PatientPageSec } from "../../pages/PatientPageSec";
import { DoctorMenuPage } from "../../pages/DoctorMenuPage";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            {/*Appointments*/}
            <Route path="/ScheduleAppointment" element={<ScheduleAppointment />} />
            <Route path="/CancelAppointment" element={<CancelAppointment />} />
            <Route path="/RescheduleAppointment" element={<RescheduleAppointment />} />
            <Route path="/ListAppointment" element={<ListAppointment />} />
            <Route path="/ListAppointment/:type" element={<ListAppointmentByType />} />
            <Route path="/currentDayAppointments" element={<CurrentDayAppointments />} />

            {/*Patient*/}
            <Route path="/AddPatient" element={<AddPatient/>}/>
            <Route path="/PatientList" element={<PatientList/>}/>
            <Route path="/doc_PatientList" element={<DocPatientList/>}/>
            <Route path="/patient/:patientId" element={<PatientPage />} />
            <Route path="/sec/patient/:patientId" element={<PatientPageSec />} />

            {/*Documents*/}
            <Route path="/Prescription" element={<Prescription/>}/>
            <Route path="/SickNote" element={<SickNote/>}/>
            
            {/*Dashboard*/}
            <Route path="/ManagementDashboard" element={<ManagementDashboard/>}/>
            
            {/*Menu*/}
            <Route path="/menu/secretary" element={<SecretaryMenuPage/>}/>
            <Route path="/menu/doctor" element={<DoctorMenuPage/>}/>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/Component" element={<Component />} />
            <Route path="/Login" element={<LoginPage />} />
        </Routes>
    );
}