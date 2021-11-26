import { Router, Response, Request } from "express";
import { AuthDTO } from "../dtos/auth.dto";
import * as authController from "../controllers/auth";
import { CreateUserDTO } from "../dtos/user.dto";
import { verifyToken } from "../middlewares";

const authRouter = Router();

authRouter.post("/", [verifyToken], async (req: Request, res: Response) => {
  res.status(200).send({ success: true, user: res.locals.user });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;
  const results = await authController.register(payload);

  res
    .status(200)
    //.header("Authorization", "Bearer" + results.token)
    .send(results);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const payload: AuthDTO = req.body;
  // try {
  const results = await authController.login(payload);

  res
    .status(200)
    .header("Authorization", "Bearer " + results.token)
    .send(results);
  // } catch (error) {
  //   return res.status(400).send(error);
  // }
});

authRouter.post("/forgot-password", async (req: Request, res: Response) => {
  const payload: AuthDTO = req.body;
  const results = await authController.forgotPassword(payload);

  res.status(200).send(results);
});

authRouter.get("/forgot-password", async (req: Request, res: Response) => {
  const { token } = req.query as any;
  const results = await authController.verifyEmailToken({ token });

  res.status(200).send(results);
});

authRouter.put(
  "/reset-password",
  [verifyToken],
  async (req: Request, res: Response) => {
    const payload: AuthDTO = req.body;
    const results = await authController.resetPassword(payload);

    res.status(200).send(results);
  }
);

export default authRouter;
