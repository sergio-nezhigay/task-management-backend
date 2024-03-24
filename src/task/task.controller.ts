import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { async } from 'rxjs';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const tmp = await this.taskService.findTaskById(+id);
    console.log('🚀 ~ tmp:', tmp);

    return this.taskService.findTaskById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(+id);
  }
}
