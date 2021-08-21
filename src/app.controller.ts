import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

interface IHealthCheckResult {
  ok: boolean;
}

class HealthCheckResponse {
  @ApiProperty({
    description: 'Health Check Result',
  })
  ok: boolean;
}

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Response Successfully', type: HealthCheckResponse })
  getHealthCheck(): IHealthCheckResult {
    return {
      ok: this.appService.getOk(),
    };
  }
}
