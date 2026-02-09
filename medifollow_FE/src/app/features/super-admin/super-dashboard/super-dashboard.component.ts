import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SuperAdminService } from '../../../core/services/super-admin.service';

@Component({
    selector: 'app-super-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './super-dashboard.component.html',
    styleUrl: './super-dashboard.component.css'
})
export class SuperDashboardComponent implements OnInit {
    superAdminService = inject(SuperAdminService);
    stats = signal({ totalHospitals: 0, totalUsers: 0, activeSessions: 0, systemHealth: 0 });

    ngOnInit() {
        this.superAdminService.getPlatformStats().subscribe((data: any) => {
            this.stats.set(data);
        });
    }
}
