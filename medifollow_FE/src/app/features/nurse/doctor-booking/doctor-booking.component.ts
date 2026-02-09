import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulingService } from '../../../core/services/scheduling.service';

@Component({
  selector: 'app-doctor-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container-fluid py-5 bg-ice min-vh-100">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h1 class="display-5 text-navy fw-bold mb-1">Book Appointment</h1>
            <p class="text-muted lead mb-0">Select patient and service to find preferred clinical staff</p>
          </div>
          <div class="badge bg-white text-navy px-3 py-2 rounded-pill shadow-sm border">
            <i class="fas fa-shield-alt text-teal me-2"></i>Secure Booking
          </div>
        </div>
        
        <div class="row g-4">
          <!-- Left: Choices -->
          <div class="col-lg-4">
            <div class="card card-premium h-100 border-0 shadow-lg">
              <div class="card-body p-4 overflow-auto">
                
                <!-- Step 1: Patient -->
                <h5 class="text-navy mb-3 d-flex align-items-center">
                  <span class="step-num me-2">1</span> Choose Patient
                </h5>
                <div class="mb-4">
                  <select class="form-select border-0 bg-light p-3" [(ngModel)]="selectedPatientId">
                    <option value="">Select a patient...</option>
                    @for (patient of patients(); track patient.id) {
                      <option [value]="patient.id">{{ patient.name }}</option>
                    }
                  </select>
                </div>

                <!-- Step 2: Service -->
                <h5 class="text-navy mb-3 d-flex align-items-center">
                  <span class="step-num me-2">2</span> Select Service
                </h5>
                <div class="mb-4">
                  <select class="form-select border-0 bg-light p-3" [(ngModel)]="selectedServiceId" (change)="onServiceChange()">
                    <option value="">Select a service...</option>
                    @for (svc of services(); track svc.id) {
                      <option [value]="svc.id">{{ svc.name }}</option>
                    }
                  </select>
                </div>

                <!-- Step 3: Doctor (Conditional) -->
                @if (selectedServiceId) {
                  <h5 class="text-navy mb-3 d-flex align-items-center animate-fade-in">
                    <span class="step-num me-2">3</span> Choose Physician
                  </h5>
                  <div class="mb-4 animate-fade-in">
                    <select class="form-select border-0 bg-light p-3" [(ngModel)]="selectedDoctorId" (change)="loadSlots()">
                      <option value="">Select a doctor...</option>
                      @for (doc of doctors(); track doc.id) {
                        <option [value]="doc.id">{{ doc.name }}</option>
                      }
                    </select>
                  </div>
                }

                <!-- Step 4: Date -->
                <h5 class="text-navy mb-3 d-flex align-items-center">
                  <span class="step-num me-2">{{ selectedServiceId ? 4 : 3 }}</span> Select Date
                </h5>
                <div class="mb-4">
                  <input type="date" class="form-control border-0 bg-light p-3" [(ngModel)]="selectedDate" (change)="loadSlots()">
                </div>

                <div class="mt-4 pt-4 border-top" *ngIf="selectedDoctorId && selectedDate">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="text-muted small fw-bold">Availability Status</span>
                    <span class="badge bg-teal-soft text-teal">{{ slots().length }} slots</span>
                  </div>
                  <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-teal" [style.width]="(slots().length > 0 ? 100 : 0) + '%'"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Schedule Grid -->
          <div class="col-lg-8">
            <div class="card card-premium h-100 border-0 shadow-lg">
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="text-navy mb-0 d-flex align-items-center">
                    <span class="step-num me-2">{{ selectedServiceId ? 5 : 4 }}</span> Pick a Time
                  </h5>
                  <div class="d-flex gap-4">
                    <div class="d-flex align-items-center gap-2">
                      <div class="dot bg-success"></div>
                      <span class="small text-muted">Available</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <div class="dot bg-danger"></div>
                      <span class="small text-muted">Blocked</span>
                    </div>
                  </div>
                </div>

                @if (loading()) {
                  <div class="text-center py-5">
                    <div class="spinner-grow text-teal" role="status"></div>
                    <p class="mt-3 text-muted fw-500">Retrieving schedule...</p>
                  </div>
                } @else if (!selectedDoctorId || !selectedDate) {
                  <div class="text-center py-5">
                    <div class="empty-state-icon mb-4">
                      <i class="fas fa-calendar-check fa-3x"></i>
                    </div>
                    <h5 class="text-navy fw-bold">Ready to Book?</h5>
                    <p class="text-muted">Choose a patient, service and doctor to view available times</p>
                  </div>
                } @else if (slots().length === 0) {
                  <div class="text-center py-5">
                    <div class="empty-state-icon mb-4 variant-warning">
                      <i class="fas fa-calendar-times fa-3x"></i>
                    </div>
                    <h5 class="text-navy fw-bold">No Availability</h5>
                    <p class="text-muted">The selected staff has no working hours on this day.</p>
                  </div>
                } @else {
                  <div class="row g-3">
                    @for (slot of slots(); track slot.start) {
                      <div class="col-6 col-md-4 col-xl-3">
                        <button 
                          class="btn w-100 slot-card" 
                          [class.available]="slot.available"
                          [class.unavailable]="!slot.available"
                          [disabled]="!slot.available"
                          (click)="selectSlot(slot)"
                        >
                          <div class="slot-time">{{ formatTime(slot.start) }}</div>
                          <div class="slot-status">{{ slot.available ? 'AVAILABLE' : (slot.reason || 'BLOCKED') }}</div>
                        </button>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .text-navy { color: #0B1A26; }
    .text-teal { color: #22D3D3 !important; }
    .bg-teal { background-color: #22D3D3 !important; }
    .bg-teal-soft { background-color: rgba(34, 211, 211, 0.1); }
    .fw-extrabold { font-weight: 800; }
    .fw-500 { font-weight: 500; }
    .letter-spacing-1 { letter-spacing: 1px; }
    
    .step-num {
      width: 28px;
      height: 28px;
      background: #0B1A26;
      color: white;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 800;
    }

    .slot-card {
      padding: 1.5rem 1rem;
      border: 2px solid transparent;
      border-radius: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      height: 100%;
    }

    .slot-card.available {
      background: #ffffff;
      border-color: #f1f5f9;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .slot-card.available:hover {
      border-color: #22D3D3;
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(34, 211, 211, 0.2);
    }

    .slot-card.available .slot-time {
      font-size: 1.25rem;
      font-weight: 800;
      color: #0B1A26;
      font-family: 'Manrope', sans-serif;
    }

    .slot-card.available .slot-status {
      font-size: 0.65rem;
      font-weight: 800;
      color: #22D3D3;
      letter-spacing: 1px;
    }

    .slot-card.unavailable {
      background: #f8fafc;
      opacity: 0.6;
      border-style: dashed;
      border-color: #e2e8f0;
      cursor: not-allowed;
    }

    .slot-card.unavailable .slot-time {
      font-size: 1.1rem;
      font-weight: 600;
      color: #94a3b8;
    }

    .slot-card.unavailable .slot-status {
      font-size: 0.65rem;
      font-weight: 700;
      color: #ef4444;
    }

    .empty-state-icon {
      width: 100px;
      height: 100px;
      background: rgba(34, 211, 211, 0.1);
      color: #22D3D3;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .empty-state-icon.variant-warning {
      background: #fff7ed;
      color: #f97316;
    }

    .animate-fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dot { width: 8px; height: 8px; border-radius: 50%; }
  `]
})
export class DoctorBookingComponent {
  schedulingService = inject(SchedulingService);

  patients = signal<any[]>([]);
  services = signal<any[]>([]);
  doctors = signal<any[]>([]);
  slots = signal<any[]>([]);
  loading = signal(false);

  selectedPatientId = '';
  selectedServiceId = '';
  selectedDoctorId = '';
  selectedDate = new Date().toISOString().split('T')[0];

  constructor() {
    this.loadPatients();
    this.loadServices();
  }

  loadPatients() {
    this.schedulingService.getPatients().subscribe(data => this.patients.set(data));
  }

  loadServices() {
    this.schedulingService.getServices().subscribe(data => this.services.set(data));
  }

  onServiceChange() {
    this.selectedDoctorId = '';
    this.slots.set([]);
    if (this.selectedServiceId) {
      this.schedulingService.getDoctors(this.selectedServiceId).subscribe(data => {
        this.doctors.set(data);
      });
    } else {
      this.doctors.set([]);
    }
  }

  loadSlots() {
    if (!this.selectedDoctorId || !this.selectedDate) return;

    this.loading.set(true);
    this.schedulingService.getAvailableSlots(this.selectedDoctorId, this.selectedDate).subscribe({
      next: (res) => {
        this.slots.set(res.slots);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  formatTime(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  selectSlot(slot: any) {
    if (!this.selectedPatientId) {
      alert('Please select a patient first.');
      return;
    }

    if (confirm(`Book appointment for ${this.getSelectedPatientName()} at ${this.formatTime(slot.start)}?`)) {
      this.schedulingService.bookAppointment({
        doctorId: this.selectedDoctorId,
        patientId: this.selectedPatientId,
        startDateTime: slot.start,
        endDateTime: slot.end
      }).subscribe({
        next: () => {
          alert('Successfully booked!');
          this.loadSlots();
        },
        error: (err) => alert('Error: ' + err.error.message)
      });
    }
  }

  private getSelectedPatientName(): string {
    const p = this.patients().find(pat => pat.id === this.selectedPatientId);
    return p ? p.name : 'Selected Patient';
  }
}
