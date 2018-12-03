import { Controller, Post, Body, Get, Query, UnauthorizedException, Param, Put } from '@nestjs/common';
import { PlatformDTO } from '../../shared/DTOs/platformDTO';
import { PlatformService } from '../../shared/services/platform.service';

@Controller('platform')
export class PlatformController {
		constructor(private readonly platformService: PlatformService) {}

		@Get()
		platformList() {
			return this.platformService.getPlatforms();
		}

		@Get('platforms')
		queryList(@Query() query){
			throw new UnauthorizedException('请登入');
			return query;
		}

		@Get(':platformId')
		getPlatformById(@Param('platformId') id){
			return this.platformService.getPlatformById(id);
		}

		@Put(':platformId')
  	updateUserById(@Param('platformId') id, @Body() platformDTO: PlatformDTO){
			return this.platformService.updatePlatform(id, platformDTO);
		}

    @Post()
    create(@Body() platformDTO: PlatformDTO){
			// throw new HttpException('糟糕!您的要求有问题，请联系管理员', HttpStatus.BAD_REQUEST);
			return this.platformService.addPlatform(platformDTO);
    }
}
