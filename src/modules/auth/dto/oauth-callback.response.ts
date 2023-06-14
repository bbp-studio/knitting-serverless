import { Token } from '../../../common/token/token';

/**
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code-response
 * @property code
 * @property state
 * @property error
 * @property error_description
 */
export class OauthCallbackResponse {
  code: string;
  state: string = null;
  error: string = null;
  error_description: string = null;
  redirectUri: string = null;

  constructor(
    code: Token,
    state: string,
    error: string,
    error_description: string,
    redirectUri: string,
  ) {}

  getCode(): Token {
    return new Token(this.code);
  }

  isAccessDenied(): boolean {
    return this.error == 'access_denied';
  }
}
