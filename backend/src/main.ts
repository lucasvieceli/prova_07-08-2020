import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormPipe } from './pipes/form.pipe';
import { useContainer } from 'class-validator';
import { GlobalExceptionFilter } from 'nestjs-exceptions';
import { ValidationPipe } from '@nestjs/common';

const logErrorsWithStatusCode = [400, 401,422];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true
  })
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  app.useGlobalPipes(new FormPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.useGlobalFilters(new GlobalExceptionFilter(false, true, logErrorsWithStatusCode));
  await app.listen(3000);
}
bootstrap();
