import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-super-admin-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './super-admin-layout.component.html',
    styles: [`
        .wrapper { display: flex; width: 100%; align-items: stretch; }
        #sidebar-wrapper { 
            min-height: 100vh; 
            margin-left: -15rem; 
            transition: margin .25s ease-out; 
            width: 15rem; 
            background-color: var(--navy); 
            border-right: 1px solid rgba(255,255,255,0.05); 
        }
        #sidebar-wrapper .sidebar-heading { 
            padding: 1.5rem 1.25rem; 
            font-size: 1.2rem; 
            color: #ffffff; 
            font-family: 'Manrope', sans-serif;
            font-weight: 800;
        }
        #sidebar-wrapper .list-group-item {
            color: rgba(255,255,255,0.7);
            background: transparent;
            border: none;
            margin: 4px 12px;
            padding: 12px 16px;
            border-radius: 8px;
        }
        #sidebar-wrapper .list-group-item.active {
            background-color: rgba(34, 211, 211, 0.1) !important;
            color: #22d3d3 !important;
        }
        #sidebar-wrapper .list-group-item:hover:not(.active) {
            background-color: rgba(255,255,255,0.05);
            color: #ffffff;
        }
        #page-content-wrapper { width: 100%; background-color: var(--background); }
        .toggled #sidebar-wrapper { margin-left: 0; }
        @media (min-width: 768px) {
            #sidebar-wrapper { margin-left: 0; }
            .toggled #sidebar-wrapper { margin-left: -15rem; }
        }
    `]
})
export class SuperAdminLayoutComponent {
    authService = inject(AuthService);
    isSidebarCollapsed = false;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
}
