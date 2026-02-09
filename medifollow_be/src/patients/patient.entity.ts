import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { HospitalService } from '../hospital-services/hospital-service.entity';

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ unique: true })
    medical_record_number: string;

    @Column({ type: 'date', nullable: true })
    date_of_birth: Date;

    @Column({ nullable: true })
    sex: string;

    @ManyToOne(() => HospitalService)
    @JoinColumn({ name: 'service_id' })
    service: HospitalService;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'assigned_physician_id' })
    assigned_physician: User;

    @Column({ type: 'timestamp', nullable: true })
    admission_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    discharge_at: Date;

    @Column({ default: 'ACTIVE' })
    status: string;
}
