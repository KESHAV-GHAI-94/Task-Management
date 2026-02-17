const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "completed"),
      defaultValue: "todo",
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      default: null,
    },
    assigned_to: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
  },
);

module.exports = Task;
