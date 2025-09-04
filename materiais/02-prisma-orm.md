# Introdução ao Prisma ORM (Node.js + TypeScript)

## 1) O que é Prisma

- Prisma é um **ORM (Object-Relational Mapping)** moderno para Node.js e TypeScript.
- Permite **interagir com o banco de dados usando TypeScript seguro**, sem precisar escrever SQL manualmente.
- Prisma é **type-safe**: autocompletar e checagem de tipos no desenvolvimento.
- Suporta bancos relacionais: PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, CockroachDB.
- Prisma também tem suporte para MongoDB (experimental/estável dependendo da versão).

## 2) Vantagens do Prisma

- **Type-safe queries**: erros de tipo detectados em tempo de compilação.
- **Migrations integradas**: controle de versões do banco.
- **Autocompletar e IntelliSense** no VSCode.
- **Código limpo**, sem SQL inline, fácil manutenção.
- Escalável para aplicações grandes.

## 3) Componentes do Prisma

1. **Prisma Client**: client TypeScript gerado para consultar o banco.
2. **Prisma Migrate**: sistema de migrações do banco, gera scripts SQL a partir do schema.
3. **Prisma Studio**: interface web para explorar dados.

## 4) Instalação do Prisma

```bash
npm install @prisma/client
npm install -D prisma
```

## 5) Inicializando o Prisma

```bash
npx prisma init
```

Cria:

```
prisma/
  schema.prisma
.env
```

## 6) Exemplo de schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

## 7) Migrando o banco

```bash
npx prisma migrate dev --name init
```

## 8) Gerando e usando Prisma Client

```ts
// src/prismaClient.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

Exemplo de uso:

```ts
// src/index.ts
import { prisma } from "./prismaClient";

async function main() {
  const user = await prisma.user.create({
    data: { name: "Artur", email: "artur@example.com" },
  });

  console.log("Usuário criado:", user);

  const users = await prisma.user.findMany();

  console.log("Todos usuários:", users);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
```

## 9) Prisma Studio

```bash
npx prisma studio
```

- Interface web (`localhost:5555`) para visualizar e editar dados.

## 10) Boas práticas com Prisma

- Use Prisma Client, evite SQL direto.
- Feche conexões com `$disconnect()`.
- Use migrations para evoluir banco.
- Crie instância única de PrismaClient (Singleton).
- Use tipos gerados para type-safety.

## 11) Fluxo resumido para começar

1. Criar projeto Node + TS
2. Instalar Prisma: `npm i @prisma/client && npm i -D prisma`
3. Inicializar Prisma: `npx prisma init`
4. Configurar `schema.prisma` e `.env`
5. Criar migration: `npx prisma migrate dev --name init`
6. Usar Prisma Client no código TS
7. Testar Prisma Studio
