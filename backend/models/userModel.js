const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique:{
        name:"users_email_unique",
      },
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Guest","Developer","Tester","Designer","Maintainer","Owner"),
      allowNull: false,
      defaultValue: "Guest",
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    signup_otp: {
      type: DataTypes.STRING(6),
    },
    signup_otp_expiry: {
      type: DataTypes.DATE,
    },
    reset_otp: {
      type: DataTypes.STRING(6),
    },
    reset_otp_expiry: {
      type: DataTypes.DATE,
    },
    profile_image: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING(20),
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
    tableName: "users",
    timestamps: false,
  },
);
module.exports = User;
