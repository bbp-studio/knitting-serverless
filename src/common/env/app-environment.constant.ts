import { Injectable } from '@nestjs/common';

@Injectable()
export class AppEnvironmentConstant {
  isLocal = (): boolean => {
    return process.env.APP_ENV === 'local';
  };

  isDev = (): boolean => {
    return process.env.APP_ENV === 'dev';
  };

  isProd = (): boolean => {
    return process.env.APP_ENV === 'prod';
  };
}
