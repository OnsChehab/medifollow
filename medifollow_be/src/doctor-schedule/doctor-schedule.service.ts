import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorException } from './doctor-exception.entity';
import { Appointment } from '../appointments/appointment.entity';

function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart < bEnd && bStart < aEnd;
}

@Injectable()
export class DoctorScheduleService {
    constructor(
        @InjectRepository(DoctorSchedule)
        private scheduleRepo: Repository<DoctorSchedule>,

        @InjectRepository(DoctorException)
        private exceptionRepo: Repository<DoctorException>,

        @InjectRepository(Appointment)
        private appointmentRepo: Repository<Appointment>,
    ) { }

    async findAll() {
        return this.scheduleRepo.find();
    }

    async findByDoctor(doctorId: string) {
        return this.scheduleRepo.findBy({ doctorId });
    }

    async create(data: Partial<DoctorSchedule>) {
        const schedule = this.scheduleRepo.create(data);
        return this.scheduleRepo.save(schedule);
    }

    async update(id: string, data: Partial<DoctorSchedule>) {
        await this.scheduleRepo.update(id, data);
        return this.scheduleRepo.findOneBy({ id });
    }

    async delete(id: string) {
        await this.scheduleRepo.delete(id);
    }

    // Exceptions
    async findExceptionsByDoctor(doctorId: string) {
        return this.exceptionRepo.findBy({ doctorId });
    }

    async createException(data: Partial<DoctorException>) {
        const exception = this.exceptionRepo.create(data);
        return this.exceptionRepo.save(exception);
    }

    async deleteException(id: string) {
        await this.exceptionRepo.delete(id);
    }

    async getAvailableSlots(doctorId: string, date: string) {
        // date = "YYYY-MM-DD"
        const dayStart = new Date(`${date}T00:00:00.000Z`);
        const dayEnd = new Date(`${date}T23:59:59.999Z`);

        const dayOfWeek = dayStart.getUTCDay();

        const schedule = await this.scheduleRepo.findOne({
            where: {
                doctorId: doctorId,
                dayOfWeek: dayOfWeek,
            },
        });

        if (!schedule) {
            return { doctorId, date, slots: [] };
        }

        const slotMinutes = schedule.slotDuration;

        const [sh, sm] = schedule.startTime.split(':').map(Number);
        const [eh, em] = schedule.endTime.split(':').map(Number);

        const workStart = new Date(dayStart);
        workStart.setUTCHours(sh, sm, 0, 0);

        const workEnd = new Date(dayStart);
        workEnd.setUTCHours(eh, em, 0, 0);

        // get blocked exceptions
        const exceptions = await this.exceptionRepo
            .createQueryBuilder('e')
            .where('e.doctorId = :doctorId', { doctorId })
            .andWhere('e.startDateTime < :dayEnd AND e.endDateTime > :dayStart', { dayStart, dayEnd })
            .getMany();

        // get booked appointments
        const appointments = await this.appointmentRepo
            .createQueryBuilder('a')
            .where('a.doctorId = :doctorId', { doctorId })
            .andWhere("a.status = 'BOOKED'")
            .andWhere('a.startDateTime < :dayEnd AND a.endDateTime > :dayStart', { dayStart, dayEnd })
            .getMany();

        const slots: any[] = [];

        for (let t = new Date(workStart); t < workEnd; t = addMinutes(t, slotMinutes)) {
            const slotStart = new Date(t);
            const slotEnd = addMinutes(slotStart, slotMinutes);

            if (slotEnd > workEnd) break;

            let available = true;
            let reason: string | null = null;

            const exc = exceptions.find((x) =>
                overlaps(slotStart, slotEnd, x.startDateTime, x.endDateTime),
            );

            if (exc) {
                available = false;
                reason = 'EXCEPTION';
            }

            const appt = appointments.find((x) =>
                overlaps(slotStart, slotEnd, x.startDateTime, x.endDateTime),
            );

            if (appt) {
                available = false;
                reason = 'BOOKED';
            }

            slots.push({
                start: slotStart.toISOString(),
                end: slotEnd.toISOString(),
                available,
                reason,
            });
        }

        return {
            doctorId,
            date,
            slotDuration: slotMinutes,
            slots,
        };
    }
}
