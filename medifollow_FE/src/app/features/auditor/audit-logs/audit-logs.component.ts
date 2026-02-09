import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditService, AuditLog } from '../../../core/services/audit.service';

@Component({
    selector: 'app-audit-logs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './audit-logs.component.html',
    styleUrl: './audit-logs.component.css'
})
export class AuditLogsComponent implements OnInit {
    auditService = inject(AuditService);
    logs = signal<AuditLog[]>([]);

    ngOnInit() {
        this.auditService.getAuditLogs().subscribe((data: AuditLog[]) => {
            this.logs.set(data);
        });
    }
}
