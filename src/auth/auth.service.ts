import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { RegisterInput, LoginResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password }: RegisterInput): Promise<User> {
    const emailExists = await this.userRepository.exists({
      where: { username },
    });
    if (emailExists) {
      throw new ForbiddenException('Email already in use');
    }
    const hash = await argon.hash(password);
    const user = this.userRepository.create({
      username,
      password: hash,
    });
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async login(userId: string): Promise<LoginResponseDto> {
    const payload: JwtPayload = { sub: userId };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async validateUserByCredentials(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      return null;
    }
    const passwordVerified = await argon.verify(user.password, password);
    if (!passwordVerified) {
      throw null;
    }
    return user;
  }

  async validateUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
