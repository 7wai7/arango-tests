import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const SERVICE_PORT = process.env.SERVICE_PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(SERVICE_PORT);
}
bootstrap();
