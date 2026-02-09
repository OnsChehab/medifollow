import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { SeverityLevel } from '../common/enums/enums';

@Entity('symptoms')
export class Symptom {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column()
    name: string;

    @Column({
        enum: SeverityLevel,
    })
    severity: SeverityLevel;

    @CreateDateColumn()
    reported_at: Date;

    @Column({ nullable: true })
    description: string;
}
