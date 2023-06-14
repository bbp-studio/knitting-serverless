import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppEnvironmentConstant } from '../common/env/app-environment.constant';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
      envFilePath:
        process.env.APP_ENV === 'lambda'
          ? '.env'
          : `.env.${process.env.APP_ENV}`,
    }),
  ],
  providers: [AppEnvironmentConstant],
  exports: [AppEnvironmentConstant],
})
export class CoreModule {}
