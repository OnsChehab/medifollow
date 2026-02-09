import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../core/services/doctor.service';

@Component({
    selector: 'app-doctor-messages',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './doctor-messages.component.html',
    styleUrl: './doctor-messages.component.css'
})
export class DoctorMessagesComponent implements OnInit {
    doctorService = inject(DoctorService);
    messages = signal<any[]>([]);
    selectedMessage = signal<any>(null);

    ngOnInit() {
        this.doctorService.getMessages().subscribe((data: any[]) => {
            this.messages.set(data);
        });
    }

    selectMessage(msg: any) {
        this.selectedMessage.set(msg);
        // Mark as read logic here
    }
}
