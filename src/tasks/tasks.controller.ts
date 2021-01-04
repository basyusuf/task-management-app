import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decarator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() filterDto:GetTaskFilterDto,
        @GetUser() user:User):Promise<Task[]>{
        return this.tasksService.getTasks(filterDto,user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User):Promise<Task>{
        return this.tasksService.getTaskById(id,user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto:CreateTaskDto,
        @GetUser() user:User
        ):Promise<Task>{
        return this.tasksService.createTask(createTaskDto,user);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id',ParseIntPipe) id:number):Promise<void>{
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id',ParseIntPipe) id:number,
        @Body('status',TaskStatusValidationPipe) status:TaskStatus,
        @GetUser() user:User
    ):Promise<Task>{
        return this.tasksService.updateTaskStatus(id,status,user);
    }


}   
