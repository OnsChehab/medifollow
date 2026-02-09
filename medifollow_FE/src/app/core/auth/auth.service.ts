import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { of, delay, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signal to track current user state
    currentUser = signal<User | null>(null);

    // Mock Database of Users
    private mockUsers: Record<string, User & { password: string }> = {
        'patient@medifollow.com': {
            id: 1, name: 'Alice Patient', email: 'patient@medifollow.com', role: 'PATIENT', password: '123'
        },
        'doctor@medifollow.com': {
            id: 2, name: 'Dr. Smith', email: 'doctor@medifollow.com', role: 'PHYSICIAN', password: '123'
        },
        'nurse@medifollow.com': {
            id: 3, name: 'Nurse Joy', email: 'nurse@medifollow.com', role: 'NURSE', password: '123'
        },
        'coordinator@medifollow.com': {
            id: 4, name: 'Sarah Coord', email: 'coordinator@medifollow.com', role: 'COORDINATOR', password: '123'
        },
        'auditor@medifollow.com': {
            id: 5, name: 'Mike Auditor', email: 'auditor@medifollow.com', role: 'AUDITOR', password: '123'
        },
        'admin@medifollow.com': {
            id: 6, name: 'Admin User', email: 'admin@medifollow.com', role: 'ADMIN', password: '123'
        },
        'super@medifollow.com': {
            id: 7, name: 'Super Admin', email: 'super@medifollow.com', role: 'SUPER_ADMIN', password: '123'
        }
    };

    private readonly STORAGE_KEY = 'medi_user';

    constructor(private router: Router) {
        this.restoreSession();
    }

    login(email: string, pass: string) {
        // Simulate API delay
        return of(this.mockUsers[email]).pipe(
            delay(800), // make it feel real
            tap(user => {
                if (user && user.password === pass) {
                    this.currentUser.set(user);
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
                } else {
                    throw new Error('Invalid credentials');
                }
            })
        );
    }

    logout() {
        this.currentUser.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
        this.router.navigate(['/auth/login']);
    }

    private restoreSession() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) {
            try {
                this.currentUser.set(JSON.parse(stored));
            } catch {
                localStorage.removeItem(this.STORAGE_KEY);
            }
        }
    }

    isAuthenticated(): boolean {
        return !!this.currentUser();
    }

    hasRole(allowedRoles: UserRole[]): boolean {
        const user = this.currentUser();
        return !!user && allowedRoles.includes(user.role);
    }
}
