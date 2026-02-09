import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HospitalServicesModule } from './hospital-services/hospital-services.module';
import { PatientsModule } from './patients/patients.module';
import { MedicalDataModule } from './medical-data/medical-data.module';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { SafetyModule } from './safety/safety.module';
import { DoctorScheduleModule } from './doctor-schedule/doctor-schedule.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    HospitalServicesModule,
    PatientsModule,
    MedicalDataModule,
    QuestionnairesModule,
    SafetyModule,
    DoctorScheduleModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
