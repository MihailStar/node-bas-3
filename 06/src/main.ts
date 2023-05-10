import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const DEFAULT_PORT = '4000';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env['PORT'] ?? DEFAULT_PORT;

  app.disable('x-powered-by');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configuration = new DocumentBuilder()
    .setTitle('Home library service')
    .setDescription('API')
    .build();
  const document = SwaggerModule.createDocument(app, configuration);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    console.info(`✓ http://localhost:${port}/doc`);
  });
}

void bootstrap();
