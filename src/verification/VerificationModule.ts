import { Module } from '@nestjs/common';
import { CreateDriverLicenseVerificationUseCase } from './application/CreateDriverLicenseVerificationUseCase/CreateDriverLicenseVerificationUseCase';
import { DriverLicenseVerificationController } from './presentation/DriverLicenseVerificationController/DriverLicenseVerificationController';

@Module({
  controllers: [DriverLicenseVerificationController],
  providers: [CreateDriverLicenseVerificationUseCase],
})
export class VerificationModule {}
