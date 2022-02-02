import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DriverBirthday } from '../../../domain/DriverBirthday';
import { DriverName } from '../../../domain/DriverName';
import { LicenseNumber } from '../../../domain/LicenseNumber';
import { SerialNumber } from '../../../domain/SerialNumber';
import { DriverLicense } from '../../../domain/DriverLicense';
import { SafeDriving } from './SafeDriving';

describe('SafeDriving', () => {
  let app: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
    }).compile();

    app = moduleFixture.get<ConfigService>(ConfigService);
  });

  it('should success', async () => {
    const driverLicense = DriverLicense.createNew({
      driverName: DriverName.create(app.get('TEST_DRIVER_NAME')).value,
      driverBirthday: DriverBirthday.create(app.get('TEST_DRIVER_BIRTHDAY')).value,
      licenseNumber: LicenseNumber.create(app.get('TEST_LICENSE_NUMBER')).value,
      serialNumber: SerialNumber.create(app.get('TEST_SERIAL_NUMBER')).value,
    });

    expect((await SafeDriving.retrieve(driverLicense.value)).verified).toEqual(true);
  });

  it('should success without serial number', async () => {
    const driverLicenseWithOutSerialNumber = DriverLicense.createNew({
      driverName: DriverName.create(app.get('TEST_DRIVER_NAME')).value,
      driverBirthday: DriverBirthday.create(app.get('TEST_DRIVER_BIRTHDAY')).value,
      licenseNumber: LicenseNumber.create(app.get('TEST_LICENSE_NUMBER')).value,
      serialNumber: SerialNumber.create(null).value,
    });

    expect((await SafeDriving.retrieve(driverLicenseWithOutSerialNumber.value)).verified).toEqual(true);
  });

  it('should fail when wrong information', async () => {
    const driverLicenseWithWrongInformation = DriverLicense.createNew({
      driverName: DriverName.create(app.get('TEST_DRIVER_NAME')).value,
      driverBirthday: DriverBirthday.create(app.get('TEST_DRIVER_BIRTHDAY')).value,
      licenseNumber: LicenseNumber.create(app.get('TEST_LICENSE_NUMBER')).value,
      serialNumber: SerialNumber.create('123456').value,
    });

    expect((await SafeDriving.retrieve(driverLicenseWithWrongInformation.value)).verified).toEqual(false);
  });
});
