import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointments')
export class Appointment {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    doctorId: string;

    @ApiProperty()
    @Column()
    patientId: string;

    @ApiProperty()
    @Column({ type: 'timestamp' })
    startDateTime: Date;

    @ApiProperty()
    @Column({ type: 'timestamp' })
    endDateTime: Date;

    @ApiProperty()
    @Column({ default: 'BOOKED' })
    status: string; // BOOKED, CANCELLED, COMPLETED
}
