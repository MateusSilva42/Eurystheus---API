import { AuthController } from "../controllers";
import { csrfAuth } from "../middlewares/csrfAuth";
import { Router } from "express";

export function authRouter(): Router {
  const router = Router();
  const authController = AuthController;

  router.post("/", csrfAuth, authController.login);

  router.get("/csrf-token", csrfAuth, (req, res) => {
    res.status(200).send({ csrfToken: req.csrfToken() });
  });

  return router;
}