import { AuthDTO } from "../../dtos/auth.dto";
import * as mapper from "./mapper";
import * as service from "../../services/authService";
import { CreateUserDTO } from "../../dtos/user.dto";
import { ParsedQs } from "qs";

export const login = async (user: AuthDTO) => {
  return await service.login(user);
};
export const register = async (user: CreateUserDTO) => {
  return await service.register(user);
};

export const forgotPassword = async (user: AuthDTO) => {
  return await service.forgotPassword(user);
};
export const verifyEmailToken = async (payload: any) => {
  return await service.verifyEmailToken(payload);
};
export const resetPassword = async (payload: AuthDTO) => {
  return await service.resetPassword(payload);
};
