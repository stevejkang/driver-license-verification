import { DriverBirthday, DRIVER_BIRTHDAY_HAS_WRONG_FORMAT, DRIVER_BIRTHDAY_SHOULD_BE_DEFINED } from './DriverBirthday';

describe('DriverBirthday', () => {
  it('should be created', () => {
    const driverBirthdayOrError = DriverBirthday.create('2000-01-01');
    expect(driverBirthdayOrError.isSuccess).toBeTruthy();
  });

  it('should return fail on undefined or validation error', () => {
    const driverBirthdayUndefinedOrError = DriverBirthday.create(undefined);
    const driverBirthdayWrongFormatOrError = DriverBirthday.create('01-01-2001');

    expect(driverBirthdayUndefinedOrError.isFailure).toBeTruthy();
    expect(driverBirthdayWrongFormatOrError.isFailure).toBeTruthy();
    expect(driverBirthdayUndefinedOrError.errorValue()).toBe(DRIVER_BIRTHDAY_SHOULD_BE_DEFINED);
    expect(driverBirthdayWrongFormatOrError.errorValue()).toBe(DRIVER_BIRTHDAY_HAS_WRONG_FORMAT);
  });
});
