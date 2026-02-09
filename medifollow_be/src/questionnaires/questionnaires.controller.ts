import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionnairesService } from './questionnaires.service';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireResponse } from './questionnaire-response.entity';

@ApiTags('questionnaires')
@Controller('questionnaires')
export class QuestionnairesController {
    constructor(private readonly questionnairesService: QuestionnairesService) { }

    @Get()
    findAllTemplates(): Promise<Questionnaire[]> {
        return this.questionnairesService.findAllTemplates();
    }

    @Post()
    createTemplate(@Body() template: Partial<Questionnaire>): Promise<Questionnaire> {
        return this.questionnairesService.createTemplate(template);
    }

    @Get('responses')
    findAllResponses(): Promise<QuestionnaireResponse[]> {
        return this.questionnairesService.findAllResponses();
    }

    @Post('responses')
    createResponse(@Body() response: Partial<QuestionnaireResponse>): Promise<QuestionnaireResponse> {
        return this.questionnairesService.createResponse(response);
    }
}
