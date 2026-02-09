import { Component, inject, signal, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DoctorService } from '../../../core/services/doctor.service';
import { VitalsData } from '../../../core/models/clinical.model';

@Component({
    selector: 'app-patient-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, DatePipe, DecimalPipe],
    templateUrl: './patient-detail.component.html',
    styleUrl: './patient-detail.component.css'
})
export class PatientDetailComponent implements OnInit {
    doctorService = inject(DoctorService);

    // Input from Route Param
    @Input() id?: string;

    history = signal<{ vitals: VitalsData[], trends: string } | null>(null);
    alertMessage = signal('');

    ngOnInit() {
        if (this.id) {
            this.loadData(Number(this.id));
        }
    }

    loadData(id: number) {
        this.doctorService.getPatientHistory(id).subscribe(data => {
            this.history.set(data);
        });
    }

    validateAlert(status: string) {
        this.doctorService.validateAlert('alert-123', status).subscribe(() => {
            this.alertMessage.set(`Alert status updated to ${status}. Logged in audit trail.`);
            setTimeout(() => this.alertMessage.set(''), 3000);
        });
    }
}
