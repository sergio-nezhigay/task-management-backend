// task.entity.ts
import { TaskList } from 'src/task-list/entities/task-list.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dueDate: Date;

  @Column({ default: 'low' })
  priority: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.tasks)
  taskList: TaskList;
}
