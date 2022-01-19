import axios from 'axios';
import * as qs from 'qs';
import { JSDOM } from 'jsdom';
import { InternalApiRequestError } from './InternalApiRequestError';
import { DriverLicense } from '../../../domain/DriverLicense';

export class SafeDriving {
  static async retrieve(data: DriverLicense): Promise<DriverLicense> {
    const requestBody = qs.stringify({
      menuCode: 'MN-PO-1241',
      licenLocal: '11',
      sName: data.driverName.value,
      sJumin1: `${data.driverBirthday.year.slice(2, 4)}${data.driverBirthday.month}${data.driverBirthday.date}`,
      licence01: data.licenseNumber.value.split('-')[0],
      licence02: data.licenseNumber.value.split('-')[1],
      licence03: data.licenseNumber.value.split('-')[2],
      licence04: data.licenseNumber.value.split('-')[3],
      serialNum: data.serialNumber.value,
    });

    const response = await axios({
      method: 'POST',
      url: 'https://www.safedriving.or.kr/LnrForRtnLicns/LnrForRtnLicnsTruthYnComplete.do',
      data: requestBody,
    });

    try {
      const responseHtml = new JSDOM(response.data);
      const licenseIsValid = responseHtml.window.document.querySelector('.contents > .ul_list > li:nth-child(2)').innerHTML === '도로교통공단 전산 자료와 일치합니다.';
      const serialNumberMatched = responseHtml.window.document.querySelector('.contents > .ul_list > li:nth-child(1)').innerHTML === '암호일련번호가 일치합니다.';
      const isVerified = data.serialNumber.value !== null ? serialNumberMatched && licenseIsValid : licenseIsValid;
      return DriverLicense.create(
        {
          driverName: data.driverName,
          driverBirthday: data.driverBirthday,
          licenseNumber: data.licenseNumber,
          serialNumber: data.serialNumber,
          verified: isVerified,
        },
        data.id,
      ).value;
    } catch (e) {
      throw new InternalApiRequestError(e);
    }
  }
}
