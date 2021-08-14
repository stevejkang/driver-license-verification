import { ApiProperty } from '@nestjs/swagger';

export class DriverLicenseVerificationControllerResponse {
  @ApiProperty({
    enum: ['SUCCESS', 'FAILED'],
    enumName: 'ResultCode',
    description: 'Result Code',
  })
  code: string;
}
