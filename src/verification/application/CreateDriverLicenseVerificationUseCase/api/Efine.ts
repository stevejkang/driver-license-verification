import axios from 'axios';
import * as qs from 'qs';
import { JSDOM } from 'jsdom';
import { InternalApiRequestError } from './InternalApiRequestError';
import { DriverLicense } from '../../../domain/DriverLicense';

export class Efine {
  static async retrieve(data: DriverLicense): Promise<DriverLicense> {
    const requestBody = qs.stringify({
      checkPage: 2,
      flag: 'searchPage',
      regYear: data.driverBirthday.year,
      regMonth: data.driverBirthday.month,
      regDate: data.driverBirthday.date,
      name: data.driverName.value,
      licenNo0: data.licenseNumber.value.split('-')[0],
      licenNo1: data.licenseNumber.value.split('-')[1],
      licenNo2: data.licenseNumber.value.split('-')[2],
      licenNo3: data.licenseNumber.value.split('-')[3],
      btnSearch_msg0_new: '1A1A1A',
      Security_Mag: '1A1A1A',
      ghostNo: data.serialNumber.value,
    });

    const response = await axios({
      method: 'POST',
      url: 'https://www.efine.go.kr/licen/truth/licenTruth.do?subMenuLv=010100',
      data: requestBody,
    });

    try {
      const responseHtml = new JSDOM(response.data);
      const licenseIsValid = responseHtml.window.document.querySelector('#licen-truth > tbody > tr:nth-child(1) > td > b:nth-child(1) > font').textContent === '전산 자료와 일치 합니다.';
      const serialNumberMatched =
        data.serialNumber.value !== null
          ? responseHtml.window.document.querySelector('#licen-truth > tbody > tr:nth-child(1) > td > b:nth-child(2) > font').textContent === '식별번호가 일치합니다.'
          : false;
      const isVerified = data.serialNumber.value !== null ? licenseIsValid && serialNumberMatched : licenseIsValid;
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
