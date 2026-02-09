import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('doctor_exceptions')
export class DoctorException {
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
    startDateTime: Date;

    @ApiProperty()
    @Column()
    endDateTime: Date;

    @ApiProperty()
    @Column({ nullable: true })
    reason: string;
}
