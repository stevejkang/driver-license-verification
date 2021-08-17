import { ApiProperty } from '@nestjs/swagger';

export class DriverLicenseVerificationControllerSuccessfulResponse {
  @ApiProperty({
    description: 'Api Operation Result',
    default: true,
  })
  isSuccess: boolean;

  @ApiProperty({
    enum: ['VALID', 'INVALID'],
    enumName: 'VerificationResult',
    description: 'Verification Result',
    required: false,
  })
  verificationResult?: string;
}
