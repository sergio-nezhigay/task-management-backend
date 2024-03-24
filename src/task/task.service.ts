// task.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskList } from 'src/task-list/entities/task-list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskList) // Inject TaskList repository
    private readonly taskListRepository: Repository<TaskList> // Corrected injection
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { taskListId, ...taskData } = createTaskDto;

    // Retrieve the task list associated with the provided taskListId
    const taskList = await this.taskListRepository.findOne({ where: { id: taskListId } });
    if (!taskList) {
      throw new NotFoundException(`Task list with ID ${taskListId} not found`);
    }

    // Create a new task associated with the retrieved task list
    const task = this.taskRepository.create({ ...taskData, taskList });
    return this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, updateTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.findTaskById(id);
    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.findTaskById(id);
    await this.taskRepository.remove(task);
  }
}
