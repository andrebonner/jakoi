import { Op } from "sequelize";
import User, { UserInput, UserOutput } from "../models/User";
import { GetAllUsersFilters } from "./types";
import bcrypt from "bcrypt";

const passwordSalt = process.env.PASSWORD_SALT;

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const existingUser = await User.findOne({
    where: { username: payload.username },
  });
  if (existingUser) {
    throw new Error("user already exist");
  }
  payload.password = await bcrypt.hash(payload.password, 10);
  const user = await User.create(payload);
  return user;
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("not found");
  }
  payload.password = await bcrypt.hash(payload.password as string, 10);
  const updatedUser = await (user as User).update(payload);
  return updatedUser;
};

export const getAll = async (
  filters?: GetAllUsersFilters
): Promise<UserOutput[]> => {
  return User.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};
export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("not found");
  }

  return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUser = await User.destroy({ where: { id } });

  return !!deletedUser;
};
