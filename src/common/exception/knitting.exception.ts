export abstract class KnittingException extends Error {
  constructor(message: string) {
    super(message);
  }

  abstract getCode(): number;
}

export class AuthException extends KnittingException {
  constructor(message: string) {
    super(message);
  }

  getCode(): number {
    return 401;
  }
}
