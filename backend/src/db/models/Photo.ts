import { Optional, Model, DataTypes } from "sequelize";
import sequelizeCon from "../config";

interface PhotoAttributes {
  id: number;
  name: string;
  caption: string;
  url: string;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PhotoInput extends Optional<PhotoAttributes, "id"> {}
export interface PhotoOutput extends Required<PhotoAttributes> {}

class Photo
  extends Model<PhotoAttributes, PhotoInput>
  implements PhotoAttributes
{
  public id!: number;
  public name!: string;
  public caption!: string;
  public url!: string;
  public createdBy!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    sequelize: sequelizeCon,
    paranoid: true,
  }
);

export default Photo;
