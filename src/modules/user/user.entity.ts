import { BaseEntity } from '../../common/entity/base.entity';
import { Token } from '../../common/token/token';
import * as dayjs from 'dayjs';

export enum OauthType {
  KAKAO = 'KAKAO',
}

export type UserDEntity = {
  oauthId: string;
  oauthType: OauthType;
  name: string;
  phone: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  isDeleted: boolean;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
};

export class UserEntity extends BaseEntity {
  oauthId: string;
  oauthType: OauthType;
  name: string;
  phone: string;
  nickname: string;
  accessToken: Token;
  refreshToken: Token;

  constructor(
    oauthId: string,
    oauthType: OauthType,
    name: string,
    phone: string,
    nickname: string,
    accessToken: Token,
    refreshToken: Token,
    isDeleted: boolean = false,
    isUsed: boolean = true,
    createdAt: dayjs.Dayjs = dayjs(),
    updatedAt: dayjs.Dayjs = dayjs(),
  ) {
    super(isDeleted, isUsed, createdAt, updatedAt);
    this.oauthId = oauthId;
    this.oauthType = oauthType;
    this.name = name;
    this.phone = phone;
    this.nickname = nickname;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  static of(ddbData: UserDEntity): UserEntity {
    return new UserEntity(
      ddbData.oauthId,
      ddbData.oauthType,
      ddbData.name,
      ddbData.phone,
      ddbData.nickname,
      new Token(ddbData.accessToken),
      new Token(ddbData.refreshToken),
      ddbData.isDeleted,
      ddbData.isUsed,
      dayjs(ddbData.createdAt),
      dayjs(ddbData.updatedAt),
    );
  }

  toDdb(): UserDEntity {
    return {
      oauthId: this.oauthId,
      oauthType: this.oauthType,
      name: this.name,
      phone: this.phone,
      nickname: this.nickname,
      accessToken: this.accessToken.value,
      refreshToken: this.refreshToken.value,
      isDeleted: this.isDeleted,
      isUsed: this.isUsed,
      createdAt: this.createdAt.format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: this.updatedAt.format('YYYY-MM-DD HH:mm:ss'),
    };
  }

  /**
   * 로그인 시, 유저의 토큰을 저장합니다.
   * @param accessToken
   * @param refreshToken
   */
  setTokens(accessToken: Token, refreshToken: Token) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  /**
   * 로그아웃 시, 유저의 모든 토큰을 제거합니다.
   */
  removeTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }
}
