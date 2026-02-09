import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VitalParameter } from './vital-parameter.entity';
import { Symptom } from './symptom.entity';
import { MedicalDataService } from './medical-data.service';
import { MedicalDataController } from './medical-data.controller';

@Module({
    imports: [TypeOrmModule.forFeature([VitalParameter, Symptom])],
    providers: [MedicalDataService],
    controllers: [MedicalDataController],
    exports: [MedicalDataService],
})
export class MedicalDataModule { }
