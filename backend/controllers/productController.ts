import { customErrorMessage } from './../utils/serverMessages';
import { Response, Request } from "express";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { ExtendedRequest } from "../types/expressExtra";
import { error500 } from "../utils/serverMessages";

export const productController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      return error500(res, error);
    }
  },
  claimed: async (req: ExtendedRequest, res: Response) => {
    try {
      const products = await Product.findAll({
        where: {
          claimedBy: req.user
        }
      });
      return res.json(products);
    } catch (error) {
      return error500(res, error);
    }
  },
  getbyId: async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.sendStatus(404);
      }
      return res.status(200).json(product);
    } catch (error) {
      return error500(res, error);
    }
  },
  addProduct: async (req: ExtendedRequest, res: Response) => {
    try {
      const { name, categoryId, quantity } = req.body;
      if (!name || !categoryId || !quantity) {
        return res.sendStatus(400);
      }
      const product = await Product.create({ ...req.body, userId: req.user });
      return res
        .status(200)
        .json({ product, message: "Product added succesfully!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  getUserProducts: async (req: ExtendedRequest, res: Response) => {
    try {
      const userId = req.user;
      if (!userId) {
        return res.sendStatus(400);
      }
      const products = await Product.findAll({
        where: {
          userId,
        },
      });
      return res.json(products);
    } catch (error) {
      return error500(res, error);
    }
  },
  getUserProductsByUsername: async (req: ExtendedRequest, res: Response) => {
    try {
      const username = req.params.username;
      if (!username) {
        res.sendStatus(400);
      }
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if(!user) {
        return customErrorMessage(res, 404, 'No user found')
      }
      const products = await Product.findAll({
        where: {
          userId: user.id
        },
      });
      return res.json(products);

    } catch (error) {
      return error500(res, error);
    }
  },
  updateProduct: async (req: ExtendedRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      let product = await Product.findByPk(id);
      if (!product) {
        return res.sendStatus(404);
      }
      if (product.userId !== req.user) {
        return res.sendStatus(403);
      }

      const { name, isAvailable, expirationDate, quantity, categoryId } =
        req.body;

      product.name = name;
      product.isAvailable = isAvailable;
      product.expirationDate = expirationDate;
      product.quantity = quantity;
      product.categoryId = categoryId;
      product = await product.save();

      return res
        .status(200)
        .json({ message: "Product updated succesfully!", product });
    } catch (error) {
      return error500(res, error);
    }
  },
  deleteProduct: async (req: ExtendedRequest, res: Response) => {
    try {
      const id = req.user;
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }
      await product.destroy();
      res.statusCode = 200;
      return res.json({ message: "Product deleted!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  claimProduct: async (req: ExtendedRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(id);
      if (!product) {
        return res.sendStatus(404);
      }

      if (product.claimedBy) {
        return res
          .status(400)
          .json({ message: "This product was already claimed" });
      }

      product.claimedBy = req.user;
      product.isAvailable = false;
      await product.save();

      return res.status(200).json({ message: "Product claimed!" });
    } catch (error) {
      return error500(res, error);
    }
  },
  unclaimProduct: async (req: ExtendedRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.sendStatus(400);
      }
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }

      if (!product.claimedBy) {
        return res.sendStatus(400);
      }

      if (product.claimedBy !== req.user) {
        return res.sendStatus(403);
      }

      product.claimedBy = null;
      product.isAvailable = true;
      await product.save();

      return res.status(200).json({ message: "Product unclaimed" });
    } catch (error) {}
  },
};
