import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { HospitalService } from '../hospital-services/hospital-service.entity';

@Entity('questionnaires')
export class Questionnaire {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => HospitalService)
    @JoinColumn({ name: 'service_id' })
    service: HospitalService;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    frequency: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}
