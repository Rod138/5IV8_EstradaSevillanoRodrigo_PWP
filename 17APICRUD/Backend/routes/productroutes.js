import { Router } from 'express';
import * as productController from '../controllers/productcontroller.js';

const router = Router();

// Ruta para crear un nuevo producto
router.post('/products', productController.create);

export default router;
