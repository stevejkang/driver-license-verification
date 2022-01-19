import { SerialNumber, SERIAL_NUMBER_HAS_WRONG_FORMAT, SERIAL_NUMBER_SHOULD_BE_DEFINED } from './SerialNumber';

describe('SerialNumber', () => {
  it('should be created', () => {
    const serialNumberOrError = SerialNumber.create('S90CSA');
    const serialNumberNullOrError = SerialNumber.create(null);
    const serialNumberEmptyOrError = SerialNumber.create('');
    expect(serialNumberOrError.isSuccess).toBeTruthy();
    expect(serialNumberNullOrError.isSuccess).toBeTruthy();
    expect(serialNumberEmptyOrError.isSuccess).toBeTruthy();
  });

  it('should return fail on undefined or validation error', () => {
    const serialNumberUndefinedOrError = SerialNumber.create(undefined);
    const serialNumberWrongFormatOrError = SerialNumber.create('1111111');

    expect(serialNumberUndefinedOrError.isFailure).toBeTruthy();
    expect(serialNumberWrongFormatOrError.isFailure).toBeTruthy();
    expect(serialNumberUndefinedOrError.errorValue()).toBe(SERIAL_NUMBER_SHOULD_BE_DEFINED);
    expect(serialNumberWrongFormatOrError.errorValue()).toBe(SERIAL_NUMBER_HAS_WRONG_FORMAT);
  });
});
