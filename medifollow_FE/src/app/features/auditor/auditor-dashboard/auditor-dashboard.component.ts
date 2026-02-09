import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuditService } from '../../../core/services/audit.service';

@Component({
    selector: 'app-auditor-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './auditor-dashboard.component.html',
    styleUrl: './auditor-dashboard.component.css'
})
export class AuditorDashboardComponent implements OnInit {
    auditService = inject(AuditService);
    stats = signal({ totalActionsToday: 0, securityAlerts: 0, activeUsers: 0 });

    ngOnInit() {
        this.auditService.getDashboardStats().subscribe((data: any) => {
            this.stats.set(data);
        });
    }
}
