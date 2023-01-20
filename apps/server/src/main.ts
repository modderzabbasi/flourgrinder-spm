import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  app.useLogger(app.get(Logger));
}
bootstrap();
