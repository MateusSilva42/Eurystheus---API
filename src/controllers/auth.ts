import authServices from '../services';
import { Request, Response } from 'express';

const auth = authServices.authService;

class AuthController {
  async login(req: Request, res: Response) {
    try {
      if (!req.body) throw new Error('Erro ao fazer login');

      const payload = {
        username: req.body.username,
        password: req.body.password,
      };

      const token = await auth.login(payload);
      if (!token) throw new Error('Erro ao fazer login');

      const csrfToken = req.csrfToken();

      res.status(200).send({ auth: token, csrfToken: csrfToken });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send(error);
      }
    }
  }
}

export default new AuthController();