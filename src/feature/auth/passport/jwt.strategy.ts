import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
					// 这里没有intellisense可以用，下面这一段是说
					// 要从header取得bearer token
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					// 这里的key就是要跟create token时的key一样
					secretOrKey: 'geekjc-demo',
        });
    }

    // Passport会自动verify jwt，如果key不正确，或是相关信息
    // 不正确，如issuer
    async validate(payload){
        const user = await this.authService.validateUser(payload);
        if (!user) throw new UnauthorizedException();
        return user;
    }

}
