import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOpsService } from '../../../core/services/admin-ops.service';

@Component({
    selector: 'app-alert-supervision',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert-supervision.component.html',
    styleUrl: './alert-supervision.component.css'
})
export class AlertSupervisionComponent implements OnInit {
    adminOps = inject(AdminOpsService);
    alerts = signal<any[]>([]);

    ngOnInit() {
        this.adminOps.getGlobalAlerts().subscribe((data) => {
            this.alerts.set(data);
        });
    }
}
