import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export function RoleGuard(role: string): CanMatchFn {
    return (route: Route, segments: UrlSegment[]) => {
        const authService = inject(AuthService);
        const router = inject(Router);
        const currentUser = authService.currentUser();

        if (!currentUser) {
            return false;
        }

        if (currentUser.role === role || role === 'ANY') {
            return true;
        }

        // Handle specific groupings if needed, e.g. STAFF_OR_ADMIN
        if (role === 'STAFF_OR_ADMIN') {
            const allowed = ['ADMIN', 'SUPER_ADMIN', 'PHYSICIAN', 'NURSE', 'COORDINATOR', 'AUDITOR'];
            return allowed.includes(currentUser.role);
        }

        return false;
    };
}
