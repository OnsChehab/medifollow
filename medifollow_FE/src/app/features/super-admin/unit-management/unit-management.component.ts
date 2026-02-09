import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminService, HospitalUnit } from '../../../core/services/super-admin.service';

@Component({
    selector: 'app-unit-management',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './unit-management.component.html',
    styleUrl: './unit-management.component.css'
})
export class UnitManagementComponent implements OnInit {
    superAdminService = inject(SuperAdminService);
    units = signal<HospitalUnit[]>([]);

    ngOnInit() {
        this.superAdminService.getUnits().subscribe((data: HospitalUnit[]) => {
            this.units.set(data);
        });
    }
}
