import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform{
    readonly enumArray = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];
    
    transform(value:any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value;
    }
    private isStatusValid(status:any){
        const index = this.enumArray.indexOf(status);
        return index !== -1;
    }
}