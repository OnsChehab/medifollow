import { Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { DoctorScheduleComponent } from './doctor-schedule/doctor-schedule.component';
import { DoctorMessagesComponent } from './doctor-messages/doctor-messages.component';

export const DOCTOR_ROUTES: Routes = [
    { path: 'patients', component: PatientListComponent },
    { path: 'patients/:id', component: PatientDetailComponent },
    { path: 'schedule', component: DoctorScheduleComponent },
    { path: 'messages', component: DoctorMessagesComponent },
    { path: '', redirectTo: 'patients', pathMatch: 'full' }
];
