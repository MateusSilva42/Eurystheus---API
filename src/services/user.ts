import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../types/user";

class UserService {
  private prisma = new PrismaClient();

  async createUser(payload: UserPayload) {
    try {
      const newUser = await this.prisma.user.create({
        data: payload,
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
