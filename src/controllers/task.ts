import taskService from "../services";
import { Request, Response } from "express";

const task = taskService.taskService;

class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error("Erro ao criar uma nova tarefa");

      const payload = {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
      };

      const newTask = await task.createTask(payload);
      if (!newTask) throw new Error("Erro ao criar uma nova tarefa");

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

      const tasks = await task.getTasksByUser(req.params.userId);
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
        content: req.body.content,
        done: req.body.done,
      };

      const updatedTask = await task.updateTask(req.params.id, payload);
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

      await task.deleteTask(req.params.id);
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

export default new TaskController();
