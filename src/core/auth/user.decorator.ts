import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthException } from '../../common/exception/knitting.exception';
import { InternalServerException } from '../../common/exception/internal-server.exception';

export const CurrentUserClaims = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    try {
      if (context['contextType'] !== 'http') {
        return;
      }

      const { user } = context.getArgs()[0];
      return user;
    } catch (e) {
      throw new InternalServerException('currentUser 에러');
    }
  },
);
