import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../core/services/doctor.service';

@Component({
    selector: 'app-doctor-schedule',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './doctor-schedule.component.html',
    styleUrl: './doctor-schedule.component.css'
})
export class DoctorScheduleComponent implements OnInit {
    doctorService = inject(DoctorService);
    appointments = signal<any[]>([]);

    ngOnInit() {
        this.doctorService.getAppointments().subscribe((data: any[]) => {
            this.appointments.set(data);
        });
    }
}
