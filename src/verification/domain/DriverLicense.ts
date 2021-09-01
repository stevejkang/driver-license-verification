import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { Result } from '../../shared/core/Result';

interface DriverLicenseProps {
  driverName: string;
  driverBirthday: string;
  licenseNumber: string;
  serialNumber: string;
  verified?: boolean;
}

export class DriverLicense extends AggregateRoot<DriverLicenseProps> {
  private constructor(props: DriverLicenseProps, id: number) {
    super(props, id);
  }

  static create(props: DriverLicenseProps, id: number): Result<DriverLicense> {
    return Result.ok(new DriverLicense(props, id));
  }

  static createNew(props: DriverLicenseProps): Result<DriverLicense> {
    return this.create({ ...props }, 0);
  }

  get driverName(): string {
    return this.props.driverName;
  }

  get driverBirthday(): string {
    return this.props.driverBirthday;
  }

  get licenseNumber(): string {
    return this.props.licenseNumber;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }

  get verified(): boolean {
    return this.props.verified ?? false;
  }
}
