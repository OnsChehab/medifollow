import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointments')
export class Appointment {
    @ApiProperty()
    @ObjectIdColumn()
    _id: ObjectId;

    @ApiProperty()
    @Column()
    id: string;

    @ApiProperty()
    @Column()
    doctorId: string;

    @ApiProperty()
    @Column()
    patientId: string;

    @ApiProperty()
    @Column()
    startDateTime: Date;

    @ApiProperty()
    @Column()
    endDateTime: Date;

    @ApiProperty()
    @Column({ default: 'BOOKED' })
    status: string; // BOOKED, CANCELLED, COMPLETED
}
