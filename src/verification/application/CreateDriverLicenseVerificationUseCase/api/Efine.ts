import axios from 'axios';
import * as qs from 'qs';
import { JSDOM } from 'jsdom';
import { IRequestData } from './IRequestData';
import { InternalApiRequestError } from './InternalApiRequestError';

export class Efine {
  static async retrieve(data: IRequestData): Promise<boolean> {
    const requestBody = qs.stringify({
      checkPage: 2,
      flag: 'searchPage',
      regYear: data.driverBirthdayYear,
      regMonth: data.driverBirthdayMonth,
      regDate: data.driverBirthdayDay,
      name: data.driverName,
      licenNo0: data.licenseNumber.split('-')[0],
      licenNo1: data.licenseNumber.split('-')[1],
      licenNo2: data.licenseNumber.split('-')[2],
      licenNo3: data.licenseNumber.split('-')[3],
      ghostNo: data.serialNumber,
    });

    const response = await axios({
      method: 'POST',
      url: 'https://www.efine.go.kr/licen/truth/licenTruth.do?subMenuLv=010100',
      data: requestBody,
    });

    try {
      const responseHtml = new JSDOM(response.data);
      const licenseIsValid = responseHtml.window.document.querySelector('#licen-truth > tbody > tr:nth-child(1) > td > b:nth-child(1) > font').textContent === '전산 자료와 일치 합니다.';
      const serialNumberMatched = responseHtml.window.document.querySelector('#licen-truth > tbody > tr:nth-child(1) > td > b:nth-child(2) > font').textContent === '식별번호가 일치합니다.';
      console.log(serialNumberMatched);
      console.log(licenseIsValid);
      console.log({
        a: responseHtml.window.document.querySelector('#licen-truth > tbody > tr:nth-child(1) > td > b:nth-child(1) > font').textContent,
        b: responseHtml.window.document.querySelector('#licen-truth > tbody > tr:nth-child(1) > td > b:nth-child(2) > font').textContent,
      });
      return serialNumberMatched && licenseIsValid;
    } catch (e) {
      throw new InternalApiRequestError(e);
    }
  }
}
