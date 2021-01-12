import { TaskStatus } from "../task.model";

export default class FilterDto {
    status: TaskStatus;
    searchTerm: string;
}