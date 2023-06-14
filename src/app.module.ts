import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { KakaoModule } from './modules/auth/kakao.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, HealthModule, KakaoModule],
})
export class AppModule {}
