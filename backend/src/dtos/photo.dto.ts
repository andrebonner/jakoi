import { Optional } from "sequelize";

export type CreatePhotoDTO = {
  name: string;
  caption: string;
  url: string;
  createdBy: number;
};

export type UpdatePhotoDTO = Optional<CreatePhotoDTO, "name">;

export type FilterPhotoDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
