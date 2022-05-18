import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HistoryModule } from './history/history.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://leo:cmcx100pre@chestweather.cmpkq.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'history/save', method: RequestMethod.POST },
      {
        path: 'history',
        method: RequestMethod.GET,
      },
    );
  }
}

/* 
mongodb+srv://leo:<password>@chestweather.cmpkq.mongodb.net/?retryWrites=true&w=majority
mongodb://leo:cmcx100pre@localhost:20000
 */
