import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

export interface AuditLog {
    id: string;
    timestamp: Date;
    actor: string;
    role: string;
    action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT';
    resource: string;
    details: string;
    status: 'SUCCESS' | 'FAILURE' | 'WARNING';
}

@Injectable({
    providedIn: 'root'
})
export class AuditService {

    private mockLogs: AuditLog[] = [
        { id: 'log-1', timestamp: new Date(), actor: 'Dr. House', role: 'PHYSICIAN', action: 'UPDATE', resource: 'Patient Record #123', details: 'Updated medication list', status: 'SUCCESS' },
        { id: 'log-2', timestamp: new Date(Date.now() - 3600000), actor: 'Nurse Joy', role: 'NURSE', action: 'CREATE', resource: 'Vitals Entry', details: 'Recorded BP 120/80', status: 'SUCCESS' },
        { id: 'log-3', timestamp: new Date(Date.now() - 7200000), actor: 'Admin', role: 'ADMIN', action: 'DELETE', resource: 'User Account', details: 'Removed inactive user', status: 'WARNING' },
        { id: 'log-4', timestamp: new Date(Date.now() - 86400000), actor: 'Unknown', role: 'GUEST', action: 'LOGIN', resource: 'Auth System', details: 'Failed login attempt from IP 192.168.1.1', status: 'FAILURE' },
        { id: 'log-5', timestamp: new Date(Date.now() - 90000000), actor: 'Dr. House', role: 'PHYSICIAN', action: 'READ', resource: 'Patient Record #999', details: 'Accessed sensitive history', status: 'SUCCESS' }
    ];

    getAuditLogs() {
        return of(this.mockLogs).pipe(delay(500));
    }

    getDashboardStats() {
        return of({
            totalActionsToday: 145,
            securityAlerts: 2,
            activeUsers: 12
        }).pipe(delay(400));
    }
}
