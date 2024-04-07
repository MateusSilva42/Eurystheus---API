import { TaskController } from "../controllers";
import { Router } from "express";

export function taskRouter(): Router {
  const router = Router();
  const taskController = TaskController;

  router.get("/:userId", taskController.getTasksByUser);
  router.post("/", taskController.createTask);
  router.put("/:id", taskController.updateTask);
  router.delete("/:id", taskController.deleteTask);

  return router;
}