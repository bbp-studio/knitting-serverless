import { ApiProperty } from '@nestjs/swagger';
import { Token } from '../../../common/token/token';
import { OauthType, UserEntity } from '../../user/user.entity';

export class LoginResponse {
  @ApiProperty({
    description: '이름',
    example: '콜라',
  })
  name: string;
  @ApiProperty({
    description: '휴대폰번호',
    example: '010-1234-5678',
  })
  phone: string;
  @ApiProperty({
    description: '이름',
    example: 'KAKAO',
  })
  oauthType: OauthType;
  @ApiProperty({
    description: '이름',
    example: '1234567890',
  })
  oauthId: string;
  @ApiProperty({
    description: '이름',
    example: '콜라',
  })
  oauthNickname: string;
  @ApiProperty({
    description: '이름',
    example: '1234567890',
  })
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
