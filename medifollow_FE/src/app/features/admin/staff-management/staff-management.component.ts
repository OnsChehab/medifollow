import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOpsService, StaffMember } from '../../../core/services/admin-ops.service';

@Component({
    selector: 'app-staff-management',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './staff-management.component.html',
    styleUrl: './staff-management.component.css'
})
export class StaffManagementComponent implements OnInit {
    adminOps = inject(AdminOpsService);
    staff = signal<StaffMember[]>([]);

    ngOnInit() {
        this.adminOps.getStaff().subscribe((data: StaffMember[]) => {
            this.staff.set(data);
        });
    }
}
