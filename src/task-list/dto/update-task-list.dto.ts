// update-task-list.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskListDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
