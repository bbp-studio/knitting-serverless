import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../../../common/token/token';

/**
 * https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code-response
 * @property code
 * @property state
 * @property error
 * @property error_description
 */
export class OauthCallbackResponse {
  @ApiProperty({
    description: 'code',
  })
  code: string;
  @ApiProperty({
    description: 'state',
  })
  state: string = null;
  @ApiProperty({
    description: 'error',
  })
  error: string = null;
  @ApiProperty({
    description: 'error_description',
  })
  error_description: string = null;
  @ApiProperty({
    description: '리다이렉트 uri',
  })
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
