import { Optional, Model, DataTypes } from "sequelize";
import sequelizeCon from "../config";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    sequelize: sequelizeCon,
    paranoid: true,
  }
);

export default User;
