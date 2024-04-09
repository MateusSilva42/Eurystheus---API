import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

import { LoginPayload } from "../types/user";


class AuthService {
    private prisma = new PrismaClient();
    async login(payload: LoginPayload ){
        const { username, password } = payload;
        
        if(!username || !password) throw new Error("Usuário ou senha não informados");

        const checkUser = await this.prisma.user.findFirst({
            where: {
                username,
            },
        });
        if(!checkUser) throw new Error("Usuário não encontrado");

        const userPassword = checkUser.password;
        if(!userPassword) throw new Error("Senha não encontrada");

        const comparePassword = await compare(password, userPassword);
        if(!comparePassword) throw new Error("Senha incorreta");

        const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
            expiresIn: '24h',
        });

        return token;
    }
}

export default new AuthService();