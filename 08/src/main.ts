import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvironmentVariable } from './common/environment-variable';

const DEFAULT_PORT = '4000';

const configService = new ConfigService<EnvironmentVariable>();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.disable('x-powered-by');
  app.enableCors();

  const configuration = new DocumentBuilder()
    .setTitle('Home library service')
    .setDescription('API')
    .build();
  const document = SwaggerModule.createDocument(app, configuration);

  SwaggerModule.setup('doc', app, document);

  const port = configService.get('PORT', { infer: true }) ?? DEFAULT_PORT;

  await app.listen(port, () => {
    console.info('Documentation: http://localhost:{PORT}/doc');
  });
}

void bootstrap();
