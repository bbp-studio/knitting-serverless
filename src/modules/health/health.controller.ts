import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHello(): string {
    console.log(process.env.APP_ENV);
    return 'health check!!';
  }
}
