import { DynamicModule, Module } from '@nestjs/common';
import { CreateDriverLicenseVerificationUseCase } from './application/CreateDriverLicenseVerificationUseCase/CreateDriverLicenseVerificationUseCase';
import { DriverLicenseVerificationController } from './presentation/DriverLicenseVerificationController/DriverLicenseVerificationController';

@Module({
  controllers: [DriverLicenseVerificationController],
  providers: [CreateDriverLicenseVerificationUseCase],
})
export class VerificationModule {
  static forRoot(): DynamicModule {
    const providers = [CreateDriverLicenseVerificationUseCase];

    return {
      providers: providers,
      exports: providers,
      module: VerificationModule,
    };
  }
}
