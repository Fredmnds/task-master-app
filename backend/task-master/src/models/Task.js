const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("Pendente", "Finalizada"), defaultValue: "Pendente" },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" }
  },
  suporterId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" }
  }
}, { timestamps: true });

Task.belongsTo(User, { foreignKey: "creatorId", as: "creator" });
Task.belongsTo(User, { foreignKey: "suporterId", as: "suporter" });

module.exports = Task;
