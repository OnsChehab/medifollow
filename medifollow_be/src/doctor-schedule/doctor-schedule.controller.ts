import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DoctorScheduleService } from './doctor-schedule.service';
import { DoctorSchedule } from './doctor-schedule.entity';
import { DoctorException } from './doctor-exception.entity';

@ApiTags('doctor-schedule')
@Controller()
export class DoctorScheduleController {
    constructor(private readonly scheduleService: DoctorScheduleService) { }

    @Post('doctor-schedules')
    @ApiOperation({ summary: 'Create a weekly schedule for a doctor' })
    createSchedule(@Body() data: Partial<DoctorSchedule>) {
        return this.scheduleService.create(data);
    }

    @Get('doctor-schedules/:doctorId')
    @ApiOperation({ summary: 'Get all weekly schedules for a doctor' })
    getSchedules(@Param('doctorId') doctorId: string) {
        return this.scheduleService.findByDoctor(doctorId);
    }

    @Put('doctor-schedules/:id')
    @ApiOperation({ summary: 'Update a weekly schedule' })
    updateSchedule(@Param('id') id: string, @Body() data: Partial<DoctorSchedule>) {
        return this.scheduleService.update(id, data);
    }

    @Delete('doctor-schedules/:id')
    @ApiOperation({ summary: 'Delete a weekly schedule' })
    deleteSchedule(@Param('id') id: string) {
        return this.scheduleService.delete(id);
    }

    // Exceptions
    @Post('doctor-exceptions')
    @ApiOperation({ summary: 'Create a one-time blocked period' })
    createException(@Body() data: Partial<DoctorException>) {
        return this.scheduleService.createException(data);
    }

    @Get('doctor-exceptions/:doctorId')
    @ApiOperation({ summary: 'Get all exceptions for a doctor' })
    getExceptions(@Param('doctorId') doctorId: string) {
        return this.scheduleService.findExceptionsByDoctor(doctorId);
    }

    @Delete('doctor-exceptions/:id')
    @ApiOperation({ summary: 'Delete an exception' })
    deleteException(@Param('id') id: string) {
        return this.scheduleService.deleteException(id);
    }

    // Available Slots
    @Get('doctors/:doctorId/available-slots')
    @ApiOperation({ summary: 'Check doctor availability for a specific date' })
    getAvailableSlots(
        @Param('doctorId') doctorId: string,
        @Query('date') date: string,
    ) {
        return this.scheduleService.getAvailableSlots(doctorId, date);
    }
}
