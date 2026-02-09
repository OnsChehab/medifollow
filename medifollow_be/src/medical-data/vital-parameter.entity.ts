import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { VitalParameterType } from '../common/enums/enums';

@Entity('vital_parameters')
export class VitalParameter {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @ManyToOne(() => Patient)
    patient: Patient;

    @Column({
        enum: VitalParameterType,
    })
    type: VitalParameterType;

    @Column()
    value: number;

    @Column({ nullable: true })
    unit: string;

    @Column({ nullable: true })
    measured_at: Date;

    @CreateDateColumn()
    recorded_at: Date;
}
