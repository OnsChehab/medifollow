import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalService } from './hospital-service.entity';
import { HospitalServicesService } from './hospital-services.service';
import { HospitalServicesController } from './hospital-services.controller';

@Module({
    imports: [TypeOrmModule.forFeature([HospitalService])],
    providers: [HospitalServicesService],
    controllers: [HospitalServicesController],
    exports: [HospitalServicesService],
})
export class HospitalServicesModule { }
