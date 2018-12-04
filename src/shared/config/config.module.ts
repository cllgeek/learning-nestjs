import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [
        // 这是nestjs另外一种Dependency Injection的方式
        {
            // 如果nestjs IoC Container要ConfigService的时候
            provide: ConfigService,
            // 回传"这个"值
            // 刚刚的ConfigService要传入.env路径及文件名
            useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
        },
    ],
    // export表示这个Module被import后，ConfigService可以被其他Module Inject
    exports: [ConfigService],
})
export class ConfigModule {}
