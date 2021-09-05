import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { Result } from '../../shared/core/Result';
import { DriverBirthday } from './DriverBirthday';
import { DriverName } from './DriverName';
import { LicenseNumber } from './LicenseNumber';
import { SerialNumber } from './SerialNumber';

interface DriverLicenseProps {
  driverName: DriverName;
  driverBirthday: DriverBirthday;
  licenseNumber: LicenseNumber;
  serialNumber: SerialNumber;
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

  get driverName(): DriverName {
    return this.props.driverName;
  }

  get driverBirthday(): DriverBirthday {
    return this.props.driverBirthday;
  }

  get licenseNumber(): LicenseNumber {
    return this.props.licenseNumber;
  }

  get serialNumber(): SerialNumber {
    return this.props.serialNumber;
  }

  get verified(): boolean {
    return this.props.verified ?? false;
  }
}
