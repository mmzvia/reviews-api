import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (key: keyof User | undefined, context: ExecutionContext): unknown => {
    const user = GqlExecutionContext.create(context).getContext().req.user;
    if (!user) {
      return null;
    }
    return key ? user[key] : user;
  },
);
