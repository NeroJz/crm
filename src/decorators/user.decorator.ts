import { createParamDecorator, ExecutionContext } from '@nestjs/common';

async function getUserContext(ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
}


export const UserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getUserContext(ctx)
);