import { Entity, Column, ObjectIdColumn, ObjectId, CreateDateColumn } from 'typeorm';
import { UserRole } from '../common/enums/enums';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({
        enum: UserRole,
    })
    role: UserRole;

    @Column({ nullable: true })
    hospital_serviceId: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}
