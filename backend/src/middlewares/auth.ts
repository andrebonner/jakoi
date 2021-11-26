import { Response, Request } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: () => void) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "no token provided" });
  }
  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return res.status(401).send(err);
    }
    res.locals.user = decoded?.user;
    next();
  });
};
