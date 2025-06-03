import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterInput, LoginResponse, LoginInput } from './dto';
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
  register(@Args('registerInput') registerInput: RegisterInput): Promise<User> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginInput') _: LoginInput,
    @CurrentUser('id') userId: string,
  ): Promise<LoginResponse> {
    return this.authService.login(userId);
  }
}
