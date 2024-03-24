// task-list.entity.ts
import { Task } from 'src/task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { Task } from './task.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
