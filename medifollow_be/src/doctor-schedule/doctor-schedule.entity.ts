import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('doctor_schedules')
export class DoctorSchedule {
    @ApiProperty()
    @ObjectIdColumn()
    _id: ObjectId;

    @ApiProperty()
    @Column()
    id: string;

    @ApiProperty()
    @Column()
    doctorId: string;

    @ApiProperty({ description: '0-6 (Sun-Sat)' })
    @Column()
    dayOfWeek: number;

    @ApiProperty({ example: '08:00' })
    @Column()
    startTime: string;

    @ApiProperty({ example: '16:00' })
    @Column()
    endTime: string;

    @ApiProperty({ description: 'Duration in minutes' })
    @Column()
    slotDuration: number;
}
