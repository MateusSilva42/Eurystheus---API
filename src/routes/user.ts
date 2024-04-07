import {UserController} from "../controllers";
import {Router} from "express";

export function userRouter(): Router {
  const router = Router();
  const userController = UserController;

  router.post("/", userController.createUser);

  return router;
}

