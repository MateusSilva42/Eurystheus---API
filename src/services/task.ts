import { PrismaClient } from "@prisma/client";
import { TaskPayload, TaskUpdatePayload } from "../types/task";

class TaskService {
  private prisma = new PrismaClient();

  async createTask(payload: TaskPayload) {
    try {

      const newTask = this.prisma.task.create({
        data: payload,
      });
      if (!newTask) throw new Error("Erro ao criar tarefa.");

      return newTask;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  async getTasksByUser(userId: string) {
    try {
      const tasks = this.prisma.task.findMany({
        where: {
          userId,
        },
      });
      if (!tasks) throw new Error("Erro ao buscar tarefas.");

      return tasks;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

    async updateTask(id: string, payload: TaskUpdatePayload) {
        try {
        const updatedTask = this.prisma.task.update({
            where: {
            id,
            },
            data: payload,
        });
        if (!updatedTask) throw new Error("Erro ao atualizar tarefa.");
    
        return updatedTask;
        } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        }
    }

    async deleteTask(id: string) {
        try {
        const deletedTask = this.prisma.task.delete({
            where: {
            id,
            },
        });
        if (!deletedTask) throw new Error("Erro ao deletar tarefa.");
    
        return deletedTask;
        } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        }
    }
}

export default new TaskService();