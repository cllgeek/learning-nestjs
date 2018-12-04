import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UserModule } from './feature/user/user.module';
import { AuthModule } from './feature/auth/auth.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const userApiOptions = new DocumentBuilder()
			.setTitle('User API Doc')
			.setDescription('User API Info')
			.setVersion('1.0')
			.addBearerAuth()
			.addTag('users') // match tags in controllers
			.build();

	const userApiDocument = SwaggerModule.createDocument(app, userApiOptions, {include: [UserModule]});
	SwaggerModule.setup('v1/api/user', app, userApiDocument);

	const authApiOptions = new DocumentBuilder()
					.setTitle('Auth API Doc')
					.setDescription('Auth API Info')
					.setVersion('1.0')
					.addBearerAuth()
					.addTag('auth') // match tags in controllers
											.build();

	const authApiDocument = SwaggerModule.createDocument(app, authApiOptions, {include: [AuthModule]});
	SwaggerModule.setup('v1/api/auth', app, authApiDocument);

	await app.listen(3000);
}
bootstrap();
