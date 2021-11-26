import { GetAllPhotosFilters } from "../db/dal/types";
import * as photoDal from "../db/dal/photo";
import { PhotoInput, PhotoOutput } from "../db/models/Photo";
import { UpdatePhotoDTO } from "../dtos/photo.dto";

export const getAll = (
  filters: GetAllPhotosFilters
): Promise<PhotoOutput[]> => {
  return photoDal.getAll(filters);
};
export const getById = (id: number): Promise<PhotoOutput> => {
  return photoDal.getById(id);
};

export const create = (payload: PhotoInput): Promise<PhotoOutput> => {
  return photoDal.create(payload);
};

export const update = (
  id: number,
  payload: UpdatePhotoDTO
): Promise<PhotoOutput> => {
  return photoDal.update(id, payload);
};

export const deleteById = (id: number): Promise<boolean> => {
  return photoDal.deleteById(id);
};
