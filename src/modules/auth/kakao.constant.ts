import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoConstant {
  REDIRECT_URI = process.env.KAKAO_OAUTH_LOGIN_REDIRECT_URI;
  LOGOUT_REDIRECT_URI = process.env.KAKAO_OAUTH_LOGOUT_REDIRECT_URI;
  CLIENT_ID = process.env.KAKAO_OAUTH_LOGIN_CLIENT_ID;

  // TODO.
  //  https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting
  //  예외처리 필요.
  kauthUrl = 'https://kauth.kakao.com/oauth';
  kapiUrl = 'https://kapi.kakao.com/v1';
}
