import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOpsService, QuestionnaireTemplate } from '../../../core/services/admin-ops.service';

@Component({
    selector: 'app-questionnaire-builder',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './questionnaire-builder.component.html',
    styleUrl: './questionnaire-builder.component.css'
})
export class QuestionnaireBuilderComponent implements OnInit {
    adminOps = inject(AdminOpsService);
    templates = signal<QuestionnaireTemplate[]>([]);

    ngOnInit() {
        this.adminOps.getTemplates().subscribe((data: QuestionnaireTemplate[]) => {
            this.templates.set(data);
        });
    }
}
