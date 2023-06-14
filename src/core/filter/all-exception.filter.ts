import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { KnittingException } from '../../common/exception/knitting.exception';
import { KnittingResponse } from '../../common/response/knitting.response';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(this.constructor.name);

  /**
   *
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost): any {
    this.logger.error(`exception: ${JSON.stringify(exception)}`);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status = null;
    let message = null;

    if (exception instanceof KnittingException) {
      status = exception.getCode();
      message = exception.message ?? 'Unknown error';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message ?? 'Unknown error';
    }

    response
      .status(200)
      .json(
        KnittingResponse.ofException(
          status ?? HttpStatus.INTERNAL_SERVER_ERROR,
          message ?? 'Unknown error',
        ),
      );
  }
}
