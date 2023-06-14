import { Token } from '../../../common/token/token';

export class GetKakaoTokenBody {
  client_id: string;
  redirect_uri: string;
  code: string;
  grant_type: string = 'authorization_code';

  constructor(client_id: string, redirect_uri: string, code: string) {
    this.client_id = client_id;
    this.redirect_uri = redirect_uri;
    this.code = code;
  }
}

export class GetRefreshTokenBody {
  client_id: string;
  refresh_token: string;
  grant_type: string = 'refresh_token';
  constructor(client_id: string, refresh_token: string) {
    this.client_id = client_id;
    this.refresh_token = refresh_token;
  }
}

export class RefreshAccessTokenResponseSnake {
  token_type: string;
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;

  constructor(
    token_type: string,
    access_token: string,
    id_token: string,
    expires_in: number,
    refresh_token: string,
    refresh_token_expires_in: number,
  ) {
    this.token_type = token_type;
    this.access_token = access_token;
    this.id_token = id_token;
    this.expires_in = expires_in;
    this.refresh_token = refresh_token;
    this.refresh_token_expires_in = refresh_token_expires_in;
  }

  toRefreshAccessTokenResponse(): RefreshAccessTokenResponse {
    return new RefreshAccessTokenResponse(
      this.token_type,
      new Token(this.access_token),
      this.id_token,
      this.expires_in,
      new Token(this.refresh_token),
      this.refresh_token_expires_in,
    );
  }
}

export class RefreshAccessTokenResponse {
  tokenType: string;
  accessToken: Token;
  idToken: string;
  expiresIn: number;
  refreshToken: Token;
  refreshTokenExpiresIn: number;

  constructor(
    tokenType: string,
    accessToken: Token,
    idToken: string,
    expiresIn: number,
    refreshToken: Token,
    refreshTokenExpiresIn: number,
  ) {
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
  }
}
