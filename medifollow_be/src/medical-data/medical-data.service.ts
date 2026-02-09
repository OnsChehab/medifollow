import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VitalParameter } from './vital-parameter.entity';
import { Symptom } from './symptom.entity';

@Injectable()
export class MedicalDataService {
    constructor(
        @InjectRepository(VitalParameter)
        private vitalsRepository: Repository<VitalParameter>,
        @InjectRepository(Symptom)
        private symptomsRepository: Repository<Symptom>,
    ) { }

    // Vitals
    findAllVitals(): Promise<VitalParameter[]> {
        return this.vitalsRepository.find({ relations: ['patient'] });
    }

    createVital(vital: Partial<VitalParameter>): Promise<VitalParameter> {
        const newVital = this.vitalsRepository.create(vital);
        return this.vitalsRepository.save(newVital);
    }

    // Symptoms
    findAllSymptoms(): Promise<Symptom[]> {
        return this.symptomsRepository.find({ relations: ['patient'] });
    }

    createSymptom(symptom: Partial<Symptom>): Promise<Symptom> {
        const newSymptom = this.symptomsRepository.create(symptom);
        return this.symptomsRepository.save(newSymptom);
    }
}
