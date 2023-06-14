import { OauthType, UserEntity } from '../../user/user.entity';
import { Token } from '../../../common/token/token';

export class LoginResponse {
  name: string;
  phone: string;
  oauthType: OauthType;
  oauthId: string;
  oauthNickname: string;
  accessToken: Token;

  constructor(
    name: string,
    phone: string,
    oauthType: OauthType,
    oauthId: string,
    oauthNickname: string,
    accessToken: Token,
  ) {
    this.name = name;
    this.phone = phone;
    this.oauthType = oauthType;
    this.oauthId = oauthId;
    this.oauthNickname = oauthNickname;
    this.accessToken = accessToken;
  }

  static of(user: UserEntity): LoginResponse {
    return new LoginResponse(
      user.name,
      user.phone,
      user.oauthType,
      user.oauthId,
      user.nickname,
      user.accessToken,
    );
  }
}
