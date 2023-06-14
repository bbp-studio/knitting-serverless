export class AccessTokenClaims {
  oauthId: string;
  oauthType: string;

  constructor(oauthId: string, oauthType: string) {
    this.oauthId = oauthId;
    this.oauthType = oauthType;
  }
}
