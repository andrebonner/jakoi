import * as service from "../../services/userService";
import {
  CreateUserDTO,
  UpdateUserDTO,
  FilterUserDTO,
} from "../../dtos/user.dto";
import * as mapper from "./mapper";
import { User } from "../../interface";

export const getAll = async (filters: FilterUserDTO): Promise<User[]> => {
  return (await service.getAll(filters)).map(mapper.toUser);
};

export const getById = async (id: number) => {
  return mapper.toUser(await service.getById(id));
};

export const create = async (payload: CreateUserDTO): Promise<User> => {
  return mapper.toUser(await service.create(payload));
};

export const update = async (
  id: number,
  payload: UpdateUserDTO
): Promise<User> => {
  return mapper.toUser(await service.update(id, payload));
};

export const deleteById = async (id: number): Promise<boolean> => {
  return await service.deleteById(id);
};
