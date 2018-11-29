import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  list(): string {
    return '极客教程';
  }

  @Post()
  create(){
    return '地址：https://www.geekjc.com';
  }

  @Put()
  update(){
    return '更新数据';
  }

  @Delete()
  delete(){
    return '刪除数据';
  }
}