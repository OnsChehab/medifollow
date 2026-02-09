import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

export interface StaffMember {
    id: string;
    name: string;
    role: 'PHYSICIAN' | 'NURSE';
    specialty?: string;
    ward?: string;
    email: string;
}

export interface QuestionnaireTemplate {
    id: string;
    title: string;
    description: string;
    questionsCount: number;
    lastUpdated: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AdminOpsService {

    private mockStaff: StaffMember[] = [
        { id: 's1', name: 'Dr. Gregory House', role: 'PHYSICIAN', specialty: 'Diagnostics', email: 'house@medifollow.com' },
        { id: 's2', name: 'Nurse Jackie', role: 'NURSE', ward: 'Floor 3', email: 'jackie@medifollow.com' },
        { id: 's3', name: 'Dr. Shaun Murphy', role: 'PHYSICIAN', specialty: 'Surgery', email: 'shaun@medifollow.com' }
    ];

    private mockTemplates: QuestionnaireTemplate[] = [
        { id: 't1', title: 'Post-Op Daily Check', description: 'Monitoring recovery milestones', questionsCount: 5, lastUpdated: new Date() },
        { id: 't2', title: 'Standard Admission', description: 'Inital intake assessment', questionsCount: 12, lastUpdated: new Date() }
    ];

    getStaff() {
        return of(this.mockStaff).pipe(delay(500));
    }

    getTemplates() {
        return of(this.mockTemplates).pipe(delay(400));
    }

    getGlobalAlerts() {
        return of([
            { id: 'a1', level: 'CRITICAL', message: 'Hyperkalemia detected - Patient #102', time: new Date() },
            { id: 'a2', level: 'WARNING', message: 'Nurse non-response to symptom - Patient #55', time: new Date() }
        ]).pipe(delay(300));
    }
}
