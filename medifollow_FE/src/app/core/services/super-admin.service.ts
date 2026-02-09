import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    lastLogin: Date;
}

export interface HospitalUnit {
    id: string;
    name: string;
    hospital: string;
    head: string;
    occupancy: number;
    status: 'OPERATIONAL' | 'MAINTENANCE';
}

@Injectable({
    providedIn: 'root'
})
export class SuperAdminService {

    private mockUsers: PlatformUser[] = [
        { id: '1', name: 'Dr. John Smith', email: 'john@hospital.com', role: 'PHYSICIAN', status: 'ACTIVE', lastLogin: new Date() },
        { id: '2', name: 'Nurse Jane Doe', email: 'jane@hospital.com', role: 'NURSE', status: 'ACTIVE', lastLogin: new Date() },
        { id: '3', name: 'Admin Mike', email: 'mike@hospital.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: new Date() },
        { id: '4', name: 'Auditor Sarah', email: 'sarah@healthaudit.gov', role: 'AUDITOR', status: 'ACTIVE', lastLogin: new Date() }
    ];

    private mockUnits: HospitalUnit[] = [
        { id: 'u1', name: 'Cardiology Ward', hospital: 'General Hospital', head: 'Dr. House', occupancy: 85, status: 'OPERATIONAL' },
        { id: 'u2', name: 'Emergency Room', hospital: 'St. Marys', head: 'Dr. Strange', occupancy: 95, status: 'OPERATIONAL' },
        { id: 'u3', name: 'Pediatrics', hospital: 'City Care', head: 'Dr. Quinn', occupancy: 40, status: 'MAINTENANCE' }
    ];

    getPlatformStats() {
        return of({
            totalHospitals: 5,
            totalUsers: 245,
            activeSessions: 42,
            systemHealth: 99.9
        }).pipe(delay(500));
    }

    getUsers() {
        return of(this.mockUsers).pipe(delay(600));
    }

    getUnits() {
        return of(this.mockUnits).pipe(delay(400));
    }

    updateUserStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') {
        return of(true).pipe(delay(300));
    }
}
