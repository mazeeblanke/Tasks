export interface Task {
    id: String;
    title: String;
    description: String;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'IS_OPEN',
    DONE = 'IS_DONE',
    IN_PROGRESS = 'IN_PROGRESS'
}