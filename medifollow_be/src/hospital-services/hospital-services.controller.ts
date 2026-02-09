import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HospitalServicesService } from './hospital-services.service';
import { HospitalService } from './hospital-service.entity';

@ApiTags('hospital-services')
@Controller('hospital-services')
export class HospitalServicesController {
    constructor(private readonly hospitalServicesService: HospitalServicesService) { }

    @Get()
    findAll(): Promise<HospitalService[]> {
        return this.hospitalServicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<HospitalService | null> {
        return this.hospitalServicesService.findOne(id);
    }

    @Post()
    create(@Body() hospitalService: Partial<HospitalService>): Promise<HospitalService> {
        return this.hospitalServicesService.create(hospitalService);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() hospitalService: Partial<HospitalService>): Promise<HospitalService | null> {
        return this.hospitalServicesService.update(id, hospitalService);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.hospitalServicesService.remove(id);
    }
}
