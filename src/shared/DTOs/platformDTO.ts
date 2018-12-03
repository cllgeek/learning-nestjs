import { IsString, Length, IsUrl } from 'class-validator';

export class PlatformDTO{
    @IsString()
    @Length(0, 10, {
        message: '长度需要小于十',
    })
    platformname: string;

    @IsString()
    title: string;

    @IsUrl()
    url: string;
  }