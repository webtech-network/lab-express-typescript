# Projeto Coffee Shop API ☕

## 🎯 Objetivos da Aula

Neste projeto vamos consolidar tudo que já aprendemos até aqui com **TypeScript**, **Express**, **Prisma** e **Docker**, desenvolvendo uma API completa chamada **Coffee Shop**.

Ao final deste material, você será capaz de:

-   Configurar um ambiente Node.js com TypeScript, Express e Prisma.
-   Configurar um banco PostgreSQL com Docker e Docker Compose.
-   Estruturar uma aplicação em arquitetura **MVC**.
-   Usar **Zod** para validação de dados.
-   Tratar erros de forma centralizada.
-   Construir rotas RESTful completas.

---

## 📦 Dependências do Projeto

As bibliotecas foram instaladas com o comando:

```bash
npm install express cors helmet morgan dotenv @prisma/client zod
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/morgan prisma
```

### Por que usamos cada uma?

-   **express** → framework web para criar a API.
-   **cors** → permite requisições de outros domínios (cross-origin).
-   **helmet** → adiciona headers de segurança.
-   **morgan** → logger de requisições HTTP.
-   **dotenv** → leitura de variáveis de ambiente do `.env`.
-   **@prisma/client** → cliente do Prisma para acessar o banco.
-   **zod** → biblioteca de validação de dados.
-   **prisma** → ORM, migrations, schema, geração do client.

### Dependências de desenvolvimento

-   **typescript** → suporte a TS.
-   **ts-node-dev** → roda a aplicação em dev com reload automático.
-   **@types/** → tipos TypeScript para bibliotecas externas.

---

## 🐳 Configuração com Docker

Arquivo `docker-compose.yml`:

```yaml
services:
    db:
        image: postgres:17
        container_name: coffee_shop
        restart: always
        environment:
            POSTGRES_USER: admin
            POSTGRES_PASSWORD: admin123
            POSTGRES_DB: cafeteria
        ports:
            - '5432:5432'
        volumes:
            - postgres_data:/var/lib/postgresql/data

volumes:
    postgres_data:
```

### Subir o container

```bash
docker-compose up -d
```

---

## ⚙️ Variáveis de Ambiente

Arquivo `.env`:

```env
DATABASE_URL=postgresql://admin:admin123@localhost:5432/cafeteria?schema=public
PORT=3000
```

---

## 🗄️ Configuração do Prisma

Arquivo `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProductType {
  HOT_COFFEE
  COLD_COFFEE
  DESSERT
  SNACK
  OTHER
}

model Product {
  id          String      @id @default(uuid())
  name        String
  description String?
  price       Float
  type        ProductType
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

### Criar e aplicar migrações

```bash
npx prisma migrate dev --name init
```

### Abrir interface gráfica do banco

```bash
npx prisma studio
```

---

## 🏗️ Estrutura de Pastas

```bash
coffee-shop/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── product-controller.ts
│   ├── middlewares/
│   │   ├── error-middleware.ts
│   │   └── validate-request-middleware.ts
│   ├── prisma/
│   │   └── prismaClient.ts
│   ├── repositories/
│   │   └── product-repository.ts
│   ├── routes/
│   │   └── product-routes.ts
│   ├── services/
│   │   └── product-service.ts
│   ├── utils/
│   │   ├── api-error.ts
│   │   └── product-validator.ts
│   ├── app.ts
│   └── server.ts
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── .env
```

---

## 📐 Arquitetura MVC (resumida)

-   **Model (Prisma)** → Representa o banco de dados (`schema.prisma`).
-   **Repository** → Responsável pela comunicação direta com o banco.
-   **Service** → Contém as regras de negócio.
-   **Controller** → Recebe a requisição e chama o service.
-   **Routes** → Define os endpoints da API.
-   **Middlewares** → Tratamento de erros e validação.
-   **Utils** → Classes auxiliares (erros, validação).

---

## 🔑 Código Principal

### `src/app.ts`

```ts
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error-middleware';
import { productRouter } from './routes/product-routes';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products', productRouter);

app.use(errorHandler);

export { app };
```

### `src/server.ts`

```ts
import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

## 🚀 Rotas da API

-   `POST /api/products` → Criar produto.
-   `GET /api/products` → Listar produtos.
-   `GET /api/products/:id` → Buscar produto por ID.
-   `PUT /api/products/:id` → Atualizar produto.
-   `DELETE /api/products/:id` → Remover produto.

Exemplo de `POST`:

```json
{
    "name": "Cappuccino",
    "description": "Espresso com leite vaporizado",
    "price": 12.5,
    "type": "HOT_COFFEE"
}
```

---

## 🛡️ Middlewares

-   **error-middleware.ts** → captura erros e retorna resposta JSON.
-   **validate-request-middleware.ts** → valida body e params usando Zod.

---

## 🧪 Testando a API

Rodar o servidor:

```bash
npm run dev
```

Testar com **Insomnia** ou **Postman** as rotas.

---

## ✅ Resumo do Fluxo

1. Subir container PostgreSQL com Docker Compose.
2. Configurar `.env` com `DATABASE_URL`.
3. Rodar `npx prisma migrate dev`.
4. Criar singleton `prismaClient.ts`.
5. Implementar camada MVC (repository → service → controller → routes).
6. Criar middlewares para erros e validação.
7. Testar rotas com Postman/Insomnia.

---

## 📚 Próximos Passos

-   Criar endpoints para usuários, pedidos e relacionamentos.
-   Implementar autenticação com JWT.
-   Documentar a API com Swagger.

---
