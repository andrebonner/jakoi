import { GetAllUsersFilters } from "../db/dal/types";
import * as userDal from "../db/dal/user";
import { UserInput, UserOutput } from "../db/models/User";
import { UpdateUserDTO } from "../dtos/user.dto";

export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
  return userDal.getAll(filters);
};
export const getById = (id: number): Promise<UserOutput> => {
  return userDal.getById(id);
};

export const create = (payload: UserInput): Promise<UserOutput> => {
  return userDal.create(payload);
};

export const update = (
  id: number,
  payload: UpdateUserDTO
): Promise<UserOutput> => {
  return userDal.update(id, payload);
};

export const deleteById = (id: number): Promise<boolean> => {
  return userDal.deleteById(id);
};
