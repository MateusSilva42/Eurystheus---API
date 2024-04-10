import { userRouter } from "./user";
import { taskRouter } from "./task";
import { authRouter } from "./auth";
import { Router } from "express";
import { isUser } from "../middlewares/authenticate";

const router = Router();

router.use("/user", userRouter());
router.use("/task", isUser, taskRouter());
router.use("/auth", authRouter());

export default { router };