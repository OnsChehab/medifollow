import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Get()
    @ApiOperation({ summary: 'List all appointments' })
    findAll() {
        return this.appointmentsService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Book a new appointment' })
    create(@Body() data: Partial<Appointment>) {
        return this.appointmentsService.create(data);
    }

    @Put(':id/status')
    @ApiOperation({ summary: 'Update appointment status' })
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.appointmentsService.updateStatus(id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Cancel/Delete appointment' })
    delete(@Param('id') id: string) {
        return this.appointmentsService.delete(id);
    }
}
