import { DriverName, DRIVER_NAME_LENGTH_SHOULD_BE_GREATER_THAN_OR_EQUAL_TO_TWO, DRIVER_NAME_SHOULD_BE_DEFINED } from './DriverName';

describe('DriverName', () => {
  it('should be created', () => {
    const driverNameOrError = DriverName.create('강준영');
    expect(driverNameOrError.isSuccess).toBeTruthy();
  });

  it('should return fail on undefined or validation error', () => {
    const driverNameUndefinedOrError = DriverName.create(undefined);
    const driverNameShortOrError = DriverName.create('강');

    expect(driverNameUndefinedOrError.isFailure).toBeTruthy();
    expect(driverNameShortOrError.isFailure).toBeTruthy();
    expect(driverNameUndefinedOrError.errorValue()).toBe(DRIVER_NAME_SHOULD_BE_DEFINED);
    expect(driverNameShortOrError.errorValue()).toBe(DRIVER_NAME_LENGTH_SHOULD_BE_GREATER_THAN_OR_EQUAL_TO_TWO);
  });
});
