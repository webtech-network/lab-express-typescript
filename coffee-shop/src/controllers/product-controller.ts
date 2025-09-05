import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product-service';

export const ProductController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await ProductService.create(req.body);
            res.status(201).json({ success: true, data: product });
        } catch (err) {
            next(err);
        }
    },

    list: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await ProductService.list();
            res.json({ success: true, data: products });
        } catch (err) {
            next(err);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = await ProductService.getById(id);
            res.json({ success: true, data: product });
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const updated = await ProductService.update(id, req.body);
            res.json({ success: true, data: updated });
        } catch (err) {
            next(err);
        }
    },

    remove: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await ProductService.remove(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    },
};
