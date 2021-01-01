import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';
export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.DONE,TaskStatus.IN_PROGRESS])
    status:TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}