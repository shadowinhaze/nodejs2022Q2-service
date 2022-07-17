import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
  });
}

bootstrap();
