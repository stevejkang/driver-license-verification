import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDriverLicenseVerificationUseCase } from '../../application/CreateDriverLicenseVerificationUseCase/CreateDriverLicenseVerificationUseCase';
import { DriverLicenseVerificationControllerRequestBody } from './DriverLicenseVerificationControllerRequestBody';
import { DriverLicenseVerificationControllerSuccessfulResponse } from './DriverLicenseVerificationControllerSuccessfulResponse';
import { DriverLicenseVerificationControllerFailedResponse } from './DriverLicenseVerificationControllerFailedResponse';

@ApiTags('Verification')
@Controller('verification')
export class DriverLicenseVerificationController {
  constructor(private readonly createDriverLicenseVerificationUseCase: CreateDriverLicenseVerificationUseCase) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify License Information' })
  @ApiResponse({ status: 200, description: 'Response Successfully', type: DriverLicenseVerificationControllerSuccessfulResponse })
  @ApiResponse({ status: 400, description: 'Bad Request or Failed', type: DriverLicenseVerificationControllerFailedResponse })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async useCase(
    @Body() requestBody: DriverLicenseVerificationControllerRequestBody,
  ): Promise<DriverLicenseVerificationControllerSuccessfulResponse | DriverLicenseVerificationControllerFailedResponse> {
    try {
      const useCase = await this.createDriverLicenseVerificationUseCase.execute({ ...requestBody });
      return {
        isSuccess: true,
        verificationResult: useCase.code === 'SUCCESS' ? 'VALID' : 'INVALID',
      };
    } catch (error) {
      return {
        isSuccess: false,
        errorMessage: error.message,
      };
    }
  }
}
