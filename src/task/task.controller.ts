import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import CreateTaskDto from './dto/create-task.dto';
import FilterDto from './dto/filter.dto';
import TaskStatusPipe from './pipes/task-status.pipe';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor (private taskService: TaskService) {}

    @Get()
    getTasks(@Query() filterDto: FilterDto): Task[] {
        if (Object.keys(filterDto).length > 0) {
            console.log(filterDto)
            return this.taskService.getTaskWithFilter(filterDto)
        }
        return this.taskService.getAllTasks()
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: String): Task {
        return this.taskService.getTaskById(id)
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id: String, @Body('status', new TaskStatusPipe()) status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id') 
    deleteTask(@Param('id') id: String): void {
        return this.taskService.deleteTask(id)
    }
}
