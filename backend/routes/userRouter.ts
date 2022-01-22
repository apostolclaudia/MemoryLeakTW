import { userController } from '../controllers/userController';
import express from "express";

export const userRouter = express.Router();

userRouter.get('', userController.getAll)
userRouter.post('/register/', userController.addUser)
userRouter.post('/findAll/', userController.findAll)
userRouter.post('/login/', userController.loginUser)
userRouter.get('/getById/', userController.getById)
userRouter.patch('', userController.updateUser)
userRouter.delete('', userController.deleteUser)
userRouter.get('/app/:username/', userController.getByUsername)
