import { Router } from "express";
import userRouter from "./users";
import photoRouter from "./photos";
import authRouter from "./auth";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/photos", photoRouter);

export default router;
