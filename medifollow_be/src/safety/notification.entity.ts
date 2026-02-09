import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notifications')
export class Notification {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    type: string; // 'ALERT', 'REMINDER', 'MESSAGE'

    @Column({ nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ default: false })
    is_read: boolean;

    @CreateDateColumn()
    created_at: Date;
}
