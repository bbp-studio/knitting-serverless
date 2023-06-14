import { Token } from './token';
import { IdToken } from './id-token';
import { Base64Service } from '../crypto/base64.service';

export class TokenResponseSnake {
  token_type: string;
  access_token: string;
  id_token: string = null;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string = null;

  constructor(
    token_type: string,
    access_token: string,
    id_token: string,
    expires_in: number,
    refresh_token: string,
    refresh_token_expires_in: number,
    scope: string = null,
  ) {
    this.token_type = token_type;
    this.access_token = access_token;
    this.id_token = id_token;
    this.expires_in = expires_in;
    this.refresh_token = refresh_token;
    this.refresh_token_expires_in = refresh_token_expires_in;
    this.scope = scope;
  }

  toTokenResponse(): TokenResponse {
    return new TokenResponse(
      this.token_type,
      new Token(this.access_token),
      new Token(this.id_token),
      this.expires_in,
      new Token(this.refresh_token),
      this.refresh_token_expires_in,
      this.scope,
    );
  }
}
/**
 * id token, access token, refresh token 모두 포함됩니다.
 */
export class TokenResponse {
  tokenType: string;
  accessToken: Token;
  idToken: Token = null;
  expiresIn: number;
  refreshToken: Token;
  refreshTokenExpiresIn: number;
  scope: string = null;

  constructor(
    tokenType: string,
    accessToken: Token,
    idToken: Token,
    expiresIn: number,
    refreshToken: Token,
    refreshTokenExpiresIn: number,
    scope: string = null,
  ) {
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    this.scope = scope;
  }

  /**
   *
   * @return
   */
  decodeIdToken(): IdToken {
    return IdToken.of(Base64Service.decode(this.toArrayIdToken()[1]));
  }

  /**
   *
   * @return
   */
  private toArrayIdToken(): Array<string> {
    return this.idToken.value.split('.');
  }
}
