import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): IHealthCheckResult {
    return {
      ok: this.appService.getOk(),
    };
  }
}

interface IHealthCheckResult {
  ok: boolean;
}
