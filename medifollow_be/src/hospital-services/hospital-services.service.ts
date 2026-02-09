import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalService } from './hospital-service.entity';

@Injectable()
export class HospitalServicesService {
    constructor(
        @InjectRepository(HospitalService)
        private hospitalServicesRepository: Repository<HospitalService>,
    ) { }

    findAll(): Promise<HospitalService[]> {
        return this.hospitalServicesRepository.find();
    }

    findOne(id: string): Promise<HospitalService | null> {
        return this.hospitalServicesRepository.findOneBy({ id });
    }

    create(hospitalService: Partial<HospitalService>): Promise<HospitalService> {
        const newService = this.hospitalServicesRepository.create(hospitalService);
        return this.hospitalServicesRepository.save(newService);
    }

    async update(id: string, hospitalService: Partial<HospitalService>): Promise<HospitalService | null> {
        await this.hospitalServicesRepository.update(id, hospitalService);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.hospitalServicesRepository.delete(id);
    }
}
