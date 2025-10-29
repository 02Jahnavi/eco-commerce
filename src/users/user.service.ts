import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() { return this.repo.find(); }
  findByEmail(email: string) { return this.repo.findOne({ where: { email } }); }
  findById(id: number) { return this.repo.findOne({ where: { id } }); }
  create(user: Partial<User>) { return this.repo.save(user); }
}