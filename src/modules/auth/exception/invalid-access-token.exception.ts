import { Token } from '../../../common/token/token';
import { KnittingException } from '../../../common/exception/knitting.exception';

export class InvalidAccessTokenException extends KnittingException {
  constructor(token: Token = null) {
    super(`토큰이 유효하지 않습니다. token: ${token?.value}`);
  }

  override getCode(): number {
    return 401;
  }
}
