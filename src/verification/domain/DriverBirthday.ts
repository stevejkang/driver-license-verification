import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/core/ValueObject';

interface DriverBirthdayProps {
  value: string;
}

export const DRIVER_BIRTHDAY_SHOULD_BE_DEFINED = 'Driver birthday should be defined';
export const DRIVER_BIRTHDAY_HAS_WRONG_FORMAT = 'Driver birthday has wrong format';

export class DriverBirthday extends ValueObject<DriverBirthdayProps> {
  private constructor(props: DriverBirthdayProps) {
    super(props);
  }

  static create(value: string): Result<DriverBirthday> {
    if (typeof value === 'undefined') {
      return Result.fail(DRIVER_BIRTHDAY_SHOULD_BE_DEFINED);
    }

    if (!value.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/g)) {
      return Result.fail(DRIVER_BIRTHDAY_HAS_WRONG_FORMAT);
    }

    return Result.ok(new DriverBirthday({ value }));
  }

  get value(): string {
    return this.props.value;
  }
}
