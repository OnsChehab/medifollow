import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(role?: string, serviceId?: string): Promise<User[]> {
        const where: any = {};
        if (role) where.role = role;
        if (serviceId) where.hospital_serviceId = serviceId;

        return this.usersRepository.find({ where });
    }

    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    create(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        await this.usersRepository.update(id, user);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
