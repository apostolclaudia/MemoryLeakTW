import { ExtendedRequest } from './../types/expressExtra';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from "../models/User";
import { Request, Response } from "express";

dotenv.config()

export const generateAccessToken = (id: number) => {
  return jwt.sign(`${id}`, process.env.TOKEN_SECRET);
}

const SAFE_ROUTES = ['/user/login/', '/user/register/', '/reset/']

export const authenticateToken = (req: ExtendedRequest, res: Response, next) => {
  if(SAFE_ROUTES.includes(req.path)) return next();

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, async (err: any, userId: any) => {
    if (err) return res.sendStatus(403)
    try {
      //@ts-ignore
      const user = await User.findByPk(userId)
      req.user = user.id
      
      return next()
    } catch (error) {
      return res.sendStatus(403)
    }
  })
}