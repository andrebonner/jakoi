import User from "../models/User";
import bcrypt from "bcrypt";

export const authenthicate = async (payload: {
  username: any;
  password: string;
}) => {
  const auth = await User.findOne({ where: { username: payload.username } });
  if (!auth) {
    throw new Error("Username does exist!");
  }

  const match = await bcrypt.compare(payload.password, auth.password);
  if (!match) {
    throw new Error("User credentials are incorrect!");
  }

  return {
    id: auth.id,
    username: auth.username,
    email: auth.email,
    role: auth.role,
    createdAt: auth.createdAt,
  };
};

export const getUser = async (payload: { username: any }) => {
  const auth = await User.findOne({ where: { username: payload.username } });
  if (!auth) {
    throw new Error("Username does exist!");
  }

  return auth;
};
