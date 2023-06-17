import { Controller, Get, Logger, Query, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenClaims } from '../../common/token/access-token-claims';
import { AuthGuard } from '../../core/auth/auth.guard';
import { CurrentUserClaims } from '../../core/auth/user.decorator';
import { LoginResponse } from './dto/login.response';
import { OauthCallbackResponse } from './dto/oauth-callback.response';
import { KakaoConstant } from './kakao.constant';
import { KakaoService } from './kakao.service';

@Controller('/v1/auth/kakao')
@ApiTags('인증')
export class KakaoController {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly kakaoConstant: KakaoConstant,
  ) {}

  private readonly logger: Logger = new Logger(this.constructor.name);

  /**
   * kakao 로그인 페이지로 리다이렉트합니다.
   * 서버 테스트용으로, 클라이언트에서 할 수도 있습니다.
   * @param res
   */
  @Get('/login')
  @ApiOperation({
    summary: '카카오 로그인 페이지로 리다이렉트합니다. (서버 테스트용)',
  })
  login(@Res() res) {
    res.redirect(
      `${this.kakaoConstant.kauthUrl}/authorize?client_id=${this.kakaoConstant.CLIENT_ID}&redirect_uri=${this.kakaoConstant.REDIRECT_URI}&response_type=code&scope=openid`,
    );
  }

  /**
   * 유저가 카카오 로그인 완료 시, 리다이렉트되는 api 입니다.
   * @param callbackResponse
   */
  @Get('/callback')
  @ApiOperation({
    summary:
      '카카오 로그인 페이지에서 로그인 완료 시, 리다이렉트되는 api 입니다.',
  })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  async callback(
    @Query() callbackResponse: OauthCallbackResponse,
  ): Promise<LoginResponse> {
    return this.kakaoService.callback(callbackResponse);
  }

  /**
   * 브라우저와 kakao 와의 세션을 완전히 끊을 수도 있습니다.
   * 서버 테스트용으로, 클라이언트에서 할 수도 있습니다.
   * @param res
   * @param claims
   */
  @Get('/logout')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '로그아웃페이지로 리다이렉트합니다. 브라우저와 kakao 와의 세션을 완전히 끊을 수도 있습니다. (서버 테스트용)',
  })
  async logoutWithKakao(
    @Res() res,
    @CurrentUserClaims() claims: AccessTokenClaims,
  ) {
    res.redirect(
      `${this.kakaoConstant.kauthUrl}/logout?client_id=${this.kakaoConstant.CLIENT_ID}&logout_redirect_uri=${this.kakaoConstant.LOGOUT_REDIRECT_URI}&state=${claims.oauthId}`,
    );
  }

  /**
   *
   * @param state user id 값입니다. logout-with-kakao 에서 넘겨준 state 를 받습니다.
   * @return
   */
  @Get('/logout/callback')
  @ApiOperation({
    summary:
      '카카오 로그아웃 페이지에서 로그아웃 완료 시, 리다이렉트되는 api 입니다.',
  })
  async logoutCallback(@Query('state') state: string) {
    this.logger.debug(`state: ${state}`);
    return this.kakaoService.logout(state);
  }
}
