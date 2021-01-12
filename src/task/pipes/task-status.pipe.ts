import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export default class TaskStatusPipe implements PipeTransform {
    readonly allowedValues: String[] = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    transform(value) {
        if (this.isNotAllowed(value)) {
            throw new BadRequestException(`the value ${value} is not allowed`)
        }
        return value
    }

    private isNotAllowed(value) {
        return !this.allowedValues.includes(value)
    }
}