import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatorService, ComplianceStat } from '../../../core/services/coordinator.service';

@Component({
    selector: 'app-coordinator-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './coordinator-dashboard.component.html',
    styleUrl: './coordinator-dashboard.component.css'
})
export class CoordinatorDashboardComponent implements OnInit {
    coordinatorService = inject(CoordinatorService);

    dashboardStats = signal({ activeProtocols: 0, overdueReports: 0, pendingVerifications: 0 });
    complianceList = signal<ComplianceStat[]>([]);

    ngOnInit() {
        this.coordinatorService.getComplianceDashboard().subscribe((stats: any) => {
            this.dashboardStats.set(stats);
        });

        this.coordinatorService.getPatientCompliance().subscribe((list: ComplianceStat[]) => {
            this.complianceList.set(list);
        });
    }

    sendReminder(id: number) {
        this.coordinatorService.sendReminder(id).subscribe(() => {
            alert('Reminder sent successfully!');
        });
    }
}
