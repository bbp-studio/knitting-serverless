import { KnittingException } from '../../../common/exception/knitting.exception';

export class AuthorizationCodeAccessDeniedException extends KnittingException {
  constructor() {
    super('Resource server 로 부터 토큰을 받지 못했습니다.');
  }

  override getCode(): number {
    return 403;
  }
}
