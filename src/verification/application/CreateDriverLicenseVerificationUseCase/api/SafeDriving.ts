import axios from 'axios';
import * as qs from 'qs';
import { JSDOM } from 'jsdom';
import { IRequestData } from './IRequestData';
import { InternalApiRequestError } from './InternalApiRequestError';

export class SafeDriving {
  static async retrieve(data: IRequestData): Promise<boolean> {
    const requestBody = qs.stringify({
      menuCode: 'MN-PO-1241',
      licenLocal: '11',
      sName: data.driverName,
      sJumin1: `${data.driverBirthdayYear.slice(2, 4)}${data.driverBirthdayMonth}${data.driverBirthdayDay}`,
      licence01: data.licenseNumber.split('-')[0],
      licence02: data.licenseNumber.split('-')[1],
      licence03: data.licenseNumber.split('-')[2],
      licence04: data.licenseNumber.split('-')[3],
      serialNum: data.serialNumber,
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
      return serialNumberMatched && licenseIsValid;
    } catch (e) {
      throw new InternalApiRequestError(e);
    }
  }
}
