import { Result } from '../../shared/core/Result';
import { DriverLicense } from './DriverLicense';

describe('DriverLicense', () => {
  let license: Result<DriverLicense>;
  const licenseObject = {
    driverName: '강준영',
    driverBirthDay: '2001-12-08',
    licenseNumber: '11-11-111111-11',
    serialNumber: 'DDDDDD',
  };

  beforeEach(() => {
    license = DriverLicense.createNew({ ...licenseObject });
  });

  it('should be created', () => {
    expect(license.isSuccess).toBeTruthy();
  });

  it('should return props', () => {
    expect(license.value.driverName).toEqual(licenseObject.driverName);
    expect(license.value.driverBirthDay).toEqual(licenseObject.driverBirthDay);
    expect(license.value.licenseNumber).toEqual(licenseObject.licenseNumber);
    expect(license.value.serialNumber).toEqual(licenseObject.serialNumber);
    expect(license.value.verified).toBeFalsy();
  });
});
