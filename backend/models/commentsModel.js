const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent_comment_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "comments",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: "comments",
    timestamps: false,
  }
);

module.exports = Comment;
