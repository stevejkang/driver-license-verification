import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { init as SentryInit } from '@sentry/node';
import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /** Swagger Document **/
  setupDocument(app);

  /** Sentry **/
  // SentryInit({
  //   dsn: '',
  // });

  await app.listen(3000);
}

export async function setupDocument(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('Driver License Verification API').setDescription('An unofficial driver license verification crawler API service.').setVersion('Alpha').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCss: `
      .topbar { display: none; }
      .swagger-ui { padding-top: 50px; }`,
    customSiteTitle: 'Driver License Verification API',
  });
}

bootstrap();
