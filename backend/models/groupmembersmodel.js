const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const GroupMember = sequelize.define(
  "GroupMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "groups",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.ENUM(
        "Owner",
        "Maintainer",
        "Developer",
        "Tester",
        "Guest",
      ),
    },
  },
  {
    tableName: "group_members",
    timestamps: false,
  },
);
module.exports = GroupMember;
