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
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const dbName = configService.get<string>('DB_NAME');
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');

        const options: any = {
          type: 'mongodb',
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('DB_SYNC'),
          database: dbName,
        };

        if (username && password) {
          options.host = host;
          options.port = port;
          options.username = username;
          options.password = password;
        } else {
          options.url = `mongodb://${host}:${port}/${dbName}`;
        }

        return options;
      },
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
