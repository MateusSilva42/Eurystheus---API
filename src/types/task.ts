export interface Task {
    id: string;
    title: string;
    content: string;
    done: boolean;
    userId: string;
  }

export interface TaskPayload {
    title: string;
    content: string;
    userId: string;
}

export interface TaskUpdatePayload {
    title?: string;
    content?: string;
    done?: boolean;
}