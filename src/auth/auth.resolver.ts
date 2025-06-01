import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterInput, LoginResponse } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { SerializeOptions, UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators';
import { User } from './entities';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  @SerializeOptions({ type: User })
  register(@Args('registerInput') input: RegisterInput): Promise<User> {
    return this.authService.register(input);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser('id') userId: string): Promise<LoginResponse> {
    return this.authService.login(userId);
  }
}
