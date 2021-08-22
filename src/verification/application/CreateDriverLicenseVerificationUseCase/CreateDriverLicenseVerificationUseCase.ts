import { UseCase } from '../../../shared/core/UseCase';
import { CreateDriverLicenseVerificationUseCaseRequest } from './dto/CreateDriverLicenseVerificationUseCaseRequest';
import { CreateDriverLicenseVerificationUseCaseResponse } from './dto/CreateDriverLicenseVerificationUseCaseResponse';
import { Efine } from './api/Efine';
import { SafeDriving } from './api/SafeDriving';

export class CreateDriverLicenseVerificationUseCase implements UseCase<CreateDriverLicenseVerificationUseCaseRequest, CreateDriverLicenseVerificationUseCaseResponse> {
  async execute(request: CreateDriverLicenseVerificationUseCaseRequest): Promise<CreateDriverLicenseVerificationUseCaseResponse> {
    const { driverName, driverBirthday, licenseNumber, serialNumber } = request;

    if (!driverName || driverName.length < 2) {
      throw new Error('Driver name is required or has wrong format');
    }

    if (!driverBirthday || driverBirthday.length !== 10) {
      throw new Error('Driver birthday is required or has wrong format');
    }

    if (!licenseNumber || licenseNumber.length !== 15) {
      throw new Error('License number is required or has wrong format');
    }

    if (!serialNumber || serialNumber.length !== 6) {
      throw new Error('Serial number is required or has wrong format');
    }

    const verification = await Promise.all([
      SafeDriving.retrieve({
        driverName,
        driverBirthdayYear: driverBirthday.split('-')[0],
        driverBirthdayMonth: driverBirthday.split('-')[1],
        driverBirthdayDay: driverBirthday.split('-')[2],
        licenseNumber,
        serialNumber,
      }),
      Efine.retrieve({
        driverName,
        driverBirthdayYear: driverBirthday.split('-')[0],
        driverBirthdayMonth: driverBirthday.split('-')[1],
        driverBirthdayDay: driverBirthday.split('-')[2],
        licenseNumber,
        serialNumber,
      }),
    ]).then((value) => {
      return value;
    });

    const isValid = verification.some((request) => request);

    return {
      code: isValid ? 'SUCCESS' : 'FAILED',
    };
  }
}
