import { Module, NestModule,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module'
import {LoggerMiddleware, NoSniffMiddleware, XPoweredByMiddleware} from './middleware'

import {interceptorProviders} from './helpers/interceptor'

import { AppUpdateModule } from './modules/app-update/app-update.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AppUpdateModule,
    DatabaseModule
  ],
  controllers: [

  ],
  providers: [

     ...interceptorProviders
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}
