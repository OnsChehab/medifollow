import { Entity, Column, ObjectIdColumn, ObjectId, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { HospitalService } from '../hospital-services/hospital-service.entity';

@Entity('patients')
export class Patient {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @OneToOne(() => User)
    user: User;

    @Column({ unique: true })
    medical_record_number: string;

    @Column({ nullable: true })
    date_of_birth: Date;

    @Column({ nullable: true })
    sex: string;

    @ManyToOne(() => HospitalService)
    service: HospitalService;

    @ManyToOne(() => User, { nullable: true })
    assigned_physician: User;

    @Column({ nullable: true })
    admission_at: Date;

    @Column({ nullable: true })
    discharge_at: Date;

    @Column({ default: 'ACTIVE' })
    status: string;
}
