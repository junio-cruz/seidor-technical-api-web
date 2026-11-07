# Seidor Technical API Web

API REST da Seidor desenvolvida em **TypeScript** com **Fastify**, seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**.

---

## Sumário

- [Stack](#stack)
- [Como rodar a aplicação](#como-rodar-a-aplicação)
- [Scripts disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Arquitetura](#arquitetura)
- [Endpoints](#endpoints)

---

## Stack

| Tecnologia | Uso |
|---|---|
| [Fastify](https://fastify.dev) | Servidor HTTP e roteamento |
| [TypeScript](https://www.typescriptlang.org) | Linguagem principal |
| [fastest-validator](https://github.com/icebob/fastest-validator) | Validação de payloads |
| [uuid](https://github.com/uuidjs/uuid) | Geração de identificadores |
| [Jest](https://jestjs.io) + [ts-jest](https://kulshekhar.github.io/ts-jest) | Testes unitários |
| [esbuild](https://esbuild.github.io) | Bundling e build de produção |
| [Sentry](https://sentry.io) | Observabilidade e captura de erros |

---

## Como rodar a aplicação

### Pré-requisitos

- **Node.js** (recomendado: versão LTS ≥ 20)
- **npm** (gerenciador de pacotes)

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=LOCAL
LOG_LEVEL=debug
```

| Variável | Descrição | Valores aceitos |
|---|---|---|
| `NODE_ENV` | Ambiente de execução | `LOCAL`, `PRD`, `PROD`, `PRODUCTION` |
| `LOG_LEVEL` | Nível mínimo de log | `trace`, `debug`, `info`, `warn`, `error` |

> A aplicação falha na inicialização se alguma dessas variáveis não estiver definida.

### 3. Rodar o build

```bash
npm run build
```

O build gera os arquivos transpilados na pasta `dist/` usando **esbuild**, além dos arquivos de declaração de tipos (`.d.ts`) via `tsc`.

### 4. Iniciar a aplicação

**Desenvolvimento** (com hot reload via `ts-node-dev`):

```bash
npm run dev:server
```

**Produção** (após o build):

```bash
node dist/main/server/local.js
```

A API ficará disponível em **`http://localhost:8001`**.

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm install` | Instala todas as dependências |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run dev:server` | Inicia o servidor em modo desenvolvimento (porta `8001`) |
| `node dist/main/server/local.js` | Inicia a versão buildada |
| `npm test` | Executa os testes unitários com cobertura |

---

## Testes

```bash
npm test
```

Os testes utilizam **Jest + ts-jest**, com cobertura de código habilitada (`collectCoverage`). Os arquivos de teste seguem o padrão `*.spec.ts` ao lado do código testado, utilizando implementações "fake" em `src/infra/database/repositories/fakes/` e `src/infra/logger/FakeLogger.ts`.

---

## Arquitetura

A aplicação segue a **Clean Architecture**, organizando o código em camadas com regras claras de dependência — as camadas internas **nunca** dependem das externas.

```
┌─────────────────────────────────────────────────────┐
│  main          → Ponto de entrada e composição      │
├─────────────────────────────────────────────────────┤
│  presentation  → HTTP: controllers, rotas, schemas  │
├─────────────────────────────────────────────────────┤
│  application   → Use cases e protocolos (ports)     │
├─────────────────────────────────────────────────────┤
│  domain        → Entidades e abstrações (entities,  │
│                  repositories interfaces)           │
├─────────────────────────────────────────────────────┤
│  infra         → Implementações: banco, log, http,  │
│                  validators, config                 │
└─────────────────────────────────────────────────────┘
```

### `main` — Porta de entrada

É onde a aplicação é composta e iniciada. Registra todas as rotas no adaptador HTTP, instancia os controllers e sobe o servidor.

```
src/main/server/
├── index.ts   → composição das rotas e controllers
└── local.ts   → bootstrap do servidor (porta 8001)
```

### `presentation` — Camada HTTP

Responsável por receber e responder requisições HTTP.

- **`controllers/`** — classes que implementam `IHttpController`, organizadas por recurso (`driver/`, `vehicle/`, `vehicleUsage/`). Cada controller valida a requisição, chama o use case correspondente e monta a resposta.
- **`decorators/`** — `ControllerErrorHandlerDecorator`, que encapsula os controllers e traduz exceções em respostas de erro HTTP padronizadas (`HttpBadRequestError`, `HttpNotFoundError`, `HttpConflictError`, etc.).
- **`validatorSchemas/`** — schemas de validação por campo, consumidos pelo validador.
- **`http/`** — tipos de `HttpRequest`, `HttpResponse` e hierarquia de erros.

### `application` — Casos de uso e protocolos

Contém as **regras de negócio** da aplicação, independentes de frameworks.

- **`usecases/`** — uma classe por operação (ex.: `CreateDriverUseCase`, `ListVehiclesUseCase`, `FinishVehicleUsageUseCase`). Orquestram o fluxo: recebem input, chamam repositórios via interfaces e retornam output.
- **`protocols/`** — interfaces (ports) que definem os contratos que a camada `infra` deve implementar: `IHttpController`, `IRequestValidator`, `ILogger`, `IAppConfig`, `IGuidGenerator`, entre outros.

### `domain` — Núcleo do negócio

O coração da aplicação, sem nenhuma dependência de framework ou infraestrutura.

- **`entities/`** — tipos e objetos de domínio (`Driver`, `Vehicle`, `VehicleUsage`), incluindo resolvers que convertem entidades em formato de resposta.
- **`repositories/`** — interfaces dos repositórios (`ICreateDriverRepository`, `IListVehicleUsageRepository`, etc.), que declaram *o que* o sistema precisa persistir — a *implementação* fica na `infra`.

### `infra` — Implementações externas

Todas as adaptações de frameworks e serviços externos.

- **`database/`** — implementações concretas dos repositórios (`CreateDriverRepository`, `UpdateVehicleUsageRepository` etc.) e a sessão de dados (`session.ts`). Inclui também os **fakes** em `repositories/fakes/` usados nos testes.
- **`http/`** — `FastifyAdapter`, que implementa o `HttpServer` e conecta o Fastify aos controllers.
- **`logger/`** — implementação do `ILogger` baseada em `EventEmitter`.
- **`validators/`** — `FastestValidator`, implementação do `IRequestValidator`.
- **`guidGenerator/`** — `UUIDGuidGenerator` (produção) e `FakeGuidGenerator` (testes).
- **`config/`** — `AppConfig`, leitura das variáveis de ambiente.

### Regra de dependência

```
main → presentation → application → domain
                 ↘      infra      ↗
```

- `domain` não importa nada de fora de si;
- `application` depende apenas de `domain` (e dos protocolos que ela mesma define);
- `presentation` e `infra` implementam as interfaces dos protocolos;
- `main` é o único lugar que conhece todas as camadas e faz a composição.

---

## Endpoints

### Drivers

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/driver` | Cria um motorista |
| `GET` | `/drivers` | Lista motoristas (paginação e filtros) |
| `GET` | `/drivers/:driver_id` | Busca um motorista |
| `PATCH` | `/drivers/:driver_id` | Atualiza um motorista |
| `DELETE` | `/drivers/:driver_id` | Remove um motorista |

### Vehicles

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/vehicle` | Cria um veículo |
| `GET` | `/vehicles` | Lista veículos (paginação e filtros) |
| `GET` | `/vehicles/:vehicle_id` | Busca um veículo |
| `PATCH` | `/vehicles/:vehicle_id` | Atualiza um veículo |
| `DELETE` | `/vehicles/:vehicle_id` | Remove um veículo |

### Vehicle Usage

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/vehicleUsage` | Inicia o uso de um veículo por um motorista |
| `POST` | `/vehicleUsage/finish/:vehicle_usage_id` | Finaliza um uso de veículo |
| `GET` | `/vehicleUsages` | Lista usos de veículos (paginação e filtros) |
