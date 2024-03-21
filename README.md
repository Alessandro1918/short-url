# short-url

## 🚀 Projeto
Encurtador de URLs. Crie uma URL customizada que redirecione para outra página. Projeto desenvolvido no curso "Node na Prática" da  [@Rocketseat](https://www.rocketseat.com.br) em mar/24.

<code>http://localhost:4000/aleFM   =>   https://github.com/Alessandro1918/aleFM</code>

## 🛠️ Tecnologias
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com)
- [PostgreSQL](https://www.postgresql.org)
- [Redis](https://redis.io)

- ## 🧊 Cool features:
- URLs originais e reduzidas salvas em base de dados Postgres;
- Métricas de acesso salvas em base de dados Redis;
- Bases de dados rodando localmente em containers Docker;

## 🗂️ Utilização

### 🐑🐑 Clonando o repositório:

```bash
  $ git clone url-do-projeto.git
```

### ▶️ Rodando o App:
```bash
  $ cd short-url            #change to that directory
  $ cp .env.example .env    #create the ".env" file like the ".env.example" file
  $ docker compose up -d    #setup PostgreSQL and Redis containers
  $ ctrl + C                #optional - stop the container
  $ docker compose down     #optional - delete the container
  $ npm install             #download dependencies to node_modules
  $ npm run setup           #create the tables @ the db
  $ npm run dev             #start the project
```

### Rotas HTTP

baseURL: <code>localhost:4000</code>

#### POST <code>http://{baseURL}/api/links</code>
Cria uma nova URL.

#### Request body
```json
{
  "code": "aleFM",
  "url": "https://github.com/Alessandro1918/aleFM"
}
```

#### GET <code>http://{baseURL}/:code</code>
Acessa URL curta (<code>http://localhost:4000/aleFM</code>), é redirecionado para url longa (<code>https://github.com/Alessandro1918/aleFM</code>).

#### GET <code>http://{baseURL}/api/metrics</code>
Retorna dados de acesso das URLs mais acessadas.

#### Response body
```json
[
  {
    "shortLinkId": 3,
    "clicks": 4
  },
  {
    "shortLinkId": 1,
    "clicks": 1
  }
]
```