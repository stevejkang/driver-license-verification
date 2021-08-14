import { ApiProperty } from '@nestjs/swagger';

export class DriverLicenseVerificationControllerRequestBody {
  @ApiProperty({
    description: "Driver's Name",
    example: '홍길동',
  })
  driverName: string;

  @ApiProperty({
    description: "Driver's Birthday (YYYY-MM-DD)",
    example: '2001-12-08',
  })
  driverBirthday: string;

  @ApiProperty({
    description: `License Number (Incl. hyphen)\n
한글의 경우 숫자로 변환되어야 합니다.\n서울:11 부산:12 경기:13 강원:14 충북:15 충남:16 전북:17 전남:18 경북:19 경남:20 제주:21 대구:22 인천:23 광주:24 대전:25 울산:26 경기북부:28 경기남부:13`,
    example: '11-90-623000-00',
  })
  licenseNumber: string;

  @ApiProperty({
    description: 'Serial Number',
    example: 'XXXXXX',
  })
  serialNumber: string;
}
