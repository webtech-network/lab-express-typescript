# Introdução ao TypeScript (com Node.js)

## 1) O que é TypeScript

- **Superset do JavaScript**: tudo que é JS válido é TS válido.
- **Transpilado para JS**: Node e navegador só executam JS.
- **Tipo estrutural**: se parece com o tipo exigido, é válido.
- TS ajuda em:
  - Erros cedo (build/IDE)
  - Autocompletar + navegação
  - Contratos explícitos entre módulos/funções

> TS não valida dados em runtime; use Zod, Yup etc. para validação de entrada.

## 2) Rodando TypeScript no Node

### Opção A — ts-node (sem build)

```bash
npm install -D typescript ts-node @types/node
npx tsc --init
npx ts-node src/index.ts
```

Simples para estudo/protótipo, não recomendado em produção.

### Opção B — Compilação com tsc (build)

```bash
npx tsc --init
npm run build
npm start
```

- Produz JS em dist/
- Mais rápido e estável em produção

### Comparação

| Abordagem | Como roda                   | Uso ideal        |
| --------- | --------------------------- | ---------------- |
| ts-node   | npx ts-node app.ts          | Estudo/protótipo |
| tsc       | npx tsc && node dist/app.js | Produção         |

## 3) Criando projeto TS do zero

```bash
mkdir projeto-ts && cd projeto-ts
npm init -y
npm i -D typescript ts-node @types/node
npx tsc --init
```

`src/index.ts`:

```ts
const nome: string = "Maria";
const idade = 25;
console.log(`Usuária: ${nome}, idade: ${idade}`);
```

## 4) Tipos fundamentais e inferência

```ts
let s: string = "texto";
let n: number = 123;
let b: boolean = true;
let v: void = undefined;
let u: undefined = undefined;
let nu: null = null;
let anyCoisa: any = "evite";
let seguro: unknown = JSON.parse("{}");
```

- Inferência automática de tipos para `const` e `let`

## 5) Arrays, Tuplas, Imutabilidade

```ts
const nums: number[] = [1, 2, 3];
const nomes: Array<string> = ["Ana", "Bia"];
const par: [string, number] = ["id", 42];
const r1: ReadonlyArray<number> = [1, 2, 3];
const r2 = [1, 2, 3] as const;
```

## 6) Objetos: opcionais, readonly, index signatures

```ts
type Usuario = { readonly id: string; nome: string; idade?: number };
const u: Usuario = { id: "abc", nome: "Lia" };
```

```ts
type Dicionario = { [chave: string]: number };
```

## 7) Interface vs Type

### Interface

- Contrato nomeado, aberto, suporta declaration merging
- Pode estender outra interface ou ser implementada por classes

```ts
interface Pessoa {
  nome: string;
}
interface Pessoa {
  idade: number;
}
const p: Pessoa = { nome: "João", idade: 30 }; // merged
```

### Type Alias

- Apelido para qualquer tipo (objeto, união, interseção, primitivo, tupla)
- Não suporta merging

```ts
type Produto = { id: number; nome: string };
type Id = number | string;
type Par<T, U> = [T, U];
```

- Interseção `&`, união `|` e template literals são mais fáceis com type

## 8) Funções, overloads

```ts
function soma(a: number, b: number): number {
  return a + b;
}

type BinOp = (a: number, b: number) => number;
const mult: BinOp = (a, b) => a * b;

function parse(valor: string): number;
function parse(valor: number): number;
function parse(valor: unknown): number {
  if (typeof valor === "string") return Number(valor);
  if (typeof valor === "number") return valor;
  throw new Error("tipo inválido");
}
```

## 9) Narrowing

```ts
function printId(id: number | string) {
  if (typeof id === "string") console.log(id.toUpperCase());
  else console.log(id.toFixed(2));
}
```

- Também via `in`, `instanceof`, discriminated unions

## 10) Tipos especiais

- `any`: desliga checagem
- `unknown`: precisa narrowing
- `never`: nunca retorna ou fluxo impossível
- `void`: sem retorno significativo

## 11) Generics

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
interface ApiResponse<TData> {
  ok: boolean;
  data?: TData;
  error?: string;
}
type Pair<T = string, U = number> = [T, U];
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## 12) Utility Types

- `Partial`, `Required`, `Pick`, `Omit`, `Readonly`, `Record`, `Parameters`, `ReturnType`, `NonNullable`

## 13) Enum preferido: objeto + união de literais

```ts
const Roles = { Admin: "ADMIN", User: "USER" } as const;
type Role = (typeof Roles)[keyof typeof Roles];
```

## 14) Módulos Node.js

- ESM: `"type":"module"` + `import x from './x.js'` + TS `"module": "NodeNext"`
- CommonJS: `require`/`module.exports`

## 15) Exemplo prático Node + TS

`src/readFile.ts`:

```ts
import { readFileSync } from "node:fs";

export function readJson(path: string) {
  const raw = readFileSync(path, "utf-8");
  const data: unknown = JSON.parse(raw);

  if (typeof data === "object" && data !== null && "name" in data) {
    return data as { name: string; age?: number };
  }

  throw new Error("JSON inválido");
}
```

`src/index.ts`:

```ts
import { readJson } from "./readFile.js";
try {
  const user = readJson("./user.json");
  console.log("Usuário:", user);
} catch (e) {
  console.error("Falha:", (e as Error).message);
}
```
