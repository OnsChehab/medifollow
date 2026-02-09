import { Entity, Column, ObjectIdColumn, ObjectId, CreateDateColumn } from 'typeorm';

@Entity('hospital_services')
export class HospitalService {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}
