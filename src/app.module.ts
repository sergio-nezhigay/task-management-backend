import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { TaskListModule } from './task-list/task-list.module';
import { TaskList } from './task-list/entities/task-list.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Task, TaskList],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    TaskModule,
    TaskListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
