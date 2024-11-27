import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Local Database
// TypeOrmModule.forRoot({
//       type: 'mongodb',
//       url: 'mongodb://localhost:27017/nest-task-app',
//       database: 'nest-task-app',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       ssl: false,
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     }),

// Remote Database
// TypeOrmModule.forRoot({
//   type: 'mongodb',
//   url: 'mongodb+srv://ahmer:Yahoo786@cluster0.2iz16.mongodb.net/mbe-erp?retryWrites=true&w=majority',
//   synchronize: true, // Automatically creates database schema based on your entities (use carefully in production)
//   useUnifiedTopology: true,
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
// });
