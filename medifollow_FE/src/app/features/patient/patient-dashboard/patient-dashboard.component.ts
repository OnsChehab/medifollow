import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-patient-dashboard',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './patient-dashboard.component.html',
    styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent {
    authService = inject(AuthService);
    currentUser = this.authService.currentUser;
}
