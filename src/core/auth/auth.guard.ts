import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthException } from '../../common/exception/knitting.exception';
import { AppEnvironmentConstant } from '../../common/env/app-environment.constant';
import { KakaoService } from '../../modules/auth/kakao.service';
import { UserRepository } from '../../modules/user/user.repository';
import { Token } from '../../common/token/token';
import { InvalidAccessTokenException } from '../../modules/auth/exception/invalid-access-token.exception';
import { OauthType } from '../../modules/user/user.entity';
import { AccessTokenClaims } from '../../common/token/access-token-claims';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private appEnvironmentConstant: AppEnvironmentConstant,
    private kakaoService: KakaoService,
    private userRepository: UserRepository,
  ) {}
  /**
   *
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;

    const token = this.validateAuthorizationHeader(authorization);

    if (token.isPhone()) {
      const user = await this.userRepository.findByIdAndType(
        token.value,
        OauthType.KAKAO,
      );

      if (!user) {
        throw new InvalidAccessTokenException();
      }

      req.user = new AccessTokenClaims(user.oauthId, user.oauthType);
      return true;
    }

    const claims = await this.kakaoService.verifyAccessToken(token);

    console.log(`claims: ${JSON.stringify(claims)}`);

    req.user = claims;

    return true;
  }

  validateAuthorizationHeader(authorization: string): Token {
    if (authorization == null) {
      console.log('토큰이 제공되지 않았습니다.');
      throw new InvalidAccessTokenException();
    }

    const tokens = authorization.split(' ');

    if (tokens.length < 2) {
      console.log('토큰이 제공되지 않았습니다.');
      throw new InvalidAccessTokenException();
    }

    if (tokens[0] != 'Bearer' || tokens[1] == '') {
      console.log('token 이 없습니다.');
      throw new InvalidAccessTokenException();
    }

    return new Token(tokens[1]);
  }
}
