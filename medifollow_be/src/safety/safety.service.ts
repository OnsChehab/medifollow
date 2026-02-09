import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alert.entity';
import { Notification } from './notification.entity';

@Injectable()
export class SafetyService {
    constructor(
        @InjectRepository(Alert)
        private alertsRepository: Repository<Alert>,
        @InjectRepository(Notification)
        private notificationsRepository: Repository<Notification>,
    ) { }

    // Alerts
    findAllAlerts(): Promise<Alert[]> {
        return this.alertsRepository.find({ relations: ['receiver', 'acknowledged_by'] });
    }

    createAlert(alert: Partial<Alert>): Promise<Alert> {
        const newAlert = this.alertsRepository.create(alert);
        return this.alertsRepository.save(newAlert);
    }

    // Notifications
    findAllNotifications(): Promise<Notification[]> {
        return this.notificationsRepository.find({ relations: ['user'] });
    }

    createNotification(notification: Partial<Notification>): Promise<Notification> {
        const newNotification = this.notificationsRepository.create(notification);
        return this.notificationsRepository.save(newNotification);
    }
}
