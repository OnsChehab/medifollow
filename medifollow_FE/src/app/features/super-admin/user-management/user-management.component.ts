import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminService, PlatformUser } from '../../../core/services/super-admin.service';

@Component({
    selector: 'app-user-management',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-management.component.html',
    styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
    superAdminService = inject(SuperAdminService);
    users = signal<PlatformUser[]>([]);

    ngOnInit() {
        this.superAdminService.getUsers().subscribe((data: PlatformUser[]) => {
            this.users.set(data);
        });
    }
}
