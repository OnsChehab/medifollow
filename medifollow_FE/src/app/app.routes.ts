import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SuperAdminLayoutComponent } from './layouts/super-admin-layout/super-admin-layout.component';
import { DoctorLayoutComponent } from './layouts/doctor-layout/doctor-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { NurseLayoutComponent } from './layouts/nurse-layout/nurse-layout.component';
import { CoordinatorLayoutComponent } from './layouts/coordinator-layout/coordinator-layout.component';
import { AuditorLayoutComponent } from './layouts/auditor-layout/auditor-layout.component';
import { LandingComponent } from './features/landing/landing.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    // Public Flow
    {
        path: '',
        component: FrontLayoutComponent,
        children: [
            { path: '', component: LandingComponent }
        ]
    },

    // Auth Flow
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },

    // 1. Patient Layout
    {
        path: 'patient',
        component: PatientLayoutComponent,
        canMatch: [RoleGuard('PATIENT')],
        children: [
            { path: 'dashboard', loadComponent: () => import('./features/patient/patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent) },
            { path: 'vitals', loadComponent: () => import('./features/patient/vitals-entry/vitals-entry.component').then(m => m.VitalsEntryComponent) },
            { path: 'symptoms', loadComponent: () => import('./features/patient/symptoms-entry/symptoms-entry.component').then(m => m.SymptomsEntryComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // 2. Doctor Layout
    {
        path: 'doctor',
        component: DoctorLayoutComponent,
        canMatch: [RoleGuard('PHYSICIAN')],
        children: [
            { path: 'dashboard', loadComponent: () => import('./features/doctor/patient-list/patient-list.component').then(m => m.PatientListComponent) },
            { path: 'schedule', loadComponent: () => import('./features/doctor/doctor-schedule/doctor-schedule.component').then(m => m.DoctorScheduleComponent) },
            { path: 'messages', loadComponent: () => import('./features/doctor/doctor-messages/doctor-messages.component').then(m => m.DoctorMessagesComponent) },
            { path: 'patients', loadChildren: () => import('./features/doctor/doctor.routes').then(m => m.DOCTOR_ROUTES) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // 3. Nurse Layout
    {
        path: 'nurse',
        component: NurseLayoutComponent,
        canMatch: [RoleGuard('NURSE')],
        children: [
            { path: 'dashboard', loadComponent: () => import('./features/doctor/patient-list/patient-list.component').then(m => m.PatientListComponent) },
            { path: 'booking', loadComponent: () => import('./features/nurse/doctor-booking/doctor-booking.component').then(m => m.DoctorBookingComponent) },
            { path: 'vitals', loadComponent: () => import('./features/patient/vitals-entry/vitals-entry.component').then(m => m.VitalsEntryComponent) },
            { path: 'symptoms', loadComponent: () => import('./features/patient/symptoms-entry/symptoms-entry.component').then(m => m.SymptomsEntryComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // 4. Coordinator Layout
    {
        path: 'coordinator',
        component: CoordinatorLayoutComponent,
        canMatch: [RoleGuard('COORDINATOR')],
        children: [
            { path: 'dashboard', loadComponent: () => import('./features/coordinator/coordinator-dashboard/coordinator-dashboard.component').then(m => m.CoordinatorDashboardComponent) },
            { path: 'messages', loadComponent: () => import('./features/doctor/doctor-messages/doctor-messages.component').then(m => m.DoctorMessagesComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // 5. Auditor Layout
    {
        path: 'auditor',
        component: AuditorLayoutComponent,
        canMatch: [RoleGuard('AUDITOR')],
        children: [
            { path: 'dashboard', loadComponent: () => import('./features/auditor/auditor-dashboard/auditor-dashboard.component').then(m => m.AuditorDashboardComponent) },
            { path: 'logs', loadComponent: () => import('./features/auditor/audit-logs/audit-logs.component').then(m => m.AuditLogsComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // 6. Admin Layout
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canMatch: [RoleGuard('ADMIN')],
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'staff', loadComponent: () => import('./features/admin/staff-management/staff-management.component').then(m => m.StaffManagementComponent) },
            { path: 'patients', loadComponent: () => import('./features/admin/patient-management/patient-management.component').then(m => m.PatientManagementComponent) },
            { path: 'questionnaires', loadComponent: () => import('./features/admin/questionnaire-builder/questionnaire-builder.component').then(m => m.QuestionnaireBuilderComponent) },
            { path: 'alerts', loadComponent: () => import('./features/admin/alert-supervision/alert-supervision.component').then(m => m.AlertSupervisionComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // 7. Super Admin Layout
    {
        path: 'super-admin',
        component: SuperAdminLayoutComponent,
        canMatch: [RoleGuard('SUPER_ADMIN')],
        children: [
            { path: 'dashboard', loadComponent: () => import('./features/super-admin/super-dashboard/super-dashboard.component').then(m => m.SuperDashboardComponent) },
            { path: 'users', loadComponent: () => import('./features/super-admin/user-management/user-management.component').then(m => m.UserManagementComponent) },
            { path: 'units', loadComponent: () => import('./features/super-admin/unit-management/unit-management.component').then(m => m.UnitManagementComponent) },
            { path: 'audit', loadComponent: () => import('./features/auditor/audit-logs/audit-logs.component').then(m => m.AuditLogsComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // Fallback
    { path: '**', redirectTo: 'auth/login' }
];
