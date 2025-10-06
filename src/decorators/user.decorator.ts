import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';


const getUserContext = (ctx: ExecutionContext): User => {
  return ctx.switchToHttp().getRequest().user;
}


export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getUserContext(ctx)
);