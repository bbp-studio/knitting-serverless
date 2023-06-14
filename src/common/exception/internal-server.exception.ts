import { KnittingException } from './knitting.exception';

export class InternalServerException extends KnittingException {
  constructor(message: string) {
    super(message);
  }

  override getCode(): number {
    return 500;
  }
}
