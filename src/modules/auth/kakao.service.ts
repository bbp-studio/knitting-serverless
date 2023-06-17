import { Injectable, Logger } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { KnittingNotFoundException } from '../../common/exception/knitting-not-found.exception';
import { AccessTokenClaims } from '../../common/token/access-token-claims';
import { Token } from '../../common/token/token';
import { TokenResponse } from '../../common/token/token.response';
import { TokenService } from '../../common/token/token.service';
import { OauthType, UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { LoginResponse } from './dto/login.response';
import { OauthCallbackResponse } from './dto/oauth-callback.response';
import { AuthorizationCodeAccessDeniedException } from './exception/authorization-code-access-denied.exception';
import { InvalidAccessTokenException } from './exception/invalid-access-token.exception';
import { KakaoClient } from './kakao.client';

@Injectable()
export class KakaoService {
  constructor(
    private kakaoClient: KakaoClient,
    private userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  private readonly logger: Logger = new Logger(this.constructor.name);

  async save() {
    // const user = await this.userRepository.save(
    //   new UserEntity(
    //     'idToken.sub',
    //     OauthType.KAKAO,
    //     '한길',
    //     null,
    //     null,
    //     null,
    //     null,
    //   ),
    // );
    // const res: any = await this.userRepository.findAll();
    // this.logger.debug(res.Items);
  }

  /**
   *
   * @param callbackResponse
   */
  async callback(
    callbackResponse: OauthCallbackResponse,
  ): Promise<LoginResponse> {
    this.logger.debug(`callbackResponse: ${JSON.stringify(callbackResponse)}`);

    const tokenResponse = await this.getToken(callbackResponse);

    const idToken = tokenResponse.decodeIdToken();

    this.logger.debug(`idToken: ${JSON.stringify(idToken)}`);

    let user = await this.userRepository.findByIdAndType(
      idToken.sub,
      OauthType.KAKAO,
    );

    this.logger.debug(`user: ${JSON.stringify(user)}`);

    if (!user) {
      user = new UserEntity(
        idToken.sub,
        OauthType.KAKAO,
        null,
        null,
        idToken.nickname,
        null,
        null,
      );
    }

    // 카카오에서 받은 access token 은 사용하지 않습니다.
    const accessToken = this.tokenService.create(
      {
        oauthId: user.oauthId,
        oauthType: user.oauthType,
      },
      '1h',
    );
    const refreshToken = tokenResponse.refreshToken;
    user.setTokens(accessToken, refreshToken);

    this.logger.debug(`user: ${JSON.stringify(user)}`);

    await this.userRepository.save(user);

    return LoginResponse.of(user);
  }

  /**
   * 토큰이 유효기간이 만료되었으면 refresh token 을 이용하여 access token 을 다시 받아옵니다.
   * 서비스의 access token 과 카카오의 access token 의 유효기간을 동일하게 가져갑니다.
   * @param token
   */
  async verifyAccessToken(token: Token): Promise<AccessTokenClaims> {
    try {
      return this.tokenService.getCustomClaims<AccessTokenClaims>(
        token,
        AccessTokenClaims,
      );
    } catch (e: any) {
      if (e instanceof TokenExpiredError) {
        const user = await this.userRepository.findByAccessToken(token);
        if (!user) {
          this.logger.debug("user doesn't exist");
          throw new InvalidAccessTokenException(token);
        }

        const response = await this.kakaoClient.refreshAccessToken(
          user.refreshToken,
        );

        user.accessToken = this.tokenService.create(
          new AccessTokenClaims(user.oauthId, user.oauthType),
          '1h',
        );
        if (response.refreshToken) {
          user.refreshToken = response.refreshToken;
        }

        await this.userRepository.save(user);

        new AccessTokenClaims(user.oauthId, user.oauthType);
      }

      throw e;
    }
  }

  async logout(oauthId: string) {
    const user = await this.userRepository.findByIdAndType(
      oauthId,
      OauthType.KAKAO,
    );
    if (!user) {
      this.logger.debug(`user not found: ${oauthId}`);
      throw new KnittingNotFoundException('유저가 없습니다.');
    }

    this.logger.debug(`user: ${JSON.stringify(user)}`);

    await this.userRepository.removeTokens(oauthId, OauthType.KAKAO);
  }

  /**
   * access token 을 가져옵니다.
   * @param response
   */
  private async getToken(
    response: OauthCallbackResponse,
  ): Promise<TokenResponse> {
    this.logger.debug(`getToken: response: ${JSON.stringify(response)}`);

    if (response.isAccessDenied()) {
      console.error(
        'response.error_description: ${response.error_description}',
      );
      throw new AuthorizationCodeAccessDeniedException();
    }

    const tokenResponse = await this.kakaoClient.getTokenWithAuthCode(response);

    this.logger.debug(`tokenResponse: ${JSON.stringify(tokenResponse)}`);

    return tokenResponse;
  }
}
