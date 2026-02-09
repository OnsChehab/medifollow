import { Module } from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import { DoctorScheduleController } from './doctor-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorException } from './doctor-exception.entity';
import { Appointment } from '../appointments/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorSchedule, DoctorException, Appointment])],
  providers: [DoctorScheduleService],
  controllers: [DoctorScheduleController],
  exports: [DoctorScheduleService, TypeOrmModule],
})
export class DoctorScheduleModule { }
