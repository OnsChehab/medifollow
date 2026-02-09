import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DoctorSchedule } from '../doctor-schedule/doctor-schedule.entity';
import { DoctorException } from '../doctor-schedule/doctor-exception.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, DoctorSchedule, DoctorException])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule { }
