import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export default class CreateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    title: String;

    @IsNotEmpty()
    @IsOptional()
    description: String;

    @IsNotEmpty()
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;
}