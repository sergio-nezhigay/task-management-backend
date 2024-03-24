// task-list.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from './entities/task-list.entity';
//import { TaskList } from './task-list.entity';

@Controller('task-lists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  async create(@Body() createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    return this.taskListService.createTaskList(createTaskListDto);
  }

  @Get()
  async findAll(): Promise<TaskList[]> {
    console.log('first');
    return this.taskListService.findAllTaskLists();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskList> {
    return this.taskListService.findTaskListById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskListDto: UpdateTaskListDto): Promise<TaskList> {
    return this.taskListService.updateTaskList(+id, updateTaskListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskListService.deleteTaskList(+id);
  }
}
