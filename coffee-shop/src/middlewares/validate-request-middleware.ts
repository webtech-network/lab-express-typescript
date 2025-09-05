import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateBody =
    (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            next(err);
        }
    };

export const validateParams =
    (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
        try {
            req.params = schema.parse(req.params);
            next();
        } catch (err) {
            next(err);
        }
    };
