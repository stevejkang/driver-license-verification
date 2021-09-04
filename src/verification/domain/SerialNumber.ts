import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/core/ValueObject';

interface SerialNumberProps {
  value: string;
}

export const SERIAL_NUMBER_SHOULD_BE_DEFINED = 'Serial number should be defined';
export const SERIAL_NUMBER_HAS_WRONG_FORMAT = 'Serial number has wrong format';

export class SerialNumber extends ValueObject<SerialNumberProps> {
  private constructor(props: SerialNumberProps) {
    super(props);
  }

  static create(value: string): Result<SerialNumber> {
    if (typeof value === 'undefined') {
      return Result.fail(SERIAL_NUMBER_SHOULD_BE_DEFINED);
    }

    if (!value.match(/^([0-9]|[A-Z]){6,6}$/g)) {
      return Result.fail(SERIAL_NUMBER_HAS_WRONG_FORMAT);
    }

    return Result.ok(new SerialNumber({ value }));
  }

  get value(): string {
    return this.props.value;
  }
}
