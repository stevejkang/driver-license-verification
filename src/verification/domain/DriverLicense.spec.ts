import { Result } from '../../shared/core/Result';
import { DriverBirthday } from './DriverBirthday';
import { DriverLicense } from './DriverLicense';
import { DriverName } from './DriverName';
import { LicenseNumber } from './LicenseNumber';
import { SerialNumber } from './SerialNumber';

describe('DriverLicense', () => {
  let license: Result<DriverLicense>;
  const licenseObject = {
    driverName: '강준영',
    driverBirthday: '2001-12-08',
    licenseNumber: '11-11-111111-11',
    serialNumber: 'DDDDDD',
  };

  beforeEach(() => {
    license = DriverLicense.createNew({
      driverName: DriverName.create(licenseObject.driverName).value,
      driverBirthday: DriverBirthday.create(licenseObject.driverBirthday).value,
      licenseNumber: LicenseNumber.create(licenseObject.licenseNumber).value,
      serialNumber: SerialNumber.create(licenseObject.serialNumber).value,
    });
  });

  it('should be created', () => {
    expect(license.isSuccess).toBeTruthy();
  });

  it('should return props', () => {
    expect(license.value.driverName.value).toEqual(licenseObject.driverName);
    expect(license.value.driverBirthday.value).toEqual(licenseObject.driverBirthday);
    expect(license.value.licenseNumber.value).toEqual(licenseObject.licenseNumber);
    expect(license.value.serialNumber.value).toEqual(licenseObject.serialNumber);
    expect(license.value.verified).toBeFalsy();
  });
});
