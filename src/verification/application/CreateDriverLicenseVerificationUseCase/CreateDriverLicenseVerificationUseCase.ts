import { UseCase } from '../../../shared/core/UseCase';
import { CreateDriverLicenseVerificationUseCaseRequest } from './dto/CreateDriverLicenseVerificationUseCaseRequest';
import { CreateDriverLicenseVerificationUseCaseResponse } from './dto/CreateDriverLicenseVerificationUseCaseResponse';
import { Efine } from './api/Efine';
import { SafeDriving } from './api/SafeDriving';
import { DriverLicense } from '../../domain/DriverLicense';
import { DriverName } from '../../domain/DriverName';
import { DriverBirthday } from '../../domain/DriverBirthday';
import { LicenseNumber } from '../../domain/LicenseNumber';
import { SerialNumber } from '../../domain/SerialNumber';

export class CreateDriverLicenseVerificationUseCase implements UseCase<CreateDriverLicenseVerificationUseCaseRequest, CreateDriverLicenseVerificationUseCaseResponse> {
  async execute(request: CreateDriverLicenseVerificationUseCaseRequest): Promise<CreateDriverLicenseVerificationUseCaseResponse> {
    const { driverName, driverBirthday, licenseNumber, serialNumber } = request;

    const requestedDriverLicense = DriverLicense.createNew({
      driverName: DriverName.create(driverName).value,
      driverBirthday: DriverBirthday.create(driverBirthday).value,
      licenseNumber: LicenseNumber.create(licenseNumber).value,
      serialNumber: SerialNumber.create(serialNumber).value,
    });

    const verification = await Promise.any([Efine.retrieve(requestedDriverLicense.value), SafeDriving.retrieve(requestedDriverLicense.value)])
      .then((value: DriverLicense) => {
        return value.verified;
      })
      .catch((error) => {
        console.log(error);
        throw new Error('All verification methods have been an outage. This incident will be reported.');
      });

    return {
      code: Boolean(verification) === true ? 'SUCCESS' : 'FAILED',
    };
  }
}
