import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { SeverityLevel } from '../common/enums/enums';

@Entity('symptoms')
export class Symptom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: SeverityLevel,
    })
    severity: SeverityLevel;

    @CreateDateColumn()
    reported_at: Date;

    @Column({ nullable: true })
    description: string;
}
