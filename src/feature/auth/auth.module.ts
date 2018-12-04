import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from '../../shared/services/auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        // 建立jsonwebtoken时的相关信息
        JwtModule.register({
            secretOrPrivateKey: 'geekjc-demo',
            // signOption可以在JwtModule设定
            // 或是在createToken时候设定
            signOptions: {
                // expiresIn: 3600,
            },
        }),
        UserModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
