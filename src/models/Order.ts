import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Order extends Model {
  public id!: number;
  public userId!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    status: {
      type: DataTypes.ENUM("Pending", "Shipped", "Delivered", "Canceled"),
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
  }
);

Order.belongsTo(User, { foreignKey: "userId" });

export default Order;
