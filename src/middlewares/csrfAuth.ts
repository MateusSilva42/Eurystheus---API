import csrf from 'csurf';

export const csrfAuth = csrf({ cookie: true});