import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger';

jest.mock('@nestjs/core');

interface DocumentationConfig {
  title: string;
  description: string;
  version: string;
  endpoint: string;
}

describe('Main', () => {
  it('should creates a NestFactory', async () => {
    const listenSpy = jest.fn();
    const createSpy = Promise.resolve({
      listen: listenSpy,
    }) as unknown as Promise<INestApplication>;

    jest.spyOn(NestFactory, 'create').mockImplementation(() => createSpy);

    const bootstrap = require('./main').bootstrap;
    await bootstrap();
    expect(listenSpy).toHaveBeenCalledTimes(2);
    expect(listenSpy).toHaveBeenCalledWith(3000);
  });

  it('should correctly initialize swagger API documentation', () => {
    const nestApp = {};
    const swaggerDocument = {};
    SwaggerModule.createDocument = jest.fn().mockReturnValue(swaggerDocument);
    SwaggerModule.setup = jest.fn();

    const documentConfig: DocumentationConfig = {
      title: 'Driver License Verification API',
      description: 'An unofficial driver license verification crawler API service with live status check support.',
      version: 'Alpha',
      endpoint: 'docs',
    };

    const customConfig: SwaggerCustomOptions = {
      customCss: `
      .topbar { display: none; }
      .swagger-ui { padding-top: 50px; }`,
      customSiteTitle: 'Driver License Verification API',
    };

    const setupDocument = require('./main').setupDocument;

    setupDocument(nestApp);

    expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
      nestApp,
      expect.objectContaining(<Omit<OpenAPIObject, 'paths'>>{
        info: {
          contact: {},
          description: documentConfig.description,
          title: documentConfig.title,
          version: documentConfig.version,
        },
      }),
    );
    expect(SwaggerModule.setup).toHaveBeenCalledWith(documentConfig.endpoint, nestApp, swaggerDocument, customConfig);
  });
});
