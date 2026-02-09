import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { DoctorSchedule } from '../doctor-schedule/doctor-schedule.entity';
import { DoctorException } from '../doctor-schedule/doctor-exception.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentRepo: Repository<Appointment>,
        @InjectRepository(DoctorSchedule)
        private scheduleRepo: Repository<DoctorSchedule>,
        @InjectRepository(DoctorException)
        private exceptionRepo: Repository<DoctorException>,
    ) { }

    async findAll() {
        return this.appointmentRepo.find();
    }

    async create(data: Partial<Appointment>) {
        const { doctorId, startDateTime, endDateTime } = data;
        if (!startDateTime || !endDateTime) {
            throw new ConflictException('Start and End times are required');
        }
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);

        // 1. Check if outside doctor schedule
        const dayOfWeek = start.getUTCDay();
        const schedule = await this.scheduleRepo.findOne({
            where: { doctorId, dayOfWeek },
        });

        if (!schedule) {
            throw new ConflictException('Doctor does not work on this day');
        }

        const [sh, sm] = schedule.startTime.split(':').map(Number);
        const [eh, em] = schedule.endTime.split(':').map(Number);

        const workStart = new Date(start);
        workStart.setUTCHours(sh, sm, 0, 0);
        const workEnd = new Date(start);
        workEnd.setUTCHours(eh, em, 0, 0);

        if (start < workStart || end > workEnd) {
            throw new ConflictException('Outside doctor schedule');
        }

        // 2. Overlap Rule: (start < existingEnd) AND (end > existingStart)
        const overlapQuery = this.appointmentRepo
            .createQueryBuilder('a')
            .where('a.doctorId = :doctorId', { doctorId })
            .andWhere("a.status = 'BOOKED'")
            .andWhere('a.startDateTime < :end AND a.endDateTime > :start', { start, end });

        const existingAppt = await overlapQuery.getOne();
        if (existingAppt) {
            throw new ConflictException('Slot not available (BOOKED)');
        }

        // 3. Exception Overlap
        const exceptionOverlap = await this.exceptionRepo
            .createQueryBuilder('e')
            .where('e.doctorId = :doctorId', { doctorId })
            .andWhere('e.startDateTime < :end AND e.endDateTime > :start', { start, end })
            .getOne();

        if (exceptionOverlap) {
            throw new ConflictException('Slot not available (EXCEPTION)');
        }

        const newAppointment = this.appointmentRepo.create(data);
        return this.appointmentRepo.save(newAppointment);
    }

    async updateStatus(id: string, status: string) {
        await this.appointmentRepo.update(id, { status });
        return this.appointmentRepo.findOneBy({ id });
    }

    async delete(id: string) {
        await this.appointmentRepo.delete(id);
    }
}
