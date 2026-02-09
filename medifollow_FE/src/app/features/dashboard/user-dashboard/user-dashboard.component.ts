import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { PatientDashboardComponent } from '../../patient/patient-dashboard/patient-dashboard.component';
import { PatientListComponent } from '../../doctor/patient-list/patient-list.component';
import { AdminDashboardComponent } from '../../admin/admin-dashboard/admin-dashboard.component';

@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    imports: [PatientDashboardComponent, PatientListComponent, AdminDashboardComponent],
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
    authService = inject(AuthService);

    isMedical(): boolean {
        const r = this.authService.currentUser()?.role;
        return r === 'PHYSICIAN' || r === 'NURSE' || r === 'COORDINATOR';
    }
}
