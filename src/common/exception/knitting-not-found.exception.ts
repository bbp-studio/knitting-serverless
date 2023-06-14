import { KnittingException } from './knitting.exception';

export class KnittingNotFoundException extends KnittingException {
  constructor(message: string) {
    super(message);
  }

  override getCode(): number {
    return 404;
  }
}
