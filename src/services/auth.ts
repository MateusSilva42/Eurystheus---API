import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

import { LoginPayload } from "../types/user";


class AuthService {
    private prisma = new PrismaClient();

    async login(payload: LoginPayload ){

        try{
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
    
            const userId = checkUser.id;
    
            const comparePassword = await compare(password, userPassword);
            if(!comparePassword) throw new Error("Senha incorreta");
    
            const token = jwt.sign({ username, userId }, process.env.JWT_SECRET as string, {
                expiresIn: '24h',
            });
    
            return token;
        }catch(error: unknown){
            console.log(error);
            
        }
    }
        
}

export default new AuthService();