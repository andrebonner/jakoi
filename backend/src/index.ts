import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import dbInit from "./db/init";
import cors from "cors";

dotenv.config();

dbInit();

const port = process.env.PORT || 3000;

export const get = () => {
  const app: Application = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req: Request, res: Response): void => {
    res.status(200).send("The sedulous hyena ate the antelope!");
  });

  app.use("/api", router);
  return app;
};

export const start = () => {
  const app = get();
  try {
    app.listen(port, (): void => {
      return console.log(`Server is listening on ${port}`);
    });
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
  }
};

// start the server
start();
