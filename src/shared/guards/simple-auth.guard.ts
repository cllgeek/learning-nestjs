import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate{ // 实现CanActive接口
    constructor(private readonly reflector: Reflector){} // 注入Reflector，存取相关metadata
    canActivate(
      context: ExecutionContext, // 可以取得对应controller及request/request信息
    ): boolean | Promise<boolean> | Observable<boolean> {  // 回传boolean类型，支持非同步

      // 验证逻辑
      const req = context.switchToHttp().getRequest(); // 取得request对象
      const ctrl = context.getClass();

      Logger.log(`Controller Name: ${ctrl.name}`);
      const handler = context.getHandler(); // nest.js利用reflect metadata取得存取资源对应的方法
      Logger.log(`Method Name: ${handler.name}`);

      // 利用get取得'roles'的值
      // 第二个參數是告诉reflector取得哪一个方法的metadata
      const roles = this.reflector.get<string[]>('roles', handler);

      Logger.log(`---允许的Roles有---`);
      // 使用Logger來測試有沒有取得roles的對應的value
      Logger.log(roles);

      if (req.hostname === 'localhost'){
        Logger.log(`Requested From: ${req.hostname}`);
        return true;
      }
      return false;
    }
}