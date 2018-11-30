import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException) // 指定Catch HttpException
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) { // 预设传入HttpException、及ArgumentHost对象
    const ctx = host.switchToHttp(); // ArgumentsHost是个Wrapper，包含request、response等资讯
    const response = ctx.getResponse(); // 取得request物件，这里指的是Express中request，相关属性可以查阅Express API
    const request = ctx.getRequest(); // 取得response对象
    const status = exception.getStatus();

    response // 自定回复格式
      .status(status)
      .json({
        message: '自定错误信息',
        timestamp: new Date().toISOString(),
        requestedFrom: request.hostname,
        status,
      });
  }
}