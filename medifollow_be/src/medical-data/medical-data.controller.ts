import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedicalDataService } from './medical-data.service';
import { VitalParameter } from './vital-parameter.entity';
import { Symptom } from './symptom.entity';

@ApiTags('medical-data')
@Controller('medical-data')
export class MedicalDataController {
    constructor(private readonly medicalDataService: MedicalDataService) { }

    @Get('vitals')
    findAllVitals(): Promise<VitalParameter[]> {
        return this.medicalDataService.findAllVitals();
    }

    @Post('vitals')
    createVital(@Body() vital: Partial<VitalParameter>): Promise<VitalParameter> {
        return this.medicalDataService.createVital(vital);
    }

    @Get('symptoms')
    findAllSymptoms(): Promise<Symptom[]> {
        return this.medicalDataService.findAllSymptoms();
    }

    @Post('symptoms')
    createSymptom(@Body() symptom: Partial<Symptom>): Promise<Symptom> {
        return this.medicalDataService.createSymptom(symptom);
    }
}
