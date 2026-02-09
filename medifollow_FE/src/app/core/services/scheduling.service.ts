import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SchedulingService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    getAvailableSlots(doctorId: string, date: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/doctors/${doctorId}/available-slots`, {
            params: { date }
        });
    }

    bookAppointment(data: { doctorId: string; patientId: string; startDateTime: string; endDateTime: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/appointments`, data);
    }

    getDoctors(): Observable<any[]> {
        // This would typically come from a users/staff service, 
        // but we can add a quick helper here or assume its in staff service
        return this.http.get<any[]>(`${this.apiUrl}/users`, {
            params: { role: 'PHYSICIAN' }
        });
    }
}
