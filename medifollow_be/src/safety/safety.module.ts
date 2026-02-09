import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alert.entity';
import { Notification } from './notification.entity';
import { SafetyService } from './safety.service';
import { SafetyController } from './safety.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Alert, Notification])],
    providers: [SafetyService],
    controllers: [SafetyController],
    exports: [SafetyService],
})
export class SafetyModule { }
