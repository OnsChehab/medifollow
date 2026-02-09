import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { Patient } from '../patients/patient.entity';

@Entity('questionnaire_responses')
export class QuestionnaireResponse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Questionnaire)
    @JoinColumn({ name: 'questionnaire_id' })
    questionnaire: Questionnaire;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column({ type: 'timestamp', nullable: true })
    started_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    completed_at: Date;

    @Column({ default: 'IN_PROGRESS' })
    status: string;

    @Column({ type: 'jsonb', nullable: true })
    answers_json: any;

    @Column({ type: 'timestamp', nullable: true })
    submitted_at: Date;
}
