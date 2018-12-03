import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/entity/User';
import { PlatformService } from '../../shared/services/platform.service';
import { Platform } from '../../shared/entity/Platform';
import { Role } from '../../shared/entity/Role';
import { RoleService } from '../../shared/services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Platform, Role])],
  providers: [UserService, PlatformService, RoleService],
  controllers: [UserController],
})
export class UserModule {}
