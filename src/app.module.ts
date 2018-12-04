import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { cors } from 'cors';
import { AuthGuard } from './shared/guards/simple-auth.guard';
import { HttpExceptionFilter } from './shared/filters/httpexception.filter';
import { TransformResInterceptor } from './shared/interceptors/transformRes.interceptor';
import { PlatformModule } from './feature/platform/platform.module';
import { RoleModule } from './feature/role/role.module';
import { AuthModule } from './feature/auth/auth.module';

@Module({
  imports: [
		SharedModule,
		PlatformModule,
		RoleModule,
		AuthModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, HttpExceptionFilter, TransformResInterceptor],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, cors)
      .exclude(
        { path: '/', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
      )
      .forRoutes(AppController);
  }
}
