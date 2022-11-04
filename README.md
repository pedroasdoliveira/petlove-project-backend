# Petlove Back-end

Projeto de bootcamp desenvolvido para a equipe da Petlove, referente a uma aplicação onde os gestores possam avaliar seus colaboradores através de questionarios que determinam as qualidades individuais e da equipe como um todo.

## Documentação GitBook

Boa parte sobre toda a documentação da aplicação se encontra em nosso Gitbook no link:
[self-awareness-test-doc](https://pedros-organization-1.gitbook.io/self-awareness-test/)

## Pré-requisitos

### 👯‍ Clonando o projeto

Clone o projeto na sua maquina utilizando o comando do git:

`Git Clone https://github.com/pedroasdoliveira/petlove-project-backend`

Ou através do Github Desktop:

`gh repo clone pedroasdoliveira/petlove-project-backend`

## 🔧 Instalação

`npm install`

## Criando tabelas no banco de dados local

(LEMBRETE: Antes de rodar os comandos abaixo verifique se todas as variáveis de ambiente, inclusive com a conexão ao banco de dados, estejam configuradas)

`npx prisma generate` & `npx prisma db push`

## Rodando o app

- development

$ npm run start

- watch mode

$ npm run start:dev

- production mode

$ npm run build
$ npm run start:prod

## Compodoc

### Instalação

`npm i -D @compodoc/compodoc`

### Doc Generate , run and Doc update

`npx @compodoc/compodoc -p tsconfig.json -s`

## Principais ferramentas utilizadas

- NodeJS
- TypeScript
- NestJS
- PostgreSQL
- Swagger
- railway / Vercel / Heroku
- Compodoc
- Cors
- JWT
- Bcrypt

---

## 🚀 Deploy

[Render](https://api-petlove-backend.onrender.com/api)

## Front-end

Repositório: [front-end](https://github.com/pedroasdoliveira/petlove-project-frontend)

Deploy: [vercel](https://petlove-project-frontend.vercel.app)

## ✒️ Autores

- **Pedro Oliveira** (Github: https://github.com/pedroasdoliveira | Linkedin: https://www.linkedin.com/in/pedro-augusto-silva-de-oliveira/);
- **Giovanne Berteli** (Github: https://github.com/hethus | Linkedin: https://www.linkedin.com/in/giovanne-berteli-comba-0935bb230/);
- **João Vitor Carvalho** (Github: https://github.com/jcvalgas | Linkedin: https://www.linkedin.com/in/joao-vitor-carvalho-valgas/);
- **Bruna Barbosa Bomfim** (Github: https://github.com/brunabbomfim | Linkedin: https://www.linkedin.com/in/bruna-bomfim-728b7122a/);
- **Felipe dos Santos Azevedo** (Github: https://github.com/Felipe360flp | Linkedin: https://www.linkedin.com/in/felipe-dos-santos-azevedo-57a04b20b/);

---

## 📄 Licença

Este projeto está sob a licença (Mozilla Public License Version 2.0) - veja o arquivo [LICENSE.md] para mais detalhes.
