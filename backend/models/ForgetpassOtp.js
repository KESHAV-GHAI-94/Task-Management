const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ForgetpassOtp = sequelize.define(
  "ForgetpassOtp",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "password_reset_otps",
    timestamps: false,
  }
);

module.exports = ForgetpassOtp;
