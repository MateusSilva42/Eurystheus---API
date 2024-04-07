import { userRouter } from "./user";
import { taskRouter } from "./task";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter());
router.use("/task", taskRouter());

export default { router };