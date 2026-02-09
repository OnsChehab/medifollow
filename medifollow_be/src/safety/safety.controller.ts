import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SafetyService } from './safety.service';
import { Alert } from './alert.entity';
import { Notification } from './notification.entity';

@ApiTags('safety')
@Controller('safety')
export class SafetyController {
    constructor(private readonly safetyService: SafetyService) { }

    @Get('alerts')
    findAllAlerts(): Promise<Alert[]> {
        return this.safetyService.findAllAlerts();
    }

    @Post('alerts')
    createAlert(@Body() alert: Partial<Alert>): Promise<Alert> {
        return this.safetyService.createAlert(alert);
    }

    @Get('notifications')
    findAllNotifications(): Promise<Notification[]> {
        return this.safetyService.findAllNotifications();
    }

    @Post('notifications')
    createNotification(@Body() notification: Partial<Notification>): Promise<Notification> {
        return this.safetyService.createNotification(notification);
    }
}
