import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const validatedUser = await this.authService.validateUserByCredentials(
      username,
      password,
    );
    if (!validatedUser) {
      throw new UnauthorizedException();
    }
    return validatedUser;
  }
}
