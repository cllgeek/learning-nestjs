import { Controller, Delete, Get, Post, Put, Param, Query, Body, UsePipes, HttpException,
  HttpStatus, UnauthorizedException, UseFilters, UseGuards, ReflectMetadata, UseInterceptors } from '@nestjs/common';
import { PlatformDTO } from './shared/DTOs/platformDTO';
import { PlatformDTOValidationPipe } from './shared/pipes/platformDTOValidationPipe';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './shared/filters/httpexception.filter';
import { AuthGuard } from './shared/guards/simple-auth.guard';
import { TransformResInterceptor } from './shared/interceptors/transformRes.interceptor';
import { ConfigService } from './shared/config/config.service';

// fake data
const inLearningPlatforms = [
  {
    id: 1,
    platformname: '极客教程',
    url: 'https://www.geekjc.com',
  },
  {
    id: 2,
    platformname: 'geekjc',
    url: 'https://www.geekjc.com',
  },
];

@Controller()
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(TransformResInterceptor)
export class AppController {

	constructor(
		private appService: AppService,
		private configService: ConfigService,
	){}

  // @Get()
  // sayHello() {
  //   return this.appService.sayHello();
  // }

  // @Get(':platformId')
  // getPlatformById(@Param('platformId') id){
  //   const platform = inLearningPlatforms.find(value => value.id === parseInt(id, 10)); // 解析后都是字串，要使用parseInt转成number
  //   const resPlatform = new PlatformDTO();
  //   resPlatform.platformname = platform.platformname;
  //   resPlatform.url = platform.url;
  //   return resPlatform;
	// }

	@Get()
  getAppIndex(){
    // 用get并传入.env底下APP_NAME这个key
    return this.configService.get('APP_NAME');
  }

  @Get('users')
  queryedList(@Query() query) {
    throw new UnauthorizedException('请登入');
    return query;
  }

  @Post()
  @ReflectMetadata('roles', ['admin']) // @ReflectMeatadata提供key-value pair功能，之后可以在AuthGuard里面取的此metadata
  @UsePipes(PlatformDTOValidationPipe)
  create(@Body() platformDTO: PlatformDTO){ // platDTO: PlatformDTO代表platformDTO是PlatformDTO型別
   // 丟出badreqest例外
  //  throw new HttpException('糟糕!您的要求有问题，请联系系统管路员', HttpStatus.BAD_REQUEST);
   return `平台:${platformDTO.platformname}已建立`;
  }

  // @Post()
  // create(){
  //   return '地址：https://www.geekjc.com';
  // }

  @Put()
  update(){
    return '更新数据';
  }

  @Delete()
  delete(){
    return '刪除数据';
  }
}
