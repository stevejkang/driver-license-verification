import { AggregateRoot } from 'src/shared/core/AggregateRoot';
import { Result } from 'src/shared/core/Result';

interface DriverLicenseProps {
  driverName: string;
  driverBirthDay: string;
  licenseNumber: string;
  serialNumber: string;
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

  get driverBirthDay(): string {
    return this.props.driverBirthDay;
  }

  get licenseNumber(): string {
    return this.props.licenseNumber;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }
}