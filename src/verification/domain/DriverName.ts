import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/core/ValueObject';

interface DriverNameProps {
  value: string;
}

export const DRIVER_NAME_SHOULD_BE_DEFINED = 'Driver name should be defined';
export const DRIVER_NAME_LENGTH_SHOULD_BE_GREATER_THAN_OR_EQUAL_TO_TWO = 'Driver name length should be greater than or equal to 2';

export class DriverName extends ValueObject<DriverNameProps> {
  private constructor(props: DriverNameProps) {
    super(props);
  }

  static create(value: string): Result<DriverName> {
    if (typeof value === 'undefined') {
      return Result.fail(DRIVER_NAME_SHOULD_BE_DEFINED);
    }

    if (value.length < 2) {
      return Result.fail(DRIVER_NAME_LENGTH_SHOULD_BE_GREATER_THAN_OR_EQUAL_TO_TWO);
    }

    return Result.ok(new DriverName({ value }));
  }

  get value(): string {
    return this.props.value;
  }
}
