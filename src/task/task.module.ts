import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { TaskList } from 'src/task-list/entities/task-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskList]), // Include TaskList in the forFeature array
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
