import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireResponse } from './questionnaire-response.entity';

@Injectable()
export class QuestionnairesService {
    constructor(
        @InjectRepository(Questionnaire)
        private questionnairesRepository: Repository<Questionnaire>,
        @InjectRepository(QuestionnaireResponse)
        private responsesRepository: Repository<QuestionnaireResponse>,
    ) { }

    // Templates
    findAllTemplates(): Promise<Questionnaire[]> {
        return this.questionnairesRepository.find({ relations: ['service'] });
    }

    createTemplate(template: Partial<Questionnaire>): Promise<Questionnaire> {
        const newTemplate = this.questionnairesRepository.create(template);
        return this.questionnairesRepository.save(newTemplate);
    }

    // Responses
    findAllResponses(): Promise<QuestionnaireResponse[]> {
        return this.responsesRepository.find({ relations: ['questionnaire', 'patient'] });
    }

    createResponse(response: Partial<QuestionnaireResponse>): Promise<QuestionnaireResponse> {
        const newResponse = this.responsesRepository.create(response);
        return this.responsesRepository.save(newResponse);
    }
}
