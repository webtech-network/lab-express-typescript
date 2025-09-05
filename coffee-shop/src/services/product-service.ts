import { ProductRepository } from '../repositories/product-repository';
import { ApiError } from '../utils/api-error';

export const ProductService = {
    create: async (payload: any) => {
        const product = await ProductRepository.create(payload);
        return product;
    },

    list: async () => {
        return ProductRepository.findAll();
    },

    getById: async (id: string) => {
        const product = await ProductRepository.findById(id);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        return product;
    },

    update: async (id: string, payload: any) => {
        const exists = await ProductRepository.findById(id);

        if (!exists) {
            throw new ApiError(404, 'Product not found');
        }

        const updated = await ProductRepository.update(id, payload);
        return updated;
    },

    remove: async (id: string) => {
        const exists = await ProductRepository.findById(id);

        if (!exists) {
            throw new ApiError(404, 'Product not found');
        }

        await ProductRepository.remove(id);
        return;
    },
};
