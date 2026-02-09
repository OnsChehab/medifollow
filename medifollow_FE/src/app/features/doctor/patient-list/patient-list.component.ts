import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { DoctorService, PatientSummary } from '../../../core/services/doctor.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-patient-list',
    standalone: true,
    imports: [RouterLink, DatePipe],
    templateUrl: './patient-list.component.html',
    styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit {
    doctorService = inject(DoctorService);
    authService = inject(AuthService);
    patients = signal<PatientSummary[]>([]);

    ngOnInit() {
        this.doctorService.getAssignedPatients().subscribe(data => {
            this.patients.set(data);
        });

        const role = this.authService.currentUser()?.role;
        if (role === 'NURSE') {
            this.title.set('My Ward');
            this.icon.set('fa-procedures');
        }
    }

    title = signal('My Patients');
    icon = signal('fa-user-md');
}
