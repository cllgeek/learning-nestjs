import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/entity/User';
import { PlatformService } from '../../shared/services/platform.service';
import { Platform } from '../../shared/entity/Platform';
import { Role } from '../../shared/entity/Role';
import { RoleService } from '../../shared/services/role.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
		// PassportModule.register({defaultStrategy: 'bearer'})
		// 指定strategy, 不用再AuthGuard里特别指定
		PassportModule.register({defaultStrategy: 'jwt'}),
		TypeOrmModule.forFeature([User, Platform, Role]),
  ],
  providers: [UserService, PlatformService, RoleService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
