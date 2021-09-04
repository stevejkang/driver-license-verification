import { Result } from '../../shared/core/Result';
import { ValueObject } from '../../shared/core/ValueObject';

interface LicenseNumberProps {
  value: string;
}

export const LICENSE_NUMBER_SHOULD_BE_DEFINED = 'License number should be defined';
export const LICENSE_NUMBER_HAS_WRONG_FORMAT = 'License number has wrong format';

export class LicenseNumber extends ValueObject<LicenseNumberProps> {
  private constructor(props: LicenseNumberProps) {
    super(props);
  }

  static create(value: string): Result<LicenseNumber> {
    if (typeof value === 'undefined') {
      return Result.fail(LICENSE_NUMBER_SHOULD_BE_DEFINED);
    }

    if (!value.match(/^[0-9][0-9]\-[0-9][0-9]\-[0-9]{6,6}\-[0-9][0-9]$/g)) {
      return Result.fail(LICENSE_NUMBER_HAS_WRONG_FORMAT);
    }

    return Result.ok(new LicenseNumber({ value }));
  }

  get value(): string {
    return this.props.value;
  }
}
