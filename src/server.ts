import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
// import { csrfAuth } from "./middlewares/csrfAuth";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET? process.env.SESSION_SECRET : 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
}));
// app.use(csrfAuth);


app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("API Eurystheus rodando!");
});

app.use('/api' ,routes.router);
