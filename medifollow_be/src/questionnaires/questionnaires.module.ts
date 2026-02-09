import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireResponse } from './questionnaire-response.entity';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesController } from './questionnaires.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Questionnaire, QuestionnaireResponse])],
    providers: [QuestionnairesService],
    controllers: [QuestionnairesController],
    exports: [QuestionnairesService],
})
export class QuestionnairesModule { }
