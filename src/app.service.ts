import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOk(): boolean {
    return true;
  }
}
