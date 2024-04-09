import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import routes from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("API Eurystheus rodando!");
});

app.use('/api' ,routes.router);
