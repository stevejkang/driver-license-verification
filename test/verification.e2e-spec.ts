import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('DriverLicenseVerificationController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/verification (POST)', () => {
    const configService = app.get(ConfigService);

    return request(app.getHttpServer())
      .post('/verification')
      .send({
        driverName: configService.get('TEST_DRIVER_NAME'),
        driverBirthday: configService.get('TEST_DRIVER_BIRTHDAY'),
        licenseNumber: configService.get('TEST_LICENSE_NUMBER'),
        serialNumber: configService.get('TEST_SERIAL_NUMBER'),
      })
      .expect(200)
      .expect({
        isSuccess: true,
        verificationResult: 'VALID',
      });
  });

  it('/verification (POST) - serialNumber is empty', () => {
    const configService = app.get(ConfigService);

    return request(app.getHttpServer())
      .post('/verification')
      .send({
        driverName: configService.get('TEST_DRIVER_NAME'),
        driverBirthday: configService.get('TEST_DRIVER_BIRTHDAY'),
        licenseNumber: configService.get('TEST_LICENSE_NUMBER'),
        serialNumber: '',
      })
      .expect(200)
      .expect({
        isSuccess: true,
        verificationResult: 'VALID',
      });
  });

  it('/verification (POST) - serialNumber not given', () => {
    const configService = app.get(ConfigService);

    return request(app.getHttpServer())
      .post('/verification')
      .send({
        driverName: configService.get('TEST_DRIVER_NAME'),
        driverBirthday: configService.get('TEST_DRIVER_BIRTHDAY'),
        licenseNumber: configService.get('TEST_LICENSE_NUMBER'),
      })
      .expect(200)
      .expect({
        isSuccess: true,
        verificationResult: 'VALID',
      });
  });
});
