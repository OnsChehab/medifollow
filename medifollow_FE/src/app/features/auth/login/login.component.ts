import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  fillCreds(e: string, p: string) {
    this.email = e;
    this.password = p;
  }

  onLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        switch (user.role) {
          case 'PATIENT': this.router.navigate(['/patient/dashboard']); break;
          case 'PHYSICIAN': this.router.navigate(['/doctor/dashboard']); break;
          case 'NURSE': this.router.navigate(['/nurse/dashboard']); break;
          case 'COORDINATOR': this.router.navigate(['/coordinator/dashboard']); break;
          case 'AUDITOR': this.router.navigate(['/auditor/dashboard']); break;
          case 'ADMIN': this.router.navigate(['/admin/dashboard']); break;
          case 'SUPER_ADMIN': this.router.navigate(['/super-admin/dashboard']); break;
          default: this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Invalid credentials. Please try again.');
      }
    });
  }
}
