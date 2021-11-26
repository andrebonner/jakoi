import { Optional } from "sequelize";

export type AuthDTO = {
  id?: number;
  username: string;
  password: string;
  email?: string;
  role?: number;
};
