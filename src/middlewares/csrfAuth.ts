import csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

export const csrfAuth = csrf({ 
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
    value: (req) => {
        const token = req.headers['x-csrf-token'];
        if (Array.isArray(token)) {
            return token[0];
        } else if (typeof token === 'string') {
            return token;
        } else {
            return '';
        }
    },
});