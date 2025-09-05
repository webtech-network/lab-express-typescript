# Introdução ao TypeScript (com Node.js)

## 1) O que é TypeScript

-   **Superset do JavaScript**: tudo que é JS válido é TS válido.
-   **Transpilado para JS**: Node e navegador só executam JS.
-   **Tipo estrutural**: se parece com o tipo exigido, é válido.
-   TS ajuda em:
    -   Erros cedo (build/IDE)
    -   Autocompletar + navegação
    -   Contratos explícitos entre módulos/funções

> TS não valida dados em runtime; use Zod, Yup etc. para validação de
> entrada.

## 2) Rodando TypeScript no Node

### Compilação com tsc (build)

```bash
npx tsc --init
npm run build
npm start
```

-   Produz JS em dist/
-   Mais rápido e estável em produção

## 3) Criando projeto TS do zero

```bash
mkdir projeto-ts && cd projeto-ts
npm init -y
npm i -D typescript @types/node
npx tsc --init
```

`src/index.ts`:

```ts
const nome: string = 'Maria';
const idade = 25;
console.log(`Usuária: ${nome}, idade: ${idade}`);
```

### Sobre o tsconfig.json

O arquivo `tsconfig.json` é criado quando você roda `npx tsc --init`.  
Ele define as **opções de compilação** do TypeScript. Veja um exemplo:

```json
{
    "compilerOptions": {
        "target": "ES2021", // versão de JS gerada no build
        "module": "commonjs", // sistema de módulos usado
        "rootDir": "./src", // pasta de origem do código TS
        "outDir": "./dist", // pasta de saída do código JS
        "strict": true, // ativa checagens mais rígidas
        "esModuleInterop": true, // facilita importação de libs JS
        "skipLibCheck": true // ignora checagem em arquivos de definição
    }
}
```

> Geralmente, você ajusta `target`, `rootDir` e `outDir` conforme seu
> projeto. O `strict` é altamente recomendado para evitar erros.

## 4) Tipos fundamentais e inferência

```ts
let s: string = 'texto';
let n: number = 123;
let b: boolean = true;
let v: void = undefined;
let u: undefined = undefined;
let nu: null = null;
let anyCoisa: any = 'evite';
let seguro: unknown = JSON.parse('{}');
```

-   Inferência automática de tipos para `const` e `let`

## 5) Arrays, Tuplas, Imutabilidade

```ts
const nums: number[] = [1, 2, 3];
const nomes: Array<string> = ['Ana', 'Bia'];
const par: [string, number] = ['id', 42];
const r1: ReadonlyArray<number> = [1, 2, 3];
const r2 = [1, 2, 3] as const;
```

## 6) Objetos: opcionais, readonly, index signatures

```ts
type Usuario = { readonly id: string; nome: string; idade?: number };
const u: Usuario = { id: 'abc', nome: 'Lia' };
```

```ts
type Dicionario = { [chave: string]: number };
```

## 7) Interface vs Type

### Interface

-   Contrato nomeado, aberto, suporta declaration merging
-   Pode estender outra interface ou ser implementada por classes

```ts
interface Pessoa {
    nome: string;
}

interface Pessoa {
    idade: number;
}
=
const p: Pessoa = { nome: 'João', idade: 30 }; // merged
```

### Type Alias

-   Apelido para qualquer tipo (objeto, união, interseção, primitivo,
    tupla)
-   Não suporta merging

```ts
type Produto = { id: number; nome: string };
type Id = number | string;
type Par<T, U> = [T, U];
```

-   Interseção `&`, união `|` e template literals são mais fáceis com
    type

## 8) Funções, overloads

```ts
function soma(a: number, b: number): number {
    return a + b;
}
```

## 9) Tipos especiais

-   `any`: desliga checagem
-   `unknown`: precisa narrowing
-   `never`: nunca retorna ou fluxo impossível
-   `void`: sem retorno significativo

## 10) Generics

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

## 14) Módulos Node.js

-   ESM: `"type":"module"` + `import x from './x.js'` + TS
    `"module": "NodeNext"`
-   CommonJS: `require`/`module.exports`

## 15) Exemplo prático Node + TS - Mini Calculadora

`src/calculadora.ts`:

```ts
export function somar(a: number, b: number): number {
    return a + b;
}

export function subtrair(a: number, b: number): number {
    return a - b;
}

export function multiplicar(a: number, b: number): number {
    return a * b;
}

export function dividir(a: number, b: number): number {
    if (b === 0) throw new Error('Divisão por zero não é permitida.');
    return a / b;
}
```

`src/index.ts`:

```ts
import { somar, subtrair, multiplicar, dividir } from './calculadora.js';

console.log('Soma:', somar(10, 5));
console.log('Subtração:', subtrair(10, 5));
console.log('Multiplicação:', multiplicar(10, 5));
console.log('Divisão:', dividir(10, 5));
```
