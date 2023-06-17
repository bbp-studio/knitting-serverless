import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { AllExceptionsFilter } from './core/filter/all-exception.filter';
import { setupSwagger } from './core/swagger/swagger.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // sls offline 으로 테스트하는 경우입니다.
  if (process.env.APP_ENV === 'offline') {
    app.setGlobalPrefix('prod/api');
  } else {
    app.setGlobalPrefix('api');
  }

  setupSwagger(app);

  await app.listen(3001);
}

bootstrap();
