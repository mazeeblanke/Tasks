import { Injectable, NotFoundException } from '@nestjs/common';
import CreateTaskDto from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid'; 
import FilterDto from './dto/filter.dto';

@Injectable()
export class TaskService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filter: FilterDto): Task[] {
        const { status, searchTerm } = filter
        let tasks = this.getAllTasks()

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (searchTerm) {
            tasks = tasks.filter(task => {
                return task.title.includes(searchTerm) ||
                    task.description.includes(searchTerm)
            })
        }

        return tasks;
    }

    getTaskById(id: String): Task {
        const found = this.tasks.find(task => task.id == id);

        if (!found) {
            throw new NotFoundException()
        }

        return found
    }

    updateTaskStatus(id: String, status: TaskStatus): Task {
        let found = this.getTaskById(id)
        
        found.status = status

        return found
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const task = {
            ...createTaskDto,
            id: uuidv4()
        }

        this.tasks.push(task)

        return task;
    }

    deleteTask(id: String): void {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }
}
