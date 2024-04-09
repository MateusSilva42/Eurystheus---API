import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config";

declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) return res.status(401).send('Token não encontrado');

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET? process.env.JWT_SECRET : '');
        const username = decodedToken as string;
        req.user = username;

        next();
    }catch(error :unknown){
        if(error instanceof Error){
            res.status(500).send(error.message);
        }else{
            res.status(500).send
    }
}};