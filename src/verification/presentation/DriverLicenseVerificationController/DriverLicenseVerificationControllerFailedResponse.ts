import { ApiProperty } from '@nestjs/swagger';

export class DriverLicenseVerificationControllerFailedResponse {
  @ApiProperty({
    description: 'Api Operation Result',
    default: false,
  })
  isSuccess: boolean;

  @ApiProperty({
    description: 'Error Message',
  })
  errorMessage: string;
}
