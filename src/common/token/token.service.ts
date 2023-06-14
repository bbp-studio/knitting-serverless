import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
// import * as jwt from 'jsonwebtoken';
import { TokenConstant } from './token.constant';
import { Token } from './token';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TokenService {
  constructor(private tokenConstant: TokenConstant) {}

  /**
   *
   * @param payload
   * @param expiredTime 1h, 14d
   */
  create(payload: any, expiredTime: string): Token {
    return new Token(
      jwt.sign(payload, this.tokenConstant.SECRET_KEY, {
        expiresIn: expiredTime,
      }),
    );
  }

  /**
   *
   * @param token
   * @param type
   */
  getCustomClaims<T>(token: Token, type: any): T {
    return plainToClass(
      type,
      jwt.verify(token.value, this.tokenConstant.SECRET_KEY),
    ) as T;
  }
}
