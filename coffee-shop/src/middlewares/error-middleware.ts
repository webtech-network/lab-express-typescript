import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api-error';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof ApiError) {
        return res
            .status(err.statusCode)
            .json({ success: false, message: err.message, details: err.details });
    }

    if (err?.issues) {
        return res
            .status(400)
            .json({ success: false, message: 'Validation failed', details: err.issues });
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
}
