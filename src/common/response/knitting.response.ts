import { HttpStatus } from '@nestjs/common';

export class KnittingResponse<T> {
  code: number;
  message: string = null;
  data: T = null;

  constructor(code: number, message: string = null, data: T = null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static ofException(
    HttpStatus: HttpStatus,
    message: string,
  ): KnittingResponse<null> {
    return new KnittingResponse<null>(HttpStatus, message);
  }

  static of<T>(data: T = null): KnittingResponse<T> {
    return new KnittingResponse<T>(200, null, data);
  }

  static ofStatusAndData<T>(
    code: HttpStatus,
    data: T = null,
  ): KnittingResponse<T> {
    return new KnittingResponse<T>(code, null, data);
  }
}
