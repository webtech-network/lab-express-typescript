import { prisma } from './prismaClient';

async function main() {
    const user = await prisma.user.create({
        data: { name: 'Artur', email: 'artur@example.com' },
    });

    console.log('Usuário criado:', user);

    const users = await prisma.user.findMany();

    console.log('Todos usuários:', users);
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
