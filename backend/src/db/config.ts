import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelizeCon = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_FILE,
});

export default sequelizeCon;
