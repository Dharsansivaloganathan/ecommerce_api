import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
  },
  { 
    sequelize, 
    modelName: "category",
    timestamps: true 
  }
);

export default Category;
