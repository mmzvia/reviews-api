import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { RegisterInput, LoginResponse } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<User> {
    const { username, password } = registerInput;
    const emailAlredyInUse = await this.userRepository.exists({
      where: { username },
    });
    if (emailAlredyInUse) {
      throw new ForbiddenException('Email already in use');
    }
    const hash = await argon.hash(password);
    const newUser = await this.userRepository.save({
      username,
      password: hash,
    });
    return newUser;
  }

  async login(userId: string): Promise<LoginResponse> {
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
