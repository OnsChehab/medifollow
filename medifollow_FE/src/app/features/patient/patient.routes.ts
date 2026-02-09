import { Routes } from '@angular/router';
import { VitalsEntryComponent } from './vitals-entry/vitals-entry.component';
import { SymptomsEntryComponent } from './symptoms-entry/symptoms-entry.component';

export const PATIENT_ROUTES: Routes = [
    { path: 'vitals', component: VitalsEntryComponent },
    { path: 'symptoms', component: SymptomsEntryComponent },
    { path: '', redirectTo: 'vitals', pathMatch: 'full' }
];
