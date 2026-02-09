import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-back-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './back-layout.component.html',
    styleUrl: './back-layout.component.css'
})
export class BackLayoutComponent {
    authService = inject(AuthService);
    isSidebarCollapsed = false;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
}
