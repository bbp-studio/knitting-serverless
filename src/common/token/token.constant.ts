import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenConstant {
  SECRET_KEY = process.env.JWT_SECRET_KEY;
}
