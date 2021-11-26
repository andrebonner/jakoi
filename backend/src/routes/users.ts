import { Router, Request, Response } from "express";
import * as userController from "../controllers/users";
import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { verifyToken } from "../middlewares";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const filters: FilterUserDTO = req.query;
  const results = await userController.getAll(filters);

  return res.status(200).send(results);
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const result = await userController.getById(id);

  return res.status(200).send(result);
});

userRouter.post("/", [verifyToken], async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;
  const result = await userController.create(payload);

  return res.status(201).send(result);
});

userRouter.put("/:id", [verifyToken], async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const payload: UpdateUserDTO = req.body;
  const result = await userController.update(id, payload);

  return res.status(200).send(result);
});

userRouter.delete(
  "/:id",
  [verifyToken],
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const result = await userController.deleteById(id);
    return res.status(200).send({ success: result });
  }
);

export default userRouter;
