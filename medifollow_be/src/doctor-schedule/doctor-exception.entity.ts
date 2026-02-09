import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('doctor_exceptions')
export class DoctorException {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    doctorId: string;

    @ApiProperty()
    @Column({ type: 'timestamp' })
    startDateTime: Date;

    @ApiProperty()
    @Column({ type: 'timestamp' })
    endDateTime: Date;

    @ApiProperty()
    @Column({ nullable: true })
    reason: string;
}
