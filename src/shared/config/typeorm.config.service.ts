import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from './config.service';
import { DatabaseType } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService
	// 需要实现TypeOrmOptionsFactory
			implements TypeOrmOptionsFactory {
	// 注入config service取得env变量
	constructor(private readonly configService: ConfigService) {}
	// 就是回传TypeOrmOptions对象
	createTypeOrmOptions(): TypeOrmModuleOptions{
		return {
			type: 'mysql', // configService.get('DB_TYPE') as DatabaseType,
			host: this.configService.get('DB_HOST'),
			port: Number(this.configService.get('DB_PORT')),
			username: this.configService.get('DB_USERNAME'),
			password: this.configService.getDbPassword(),
			database: this.configService.get('DB_NAME'),
			synchronize: this.configService.get('DB_TYPEORM_SYNC') === 'true',
			logging: this.configService.get('DB_TYPEORM_LOG') === 'true',
			entities: [
				'src/shared/entity/*.ts',
			],
			migrations: [
				'src/shared/migration/**/*.ts',
			],
			subscribers: [
				'src/shared/subscriber/*.ts',
			],
		};
	}
}
