import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDriverLicenseVerificationUseCase } from '../../application/CreateDriverLicenseVerificationUseCase/CreateDriverLicenseVerificationUseCase';
import { DriverLicenseVerificationControllerRequestBody } from './DriverLicenseVerificationControllerRequestBody';
import { DriverLicenseVerificationControllerResponse } from './DriverLicenseVerificationControllerResponse';

@ApiTags('Verification')
@Controller('verification')
export class DriverLicenseVerificationController {
  constructor(private readonly createDriverLicenseVerificationUseCase: CreateDriverLicenseVerificationUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: '면허정보 검증' })
  @ApiResponse({ status: 200, description: 'Response Successfully', type: DriverLicenseVerificationControllerResponse })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async useCase(@Body() requestBody: DriverLicenseVerificationControllerRequestBody): Promise<DriverLicenseVerificationControllerResponse> {
    const result = await this.createDriverLicenseVerificationUseCase.execute({ ...requestBody });
    return {
      code: 'SUCCESS',
    };
  }
}
