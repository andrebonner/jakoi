import {
  CreatePhotoDTO,
  FilterPhotoDTO,
  UpdatePhotoDTO,
} from "../../dtos/photo.dto";
import * as service from "../../services/photoService";

import * as mapper from "./mapper";
import { Photo } from "../../interface";

export const getAll = async (filters: FilterPhotoDTO): Promise<Photo[]> => {
  return (await service.getAll(filters)).map(mapper.toPhoto);
};

export const getById = async (id: number) => {
  return mapper.toPhoto(await service.getById(id));
};

export const create = async (payload: CreatePhotoDTO): Promise<Photo> => {
  return mapper.toPhoto(await service.create(payload));
};

export const update = async (
  id: number,
  payload: UpdatePhotoDTO
): Promise<Photo> => {
  return mapper.toPhoto(await service.update(id, payload));
};

export const deleteById = async (id: number): Promise<boolean> => {
  return await service.deleteById(id);
};
