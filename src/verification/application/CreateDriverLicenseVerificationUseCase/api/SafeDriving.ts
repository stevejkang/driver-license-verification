import axios, { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { JSDOM } from 'jsdom';
import { IRequestData } from './IRequestData';

export class SafeDriving {
  static async retrieve(data: IRequestData): Promise<boolean> {
    const body = qs.stringify({
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

    const config = {
      method: 'POST',
      url: 'https://www.safedriving.or.kr/LnrForRtnLicns/LnrForRtnLicnsTruthYnComplete.do',
      data: body,
    };

    const response = await axios(config as AxiosRequestConfig);

    try {
      const responseHtml = new JSDOM(response.data);
      const licenseIsValid = responseHtml.window.document.querySelector('.contents > .ul_list > li:nth-child(2)').innerHTML === '도로교통공단 전산 자료와 일치합니다.';
      const serialNumberMatched = responseHtml.window.document.querySelector('.contents > .ul_list > li:nth-child(1)').innerHTML === '암호일련번호가 일치합니다.';
      console.log(serialNumberMatched);
      console.log(licenseIsValid);
      console.log({
        a: responseHtml.window.document.querySelector('.contents > .ul_list > li:nth-child(2)').innerHTML,
        b: responseHtml.window.document.querySelector('.contents > .ul_list > li:nth-child(1)').innerHTML,
      });
      return serialNumberMatched && licenseIsValid;
    } catch (e) {
      console.log(e);
    }
  }
}
