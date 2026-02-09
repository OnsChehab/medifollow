import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SeverityLevel } from '../common/enums/enums';

@Entity('alerts')
export class Alert {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'reciever_id' })
    receiver: User;

    @Column()
    type: string; // 'VITAL', 'SYMPTOM', 'QUESTIONNAIRE', 'MISSING'

    @Column({
        type: 'enum',
        enum: SeverityLevel,
    })
    severity: SeverityLevel;

    @Column({ default: 'ACTIVE' })
    status: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    triggered_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    acknowledged_at: Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'acknowledged_by_id' })
    acknowledged_by: User;
}
