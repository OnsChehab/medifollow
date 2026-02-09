import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { Patient } from '../patients/patient.entity';

@Entity('questionnaire_responses')
export class QuestionnaireResponse {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @ManyToOne(() => Questionnaire)
    @JoinColumn({ name: 'questionnaire_id' })
    questionnaire: Questionnaire;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column({ nullable: true })
    started_at: Date;

    @Column({ nullable: true })
    completed_at: Date;

    @Column({ default: 'IN_PROGRESS' })
    status: string;

    @Column({ nullable: true })
    answers_json: any;

    @Column({ nullable: true })
    submitted_at: Date;
}
