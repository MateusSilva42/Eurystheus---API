import { userRouter } from "./user";
import { taskRouter } from "./task";
import { authRouter } from "./auth";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter());
router.use("/task", taskRouter());
router.use("/auth", authRouter());

export default { router };