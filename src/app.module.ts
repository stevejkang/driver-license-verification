import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenModule, RavenInterceptor } from 'nest-raven';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerificationModule } from './verification/VerificationModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RavenModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
    AppService,
  ],
})
export class AppModule {}
