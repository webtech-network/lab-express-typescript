import { z } from 'zod';

export const productCreateSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be positive'),
    type: z.enum(['HOT_COFFEE', 'COLD_COFFEE', 'DESSERT', 'SNACK', 'OTHER']),
});

export const productUpdateSchema = productCreateSchema;

export const productIdParams = z.object({ id: z.uuid() });
