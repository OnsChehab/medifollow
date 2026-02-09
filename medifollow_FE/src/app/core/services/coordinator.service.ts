import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

export interface ComplianceStat {
    patientId: number;
    name: string;
    protocol: string;
    lastReport: Date;
    missedReports: number;
    status: 'COMPLIANT' | 'AT_RISK' | 'NON_COMPLIANT';
}

@Injectable({
    providedIn: 'root'
})
export class CoordinatorService {

    private mockComplianceData: ComplianceStat[] = [
        { patientId: 1, name: 'Alice Patient', protocol: 'Post-Op Cardio', lastReport: new Date(), missedReports: 0, status: 'COMPLIANT' },
        { patientId: 8, name: 'Bob Smith', protocol: 'Diabetes Mgmt', lastReport: new Date(Date.now() - 86400000 * 2), missedReports: 1, status: 'AT_RISK' },
        { patientId: 9, name: 'Charlie Brown', protocol: 'Hypertension', lastReport: new Date(Date.now() - 86400000 * 5), missedReports: 4, status: 'NON_COMPLIANT' }
    ];

    getComplianceDashboard() {
        return of({
            activeProtocols: 15,
            overdueReports: 5,
            pendingVerifications: 3
        }).pipe(delay(500));
    }

    getPatientCompliance() {
        return of(this.mockComplianceData).pipe(delay(600));
    }

    sendReminder(patientId: number) {
        console.log(`Reminder sent to patient ${patientId}`);
        return of(true).pipe(delay(400));
    }
}
