import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { LoggingService } from './logging/logging.service';
import { CustomFilter } from './logging/custom.filter';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const log = app.get(LoggingService);
  log.setLogLvl(Number(process.env.NEST_LOG_LEVEL));
  app.useLogger(log);
  app.useGlobalFilters(new CustomFilter(log));

  app.useGlobalPipes(new ValidationPipe());

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
  });

  // throw new Error('Please write me');
}

bootstrap();
