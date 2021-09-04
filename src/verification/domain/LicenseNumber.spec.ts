import { LicenseNumber, LICENSE_NUMBER_HAS_WRONG_FORMAT, LICENSE_NUMBER_SHOULD_BE_DEFINED } from './LicenseNumber';

describe('LicenseNumber', () => {
  it('should be created', () => {
    const licenseNumberOrError = LicenseNumber.create('11-90-623000-00');
    expect(licenseNumberOrError.isSuccess).toBeTruthy();
  });

  it('should return fail on undefined or validation error', () => {
    const licenseNumberUndefinedOrError = LicenseNumber.create(undefined);
    const licenseNumberWrongFormatOrError = LicenseNumber.create('한글-00-000000-00');

    expect(licenseNumberUndefinedOrError.isFailure).toBeTruthy();
    expect(licenseNumberWrongFormatOrError.isFailure).toBeTruthy();
    expect(licenseNumberUndefinedOrError.errorValue()).toBe(LICENSE_NUMBER_SHOULD_BE_DEFINED);
    expect(licenseNumberWrongFormatOrError.errorValue()).toBe(LICENSE_NUMBER_HAS_WRONG_FORMAT);
  });
});
