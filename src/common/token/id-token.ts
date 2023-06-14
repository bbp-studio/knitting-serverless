export class IdToken {
  iss: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  auth_time: number;
  nickname: string;

  static of(str: string): IdToken {
    return JSON.parse(str);
  }
}
