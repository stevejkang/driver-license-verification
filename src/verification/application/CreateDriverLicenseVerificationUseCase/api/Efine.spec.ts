import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../app.module';
import { DriverBirthday } from '../../../domain/DriverBirthday';
import { DriverName } from '../../../domain/DriverName';
import { LicenseNumber } from '../../../domain/LicenseNumber';
import { SerialNumber } from '../../../domain/SerialNumber';
import { DriverLicense } from '../../../domain/DriverLicense';
import { Efine } from './Efine';

describe('Efine', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should success', async () => {
    const configService = app.get(ConfigService);

    const driverLicense = DriverLicense.createNew({
      driverName: DriverName.create(configService.get('TEST_DRIVER_NAME')).value,
      driverBirthday: DriverBirthday.create(configService.get('TEST_DRIVER_BIRTHDAY')).value,
      licenseNumber: LicenseNumber.create(configService.get('TEST_LICENSE_NUMBER')).value,
      serialNumber: SerialNumber.create(configService.get('TEST_SERIAL_NUMBER')).value,
    });

    expect((await Efine.retrieve(driverLicense.value)).verified).toEqual(true);
  });

  it('should success without serial number', async () => {
    const configService = app.get(ConfigService);

    const driverLicenseWithOutSerialNumber = DriverLicense.createNew({
      driverName: DriverName.create(configService.get('TEST_DRIVER_NAME')).value,
      driverBirthday: DriverBirthday.create(configService.get('TEST_DRIVER_BIRTHDAY')).value,
      licenseNumber: LicenseNumber.create(configService.get('TEST_LICENSE_NUMBER')).value,
      serialNumber: SerialNumber.create(null).value,
    });

    expect((await Efine.retrieve(driverLicenseWithOutSerialNumber.value)).verified).toEqual(true);
  });

  it('should fail when wrong information', async () => {
    const configService = app.get(ConfigService);

    const driverLicenseWithWrongInformation = DriverLicense.createNew({
      driverName: DriverName.create(configService.get('TEST_DRIVER_NAME')).value,
      driverBirthday: DriverBirthday.create(configService.get('TEST_DRIVER_BIRTHDAY')).value,
      licenseNumber: LicenseNumber.create(configService.get('TEST_LICENSE_NUMBER')).value,
      serialNumber: SerialNumber.create('123456').value,
    });

    expect((await Efine.retrieve(driverLicenseWithWrongInformation.value)).verified).toEqual(false);
  });
});
