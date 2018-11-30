import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware { // 必须实现NestMiddleware接口
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => { // 会接收request、response及next方法
      console.log('Logger....');
      next(); // 告诉nest.js继续下一个middleware，如果没有，则交给request handler
    };
  }
}