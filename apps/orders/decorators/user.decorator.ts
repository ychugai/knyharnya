import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthInfo = createParamDecorator(
  (fieldsToPick, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    const { authInfo } = response.locals;
    return authInfo;
  },
);
