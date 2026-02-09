import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll(@Query('role') role?: string, @Query('serviceId') serviceId?: string): Promise<User[]> {
        return this.usersService.findAll(role, serviceId);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() user: Partial<User>): Promise<User> {
        return this.usersService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User | null> {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
