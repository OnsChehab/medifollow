import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { PatientService } from '../../../core/services/patient.service';
import { AuthService } from '../../../core/auth/auth.service';
import { SymptomReport } from '../../../core/models/clinical.model';

@Component({
    selector: 'app-symptoms-entry',
    standalone: true,
    imports: [FormsModule, RouterLink, NgIf],
    templateUrl: './symptoms-entry.component.html',
    styleUrl: './symptoms-entry.component.css'
})
export class SymptomsEntryComponent implements OnInit {
    patientService = inject(PatientService);
    authService = inject(AuthService);
    route = inject(ActivatedRoute);

    isSubmitting = signal(false);
    successMessage = signal('');
    targetPatientId = signal<number | null>(null);

    // Form Model
    symptoms = {
        painLevel: 0,
        fatigueLevel: 0,
        shortnessOfBreath: false,
        nausea: false,
        notes: ''
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
        const patientId = this.targetPatientId() ?? currentUser?.id;

        if (!patientId) return;

        const data: any = {
            id: crypto.randomUUID(),
            patientId: patientId,
            timestamp: new Date(),
            painLevel: this.symptoms.painLevel,
            fatigueLevel: this.symptoms.fatigueLevel,
            shortnessOfBreath: this.symptoms.shortnessOfBreath,
            nausea: this.symptoms.nausea,
            notes: this.symptoms.notes
        };

        this.patientService.addSymptom(data).subscribe({
            next: () => {
                this.isSubmitting.set(false);
                const msg = this.targetPatientId() ? 'Symptoms reported for Patient.' : 'Symptoms reported successfully!';
                this.successMessage.set(msg);
                setTimeout(() => this.successMessage.set(''), 3000);
            },
            error: () => this.isSubmitting.set(false)
        });
    }
}
