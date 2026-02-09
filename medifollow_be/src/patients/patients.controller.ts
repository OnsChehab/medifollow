import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @Get()
    findAll(): Promise<Patient[]> {
        return this.patientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Patient | null> {
        return this.patientsService.findOne(id);
    }

    @Post()
    create(@Body() patient: Partial<Patient>): Promise<Patient> {
        return this.patientsService.create(patient);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() patient: Partial<Patient>): Promise<Patient | null> {
        return this.patientsService.update(id, patient);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.patientsService.remove(id);
    }
}
