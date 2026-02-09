import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-coordinator-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './coordinator-layout.component.html',
    styles: [`
        .wrapper { display: flex; width: 100%; align-items: stretch; }
        #sidebar-wrapper { min-height: 100vh; margin-left: -15rem; transition: margin .25s ease-out; width: 15rem; background-color: #e0f2f1; border-right: 1px solid #80cbc4; }
        #sidebar-wrapper .sidebar-heading { padding: 0.875rem 1.25rem; font-size: 1.2rem; color: #00695c; }
        #page-content-wrapper { width: 100%; }
        .toggled #sidebar-wrapper { margin-left: 0; }
        @media (min-width: 768px) {
            #sidebar-wrapper { margin-left: 0; }
            .toggled #sidebar-wrapper { margin-left: -15rem; }
        }
    `]
})
export class CoordinatorLayoutComponent {
    authService = inject(AuthService);
    isSidebarCollapsed = false;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
}
