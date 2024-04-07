import userService from "../services";
import { Request, Response } from "express";

const user = userService.userService;

class UserController {

  async createUser(req: Request, res: Response) {
    try {
        if(!req.body) throw new Error("Erro ao criar um novo usuário");

        const payload = {
            name: req.body.name,
            password: req.body.password,
            username: req.body.username,
        };

      const newUser = await user.createUser(payload);
      if (!newUser) throw new Error("Erro ao criar um novo usuário");
      res.status(201).send(newUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send(error);
      }
    }
  }
}

export default new UserController();