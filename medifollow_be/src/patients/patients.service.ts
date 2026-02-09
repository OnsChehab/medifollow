import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,
    ) { }

    findAll(): Promise<Patient[]> {
        return this.patientsRepository.find({
            relations: ['user', 'service', 'assigned_physician'],
        });
    }

    findOne(id: string): Promise<Patient | null> {
        return this.patientsRepository.findOne({
            where: { id },
            relations: ['user', 'service', 'assigned_physician'],
        });
    }

    create(patient: Partial<Patient>): Promise<Patient> {
        const newPatient = this.patientsRepository.create(patient);
        return this.patientsRepository.save(newPatient);
    }

    async update(id: string, patient: Partial<Patient>): Promise<Patient | null> {
        await this.patientsRepository.update(id, patient);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.patientsRepository.delete(id);
    }
}
