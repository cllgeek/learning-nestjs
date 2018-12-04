import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../shared/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    // 传入name及password取得jwt token
    @Post('getToken')
    getTokenByUserId(
			@Body('name') name: string,
    ){
      return this.authService.createToken(name);
    }
}
