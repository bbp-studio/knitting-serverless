import { Module } from '@nestjs/common';
import { HealthController } from '../health/health.controller';
import { KakaoController } from './kakao.controller';
import { KakaoService } from './kakao.service';
import { KakaoConstant } from './kakao.constant';
import { KakaoClient } from './kakao.client';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { TokenService } from '../../common/token/token.service';
import { TokenConstant } from '../../common/token/token.constant';

@Module({
  imports: [UserModule],
  controllers: [KakaoController],
  providers: [
    KakaoService,
    KakaoConstant,
    KakaoClient,
    UserRepository,
    TokenService,
    TokenConstant,
  ],
})
export class KakaoModule {}
