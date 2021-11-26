import { PhotoOutput } from "../../db/models/Photo";
import { Photo } from "../../interface";

export const toPhoto = (photo: PhotoOutput): Photo => {
  return {
    id: photo.id,
    name: photo.name,
    caption: photo.caption,
    url: photo.url,
    createdBy: photo.createdBy,
    createdAt: photo.createdAt,
    updatedAt: photo.updatedAt,
    deletedAt: photo.deletedAt,
  };
};
