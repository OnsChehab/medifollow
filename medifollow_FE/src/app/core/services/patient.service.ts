import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';
import { VitalsData, SymptomReport } from '../models/clinical.model';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private vitals = signal<VitalsData[]>([]);
    private symptoms = signal<SymptomReport[]>([]);

    // Mock initial data
    constructor() {
        this.addVital({
            id: '1', patientId: 1, timestamp: new Date(),
            temperature: 36.6, systolicBP: 120, diastolicBP: 80,
            heartRate: 72, weight: 70, source: 'MANUAL'
        });
    }

    getVitals(patientId: number) {
        return of(this.vitals().filter(v => v.patientId === patientId)).pipe(delay(500));
    }

    addVital(data: VitalsData) {
        this.vitals.update(list => [data, ...list]);
        return of(true).pipe(delay(500));
    }

    getSymptoms(patientId: number) {
        return of(this.symptoms().filter(s => s.patientId === patientId)).pipe(delay(500));
    }

    addSymptom(data: SymptomReport) {
        this.symptoms.update(list => [data, ...list]);
        return of(true).pipe(delay(500));
    }
}
