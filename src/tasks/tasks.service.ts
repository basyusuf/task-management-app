import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }
    getTaskWithFilter(filterDto:GetTaskFilterDto):Task[]{
        const {status,search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(item=>item.status===status);
        }
        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find(task=>task.id === id);
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const {title,description} = createTaskDto;
        const task:Task = {
            title,
            description,
            status:TaskStatus.OPEN,
            id:uuid.v1()
        };
        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id:string){
        const index = this.tasks.findIndex(x=>x.id === id);
        if(index !== -1){
            console.log("Index:",index)
            this.tasks.splice(index,1);
            return true;
        }
        console.log("Not found Item in Array");
        return false;
    }

    updateTaskStatus(id:string,status:TaskStatus):Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

}
