import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService} from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
      // 注入UsersService，所以需要import UsersModule
      // 底下的provider才能被注入
            private readonly usersService: UserService,
            private readonly jwtService: JwtService,
  ) {}

    async createToken(name: string) {

        // 验证使用者，用最简单举例
        // if (name !== password) {
        //     throw new UnauthorizedException();
        // }

        const user = { name };
        const expiration = 60 * 60 * 1000;
        // 将使用者资讯加密
        const accessToken = this.jwtService.sign(user, {
            // 关于建立token时相关参数
            // 过期时间
            expiresIn: expiration,
            // issuer:'http://iron-nest.org',
            // algorithm:'RS256', // default是HMAC SHA256，也可以指定別的
        });

        return {
            expiration,
            accessToken,
        };

    }

  async validateUser(payload) {
    // jwt decoded后会得到上面的user object
    return await this.usersService.findOneByName(payload.name);
  }
}
