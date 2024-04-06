import { TaskService } from "../services";
import { Request, Response } from "express";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Erro ao criar uma nova tarefa");

      const payload = {
        title: req.body.title,
        content: req.body.description,
        userId: req.body.userId,
      };

      const newTask = await this.taskService.createTask(payload);
      res.status(201).send(newTask);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send(error);
      }
    }
  }

  async getTasksByUser(req: Request, res: Response) {
    try {
      if (!req.params.userId) throw new Error("Erro ao buscar tarefas");

      const tasks = await this.taskService.getTasksByUser(req.params.userId);
      res.status(200).send(tasks);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send(error);
      }
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Erro ao atualizar a tarefa");

      const payload = {
        title: req.body.title,
        description: req.body.description,
      };

      const updatedTask = await this.taskService.updateTask(
        req.params.id,
        payload
      );
      res.status(200).send(updatedTask);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send(error);
      }
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      if (!req.params.id) throw new Error("Erro ao deletar a tarefa");

      await this.taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send(error);
      }
    }
  }
}