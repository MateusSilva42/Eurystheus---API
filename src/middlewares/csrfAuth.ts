import csrf from 'csurf';

export const csrfAuth = csrf({ cookie: 
    {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    }
});