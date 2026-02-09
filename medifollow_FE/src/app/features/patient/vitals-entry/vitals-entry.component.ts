import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { PatientService } from '../../../core/services/patient.service';
import { AuthService } from '../../../core/auth/auth.service';
import { VitalsData } from '../../../core/models/clinical.model';

@Component({
    selector: 'app-vitals-entry',
    standalone: true,
    imports: [FormsModule, RouterLink, NgIf],
    templateUrl: './vitals-entry.component.html',
    styleUrl: './vitals-entry.component.css'
})
export class VitalsEntryComponent implements OnInit {
    patientService = inject(PatientService);
    authService = inject(AuthService);
    route = inject(ActivatedRoute);

    isSubmitting = signal(false);
    successMessage = signal('');
    targetPatientId = signal<number | null>(null);

    // Form Model
    vitals: Partial<VitalsData> = {
        heartRate: 72,
        systolicBP: 120,
        diastolicBP: 80,
        temperature: 36.6,
        weight: 70
    };

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['patientId']) {
                this.targetPatientId.set(+params['patientId']);
            }
        });
    }

    onSubmit() {
        this.isSubmitting.set(true);

        const currentUser = this.authService.currentUser();
        // Use targetPatientId if available (Nurse mode), otherwise currentUser.id
        const patientId = this.targetPatientId() ?? currentUser?.id;

        if (!patientId) return;

        const data: VitalsData = {
            id: crypto.randomUUID(),
            patientId: patientId,
            timestamp: new Date(),
            heartRate: this.vitals.heartRate!,
            systolicBP: this.vitals.systolicBP!,
            diastolicBP: this.vitals.diastolicBP!,
            temperature: this.vitals.temperature!,
            weight: this.vitals.weight!,
            source: 'MANUAL'
        };

        this.patientService.addVital(data).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                const msg = this.targetPatientId() ? `Vitals recorded for Patient ID ${patientId}` : 'Vitals recorded successfully!';
                this.successMessage.set(msg);
                setTimeout(() => this.successMessage.set(''), 3000);
            },
            error: () => this.isSubmitting.set(false)
        });
    }
}
