import { UserOutput } from "../../db/models/User";
import { User } from "../../interface";

export const toUser = (user: UserOutput): User => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
};
