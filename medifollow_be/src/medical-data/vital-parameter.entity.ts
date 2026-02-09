import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { VitalParameterType } from '../common/enums/enums';

@Entity('vital_parameters')
export class VitalParameter {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column({
        type: 'enum',
        enum: VitalParameterType,
    })
    type: VitalParameterType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value: number;

    @Column({ nullable: true })
    unit: string;

    @Column({ type: 'timestamp', nullable: true })
    measured_at: Date;

    @CreateDateColumn()
    recorded_at: Date;
}
