import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './logging.midlware';
import { LoggingService } from './logging.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
