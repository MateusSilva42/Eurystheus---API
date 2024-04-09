import { Task } from '.';

export interface User {
    id: string;
    name?: string;
    password?: string;
    username: string;
    tasks: Task[];
  }

  export interface UserPayload {
    name?: string;
    password?: string;
    username: string;
  }

  export interface LoginPayload {
    username: string;
    password: string;
  }
  