
import {Catch, ArgumentsHost, ExceptionFilter} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const RpcError = exception.getError();
    if ( typeof RpcError == 'object' && 'status' in RpcError && 'message' in RpcError){
      const status = isNaN(+RpcError.status) ? 400 : +RpcError.status;
      return response.status(status).json(RpcError);
    }

    response.status(400).json({
      status: 400,
      message: RpcError
    })
  }
}
