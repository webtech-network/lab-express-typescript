import { Router } from 'express';
import { validateBody, validateParams } from '../middlewares/validate-request-middleware';
import {
    productCreateSchema,
    productIdParams,
    productUpdateSchema,
} from '../utils/product-validator';
import { ProductController } from '../controllers/product-controller';

const productRouter = Router();

productRouter.post('/', validateBody(productCreateSchema), ProductController.create);

productRouter.get('/', ProductController.list);

productRouter.get('/:id', validateParams(productIdParams), ProductController.getById);

productRouter.put(
    '/:id',
    validateParams(productIdParams),
    validateBody(productUpdateSchema),
    ProductController.update
);

productRouter.delete('/:id', validateParams(productIdParams), ProductController.remove);

export { productRouter };
