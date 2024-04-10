import { AuthController } from "../controllers";
import { csrfAuth } from "../middlewares/csrfAuth";
import { Router } from "express";

export function authRouter(): Router {
  const router = Router();
  const authController = AuthController;

  router.get("/csrf-token", csrfAuth, (req, res) => {
    res.status(200).send({ csrfToken: req.csrfToken() });
  });

  router.post("/", authController.login);

  return router;
}
