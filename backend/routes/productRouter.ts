import express from "express";
import { productController } from "../controllers/productController";

export const productRouter = express.Router();

productRouter.get('', productController.getAll)
productRouter.get('/:id/', productController.getbyId)
productRouter.post('', productController.addProduct)
productRouter.patch('/:id/', productController.updateProduct)
productRouter.delete('/:id/', productController.deleteProduct)
productRouter.get('/user/', productController.getUserProducts)
productRouter.get('/:username/', productController.getUserProductsByUsername)
productRouter.post('/claim/:id/', productController.claimProduct)
productRouter.delete('/claim/:id/', productController.unclaimProduct)

