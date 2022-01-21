import { db } from "../config/db";
import Sequelize from "sequelize";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  firstName?: string;
  lastName?: string;
}

export interface UserInterface extends Sequelize.Model, UserAttributes {}

export const User: Sequelize.ModelCtor<UserInterface> = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    firstName: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 50]
      }
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        len: [1, 50]
      }
    },
  },
  { timestamps: true }
);
