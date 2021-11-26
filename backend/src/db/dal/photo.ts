import { Op } from "sequelize";
import Photo, { PhotoInput, PhotoOutput } from "../models/Photo";
import { GetAllPhotosFilters } from "./types";

export const create = async (payload: PhotoInput): Promise<PhotoOutput> => {
  const photo = await Photo.create(payload);
  return photo;
};

export const update = async (
  id: number,
  payload: Partial<PhotoInput>
): Promise<PhotoOutput> => {
  const photo = await Photo.findByPk(id);
  if (!photo) {
    throw new Error("not found");
  }

  const updatedPhoto = await (photo as Photo).update(payload);
  return updatedPhoto;
};

export const getAll = async (
  filters?: GetAllPhotosFilters
): Promise<PhotoOutput[]> => {
  return Photo.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};
export const getById = async (id: number): Promise<PhotoOutput> => {
  const photo = await Photo.findByPk(id);

  if (!photo) {
    throw new Error("not found");
  }

  return photo;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedPhoto = await Photo.destroy({ where: { id } });

  return !!deletedPhoto;
};
