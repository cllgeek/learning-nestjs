import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from '../../shared/entity/Platform';
import { PlatformService } from '../../shared/services/platform.service';
import { PlatformController } from './platform.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Platform])],
  providers: [PlatformService],
  controllers: [PlatformController],
})
export class PlatformModule {}
