import { IsNotEmpty, IsString, IsOptional, IsDate, IsEnum, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: string;

  @IsNotEmpty()
  @IsNumber()
  taskListId: number;
}
