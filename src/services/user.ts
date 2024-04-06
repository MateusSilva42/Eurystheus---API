import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../types/user";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(payload: UserPayload) {
    try {
      const newUser = this.prisma.user.create({
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
