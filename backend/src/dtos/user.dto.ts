import { Optional } from "sequelize";

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  role: number;
};

export type UpdateUserDTO = Optional<CreateUserDTO, "username">;

export type FilterUserDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
