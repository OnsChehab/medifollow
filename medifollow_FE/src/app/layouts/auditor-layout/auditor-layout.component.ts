import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-auditor-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './auditor-layout.component.html',
    styles: [`
        .wrapper { display: flex; width: 100%; align-items: stretch; }
        #sidebar-wrapper { min-height: 100vh; margin-left: -15rem; transition: margin .25s ease-out; width: 15rem; background-color: #fff3e0; border-right: 1px solid #ffe0b2; }
        #sidebar-wrapper .sidebar-heading { padding: 0.875rem 1.25rem; font-size: 1.2rem; color: #ef6c00; }
        #page-content-wrapper { width: 100%; }
        .toggled #sidebar-wrapper { margin-left: 0; }
        @media (min-width: 768px) {
            #sidebar-wrapper { margin-left: 0; }
            .toggled #sidebar-wrapper { margin-left: -15rem; }
        }
    `]
})
export class AuditorLayoutComponent {
    authService = inject(AuthService);
    isSidebarCollapsed = false;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
}
