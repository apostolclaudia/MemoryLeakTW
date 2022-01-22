import { Op } from "sequelize";
import { error500 } from "./../utils/serverMessages";
import { User } from "./../models/User";
import { Group } from "./../models/Group";
import { Response, Request } from "express";
import { ExtendedRequest } from "../types/expressExtra";

export const groupController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const groups = await Group.findAll({ include: [User] });
      return res.status(200).json(groups);
    } catch (error) {
      return error500(res, error);
    }
  },
  getByName: async (req: ExtendedRequest, res: Response) => {
    try {
      const name = req.params.name;
      if (!name) {
        return res.sendStatus(400);
      }
      const group = await Group.findOne({
        where: {
          createdBy: req.user,
          name
        },
        include: [User],
      });
      if (!group) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ group });
    } catch (error) {
      return error500(res, error);
    }
  },
  addGroup: async (req: ExtendedRequest, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.sendStatus(400);
      }
      const group = await Group.create({ ...req.body, createdBy: req.user });

      return res.status(200).json({ group, message: "Group created!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  updateGroup: async (req: ExtendedRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const { name } = req.body;
      if (!name) {
        return res.sendStatus(400);
      }
      let group = await Group.findByPk(id);
      if (!group) {
        return res.sendStatus(404);
      }
      if (group.createdBy !== req.user) {
        return res.sendStatus(403);
      }
      group.name = name;
      group = await group.save();

      return res
        .status(200)
        .json({ group, message: "Group updated succesfully!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteGroup: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const group = await Group.findByPk(id);
      if (!group) {
        return res.sendStatus(404);
      }
      await group.destroy();

      return res.status(200).json({ message: "Group deleted!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  addUsersToGroup: async (req: ExtendedRequest, res: Response) => {
    try {
      const name = req.params.name;
      if (!name) {
        return res.sendStatus(400);
      }
      console.log("ss");

      const group = await Group.findOne({
        where: {
          createdBy: req.user,
          name,
        },
      });
      if (!group) {
        return res.sendStatus(404);
      }
      const { users }: { users: number[] } = req.body;

      if (!users) {
        return res.sendStatus(400);
      }

      await group.addUsers(users);
      const usersObj = await User.findAll({
        where: {
          id: {
            [Op.in]: users,
          },
        },
      });
      return res
        .status(200)
        .json({ message: "Friends added!", users: usersObj });
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteUsersFromGroup: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const group = await Group.findByPk(id);
      if (!group) {
        return res.sendStatus(404);
      }
      const { users }: { users: number[] } = req.body;
      if (!users) {
        return res.sendStatus(400);
      }
      await group.removeUsers(users);
      return res.status(200).json({ message: "Friends removed!" });
    } catch (error) {
      return error500(res, error);
    }
  },
};
