import { AuthDTO } from "../dtos/auth.dto";
import * as authDal from "../db/dal/auth";
import * as userDal from "../db/dal/user";
import jwt from "jsonwebtoken";
import { UserInput } from "../db/models/User";
import { sendEmail } from "../middlewares";
import { ParsedQs } from "qs";

const secretKey = process.env.SECRET_KEY;

export const login = async (payload: AuthDTO) => {
  // query db for authenticated user
  const user = await authDal.authenthicate(payload);
  const token = jwt.sign({ user }, secretKey as string, {
    expiresIn: "1800s",
    algorithm: "HS512",
  });
  return { user, token };
};
export const register = async (user: UserInput) => {
  // create a new user from details for registering
  const regUser = await userDal.create(user);
  // send email to user
  const mail = await sendEmail(
    user.email,
    "Welcome " + regUser.username,
    "You have signed up using this email"
  );
  return { regUser, mail };
};

export const forgotPassword = async (payload: AuthDTO) => {
  const user = await authDal.getUser(payload);
  const emailToken = jwt.sign({ user }, secretKey as string, {
    expiresIn: "24h",
    algorithm: "HS512",
  });
  const link =
    process.env.FORGOT_PASSWORD_URL + "/" + emailToken + "/" + user.username;
  console.log(emailToken);
  // send email to user
  const mail = await sendEmail(
    user.email,
    "Reset Password Link",
    "Password will be reset using this link: <a href='" +
      link +
      "'>" +
      link +
      "</a>"
  );
  return { user, mail };
};

export const verifyEmailToken = async (payload: any) => {
  const token: string = payload.token;

  if (!token) {
    throw new Error("no token provided");
  }
  // check username with token
  return jwt.verify(token, secretKey as string, (err, decoded) => {
    if (err) {
      throw new Error(err.message);
    }
    return decoded?.user;
  });
};

export const resetPassword = async (payload: AuthDTO) => {
  const user = await authDal.getUser(payload);
  // update the user
  const updatedUser = await userDal.update(user.id, payload);
  return updatedUser;
};
