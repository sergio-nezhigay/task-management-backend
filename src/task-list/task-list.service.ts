// task-list.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from './entities/task-list.entity';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>
  ) {}

  async createTaskList(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    const { name } = createTaskListDto; // Extract name from DTO
    const taskList = this.taskListRepository.create({ name });
    return this.taskListRepository.save(taskList);
  }

  async findAllTaskLists(): Promise<TaskList[]> {
    return this.taskListRepository.find();
  }

  async findTaskListById(id: number): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOne({ where: { id } });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    return taskList;
  }

  async updateTaskList(id: number, updateTaskListDto: UpdateTaskListDto): Promise<TaskList> {
    const { name } = updateTaskListDto; // Extract name from DTO
    const taskList = await this.findTaskListById(id);
    taskList.name = name;
    return this.taskListRepository.save(taskList);
  }

  async deleteTaskList(id: number): Promise<void> {
    const taskList = await this.findTaskListById(id);
    await this.taskListRepository.remove(taskList);
  }
}
