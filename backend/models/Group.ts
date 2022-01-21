import Sequelize from "sequelize";
import { db } from "../config/db";
import { User, UserInterface } from "./User";

export interface GroupAttributes {
  id: number;
  name: string;
  createdBy: number;
}

type AddUsers = number[] | UserInterface[] | (number|UserInterface)[];

export interface GroupInterface extends Sequelize.Model, GroupAttributes {
  addUsers: (users: AddUsers) => Promise<void>;
  getUsers: () => Promise<UserInterface[]>;
  removeUsers: (users: AddUsers) => Promise<void>
}

const UserGroup = db.define("user_group", {});

export const Group: Sequelize.ModelCtor<GroupInterface> = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

Group.belongsToMany(User, { through: UserGroup });
User.belongsToMany(Group, { through: UserGroup });
