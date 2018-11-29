import { Controller, Delete, Get, Post, Put, Param, Query, Body } from '@nestjs/common';

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

export class PlatformDTO{
  platformname: string;
  url: string;
}

@Controller()
export class AppController {

  @Get(':platformId')
  getPlatformById(@Param('platformId') id){
    const platform = inLearningPlatforms.find(value => value.id === parseInt(id, 10)); // 解析后都是字串，要使用parseInt转成number
    const resPlatform = new PlatformDTO();
    resPlatform.platformname = platform.platformname;
    resPlatform.url = platform.url;
    return resPlatform;
  }

  @Get()
  queryedList(@Query() query): string {
    return query;
  }

  @Post()
  create(@Body() platformDTO: PlatformDTO){ // platDTO: PlatformDTO代表platformDTO是PlatformDTO型別
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