import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterInput, LoginResponseDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { SerializeOptions, UseGuards } from '@nestjs/common';
import { AuthUser } from './decorators';
import { User } from './entities';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @SerializeOptions({ type: User })
  register(@Args('registerInput') registerInput: RegisterInput): Promise<User> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  login(@AuthUser('id') userId: string): Promise<LoginResponseDto> {
    return this.authService.login(userId);
  }
}
