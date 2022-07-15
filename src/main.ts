import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
  });
}

bootstrap();
