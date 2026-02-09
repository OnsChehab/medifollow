import { Injectable, signal } from '@angular/core';
import { of, delay } from 'rxjs';
import { VitalsData, SymptomReport } from '../models/clinical.model';

export interface PatientSummary {
    id: number;
    name: string;
    age: number;
    gender: 'M' | 'F';
    lastVitalDate?: Date;
    status: 'NORMAL' | 'WARNING' | 'CRITICAL';
    unit: string;
}

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    // Mock Patients List
    private mockPatients: PatientSummary[] = [
        { id: 1, name: 'Alice Patient', age: 45, gender: 'F', lastVitalDate: new Date(), status: 'NORMAL', unit: 'Cardiology' },
        { id: 8, name: 'Bob Smith', age: 62, gender: 'M', lastVitalDate: new Date(Date.now() - 86400000), status: 'WARNING', unit: 'Cardiology' },
        { id: 9, name: 'Charlie Brown', age: 75, gender: 'M', lastVitalDate: new Date(Date.now() - 3600000), status: 'CRITICAL', unit: 'ICU' },
        { id: 10, name: 'Diana Prince', age: 30, gender: 'F', lastVitalDate: new Date(Date.now() - 7200000), status: 'NORMAL', unit: 'Neurology' }
    ];

    getAssignedPatients() {
        return of(this.mockPatients).pipe(delay(600));
    }

    getPatientHistory(patientId: number) {
        // Mocking history generation
        const mockVitals: VitalsData[] = Array.from({ length: 5 }).map((_, i) => ({
            id: `v-${i}`,
            patientId: patientId,
            timestamp: new Date(Date.now() - i * 86400000),
            temperature: 36.5 + Math.random(),
            systolicBP: 110 + Math.floor(Math.random() * 30),
            diastolicBP: 70 + Math.floor(Math.random() * 20),
            heartRate: 60 + Math.floor(Math.random() * 40),
            weight: 70 + Math.random() * 2,
            source: 'MANUAL'
        }));

        return of({ vitals: mockVitals, trends: 'Stable' }).pipe(delay(600));
    }

    validateAlert(alertId: string, notes: string) {
        return of(true).pipe(delay(800));
    }

    getAppointments() {
        const appointments = [
            { id: 1, patientName: 'Alice Patient', time: '09:00 AM', type: 'Check-up', status: 'Confirmed' },
            { id: 2, patientName: 'Bob Smith', time: '10:30 AM', type: 'Follow-up', status: 'Pending' },
            { id: 3, patientName: 'Charlie Brown', time: '02:00 PM', type: 'Consultation', status: 'Confirmed' }
        ];
        return of(appointments).pipe(delay(500));
    }

    getMessages() {
        const messages = [
            { id: 1, sender: 'Alice Patient', subject: 'Side effects question', preview: 'I have been feeling dizzy...', date: new Date(), read: false },
            { id: 2, sender: 'Dr. House', subject: 'Consult result', preview: 'The lab results are in...', date: new Date(Date.now() - 86400000), read: true },
            { id: 3, sender: 'Nurse Joy', subject: 'Bed availability', preview: 'ICU bed 3 is now free.', date: new Date(Date.now() - 172800000), read: true }
        ];
        return of(messages).pipe(delay(500));
    }
}
