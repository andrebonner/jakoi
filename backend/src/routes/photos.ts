import { Request, Response, Router } from "express";
import * as photoController from "../controllers/photos";
import {
  CreatePhotoDTO,
  FilterPhotoDTO,
  UpdatePhotoDTO,
} from "../dtos/photo.dto";
import { verifyToken } from "../middlewares";

const photoRouter = Router();

photoRouter.get("/", async (req: Request, res: Response) => {
  const filters: FilterPhotoDTO = req.query;
  const results = await photoController.getAll(filters);

  return res.status(200).send(results);
});

photoRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const result = await photoController.getById(id);

  return res.status(200).send(result);
});

photoRouter.post("/", [verifyToken], async (req: Request, res: Response) => {
  let payload: CreatePhotoDTO = req.body;
  payload.createdBy = res.locals.user.id;
  const result = await photoController.create(payload);

  return res.status(201).send(result);
});

photoRouter.put("/:id", [verifyToken], async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const payload: UpdatePhotoDTO = req.body;
  const result = await photoController.update(id, payload);

  return res.status(200).send(result);
});

photoRouter.delete(
  "/:id",
  [verifyToken],
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const result = await photoController.deleteById(id);
    return res.status(200).send({ success: result });
  }
);

export default photoRouter;
