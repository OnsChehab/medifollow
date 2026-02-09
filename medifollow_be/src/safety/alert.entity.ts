import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SeverityLevel } from '../common/enums/enums';

@Entity('alerts')
export class Alert {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @ManyToOne(() => User)
    receiver: User;

    @Column()
    type: string; // 'VITAL', 'SYMPTOM', 'QUESTIONNAIRE', 'MISSING'

    @Column({
        enum: SeverityLevel,
    })
    severity: SeverityLevel;

    @Column({ default: 'ACTIVE' })
    status: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    triggered_at: Date;

    @Column({ nullable: true })
    acknowledged_at: Date;

    @ManyToOne(() => User, { nullable: true })
    acknowledged_by: User;
}
