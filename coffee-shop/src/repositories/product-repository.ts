import { prisma } from '../prisma/client';
import { Product, ProductType } from '@prisma/client';

export const ProductRepository = {
    create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
        return prisma.product.create({ data });
    },

    findAll: async () => {
        return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    },

    findById: async (id: string) => {
        return prisma.product.findUnique({ where: { id } });
    },

    update: async (id: string, data: Partial<Product>) => {
        return prisma.product.update({ where: { id }, data });
    },

    remove: async (id: string) => {
        return prisma.product.delete({ where: { id } });
    },
};
