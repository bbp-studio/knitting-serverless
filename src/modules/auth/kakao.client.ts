import { KakaoConstant } from './kakao.constant';
import { Injectable } from '@nestjs/common';
import {
  TokenResponse,
  TokenResponseSnake,
} from '../../common/token/token.response';
import axios from 'axios';
import { OauthCallbackResponse } from './dto/oauth-callback.response';
import {
  GetKakaoTokenBody,
  GetRefreshTokenBody,
  RefreshAccessTokenResponse,
  RefreshAccessTokenResponseSnake,
} from './dto/get-kakao-token.body';
import { Token } from '../../common/token/token';
import { plainToClass } from 'class-transformer';

@Injectable()
export class KakaoClient {
  constructor(private kakaoConstant: KakaoConstant) {}

  /**
   * code 를 이용하여 access token 을 가져옵니다.
   * @param oauthCallbackResponse
   */
  async getTokenWithAuthCode(
    oauthCallbackResponse: OauthCallbackResponse,
  ): Promise<TokenResponse> {
    console.log(
      new GetKakaoTokenBody(
        this.kakaoConstant.CLIENT_ID,
        oauthCallbackResponse.redirectUri ?? this.kakaoConstant.REDIRECT_URI,
        oauthCallbackResponse.code,
      ),
    );

    const response = await axios.post<TokenResponseSnake>(
      `${this.kakaoConstant.kauthUrl}/token`,
      new GetKakaoTokenBody(
        this.kakaoConstant.CLIENT_ID,
        oauthCallbackResponse.redirectUri ?? this.kakaoConstant.REDIRECT_URI,
        oauthCallbackResponse.code,
      ),
      {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded;charset=utf-8`,
        },
      },
    );

    return plainToClass(TokenResponseSnake, response.data).toTokenResponse();
  }

  async refreshAccessToken(
    refreshToken: Token,
  ): Promise<RefreshAccessTokenResponse> {
    const response = await axios.post<RefreshAccessTokenResponseSnake>(
      `${this.kakaoConstant.kauthUrl}/token`,
      new GetRefreshTokenBody(this.kakaoConstant.CLIENT_ID, refreshToken.value),
    );

    return plainToClass(
      RefreshAccessTokenResponseSnake,
      response.data,
    ).toRefreshAccessTokenResponse();
  }
}
