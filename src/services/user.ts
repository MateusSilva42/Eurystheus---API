import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../types/user";
import { encryptData } from "../utils/bcrypt";

class UserService {
  private prisma = new PrismaClient();

  async createUser(payload: UserPayload) {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          username: payload.username,
        },
      });
      if (userExists) throw new Error("Usuário já existe.");

      const userPassword = payload.password?.toString();
      const passwordCrypted = encryptData(userPassword);

      const newUser = await this.prisma.user.create({
        data: {
          ...payload,
          password: passwordCrypted,
        },
      });
      if (!newUser) throw new Error("Erro ao criar usuário.");

      return newUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }
}

export default new UserService();
