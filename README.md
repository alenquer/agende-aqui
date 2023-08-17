#### O AgendeAqui é um projeto desenvolvido para fazer um agendamento entre o prestador de serviços e o cliente. Utilizando as tecnologias _Typescript, React, NodeJs, Prisma, Fastify e NextJS_.

## **:rocket: Objetivo**

##### O projeto tem como finalidade disponibilizar uma página na web onde o cliente pode agendar um serviço. Ali, o cliente poderá escolher os horários disponíveis.

<h1>
<img width="700" height="500" src="https://i.imgur.com/GaHZ8i9.png" />
<img width="700" height="500" src="https://i.imgur.com/UCDzZ4T.png" />
</h1>

## **:computer: Tecnologias**

#### **Front-End** ([React](reactjs.org) + [TypeScript](https://www.typescriptlang.org))

-  **[Next.js](https://nextjs.org)**
-  **HTML**
-  **TAILWIND CSS**

#### **Back-End** ([NodeJs](nodejs.org) + [TypeScript](https://www.typescriptlang.org))

-  **[Prisma](https://prisma.io)**
-  **[Postgres]**
-  **[Docker]**
-  **[Fastify](https://fastify.dev)**

#### **Utilitários**

-  Protótipo: **[Figma](https://www.figma.com/)** &rarr; **<kbd>[Protótipo (AgendeAqui)](https://www.figma.com/file/PhjdQ5dgomr32r2PITdo6r/AgendeAqui?type=design&node-id=0%3A1&mode=design&t=9PVgK86ErnviAfnk-1)</kbd>**
-  Ícones: **[React-Icons](https://react-icons.github.io/react-icons/)**

## **:wine_glass: PRIMEIRAS CONFIGURAÇÕES**

Primeiro, você precisa ter o <kbd>[NodeJS](https://nodejs.org/en/download/)</kbd> instalado na sua máquina.

Se você estiver utilizando o **Linux**, você pode optar por instalar o **Node** através do gerênciador de versões <kbd>[nvm](https://github.com/nvm-sh/nvm)</kbd> para facilitar o processo de mudança da versão do **Node**, quando for necessário.

Você pode optar também por utilizar o **yarn** no lugar do **npm**. Você pode instalar clicando neste <kbd>[link](https://yarnpkg.com/)</kbd>.

Após ter o **Node** instalado, instale as dependências do **React** instale as dependências contidas nos arquivos `package.json` que se encontram na raíz do repositório (para o gerenciamento de commits), no diretório do **projeto**. Para instalar as dependências, basta abrir o terminal no diretório e digitar o comando:

```sh
$ yarn
ou
$ npm install
```

## **:wine_glass: COMO UTILIZAR NO BACK-END**

# Configurando um Container Docker PostgreSQL

Neste tutorial, você aprenderá a configurar um container Docker PostgreSQL utilizando as seguintes instruções.

## Passo 1: Pull do PostgreSQL Docker Image

Para começar, você precisa fazer o pull da imagem Docker oficial do PostgreSQL.

```sh
$ docker pull postgres
```

## Passo 2: Criando e Executando o Container PostgreSQL

Agora, você pode criar e executar um container PostgreSQL com as configurações desejadas.

```sh
$ docker run --name my-postgres -p 5432:5432 -e POSTGRES_DB=teste -e POSTGRES_USER=user -e POSTGRES_PASSWORD=mypassword -d postgres
```

Neste comando:

--name my-postgres: Define o nome do container como "my-postgres".
-p 5432:5432: Mapeia a porta 5432 do host para a porta 5432 do container.
-e POSTGRES_DB=teste: Define o nome do banco de dados como "teste".
-e POSTGRES_USER=user: Define o nome de usuário como "user".
-e POSTGRES_PASSWORD=mypassword: Define a senha do usuário como "mypassword".
-d postgres: Utiliza a imagem Docker do PostgreSQL.

Certifique-se de ter o Docker instalado e funcionando corretamente em seu sistema antes de seguir este tutorial.

Agora configure as variáveis de ambiente necessárias, como:

```sh
SECRET=ADWADAFAFKLASJGAOIKJGHSAIOGSJAIOGJA // a mesma validadora de JWT que será adicionada no frontend.
DATABASE_URL=postgresql://user:mypassword@localhost:5432/teste // connection string para estabelecer conexão com o banco de dados postgres.

Obs: Substitua user, mypassword e teste pelos valores que você configurou anteriormente.
```

Agora execute os seguintes comandos para configurar o banco de dados com as configurações necessárias:

```sh
$ npm run dev:migrate // para configurar o banco de dados.
$ npm run dev:populate // para popular o banco de dados.
```

Após ter instalado todas as dependências, você poderá executar do projeto sem gerar a build para o seu dispositivo com:

```sh
$ yarn dev
ou
$ npm run dev
```

Abra [http://localhost:3333](http://localhost:3333) com seu navegador para ver o resultado.

## **:wine_glass: COMO UTILIZAR NO FRONT-END**

Configure as variáveis de ambiente necessárias, como:

```sh
NEXT_PUBLIC_API_URL=http://localhost:3333 // para se conectar com o backend.
SECRET=ADWADAFAFKLASJGAOIKJGHSAIOGSJAIOGJA // para os validadores do token JWT (utilize a mesma variável para o backend!).
```

Após ter instalado todas as dependências, você poderá gerar a build do projeto para o seu dispositivo com:

```sh
$ yarn dev
ou
$ npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## **:octocat: COMO CONTRIBUIR**

-  Verifique as **Issues** que estão abertas e se já não existe alguma com a sua feature;
-  Abra uma **Issue** com o nome e descrição da sua feature e assine com o seu usuário informando que irá fazê-la;
-  Faça um **[fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo)** do repositório;
-  Entre no sua página do GitHub e faça um **clone** do seu **fork**;
-  Crie uma _branch_ com o nome da sua feature: `git chechout -b feat/minhaFeature`;
-  Faça as alterações necessárias no código ou na documentação;
-  Instale as dependências do _commitlint_ na raíz do projeto para a verificação dos commits: `npm install` ou `yarn`;
-  Faça o _commit_ das suas alterações seguindo as [convenções de commit](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/), adicione na descrição o id da sua Issue em parênteses e lembre de fechar a sua Issue com o id no rodapé do commit:

```
  <tipo>(escopo opcional): <descrição> (#x)

  [corpo do commit]

  Close #x
```

Exemplo:

```sh
  feat: adicionado componente para tal coisa (#52)

  Foi adicionado um componente para tal coisa com o objetivo de melhorar tal coisa, deixando o projeto de tal maneira.

  Close #52
```

-  Faça um _push_ para a sua _branch_: `git push origin feat/minhaFeature`;
-  Agora é só abrir um _pull request_ no repositório que você fez o _fork_ e assim que acontecer o _merge_ sua Issue será fechada e suas alterações irão fazer parte do projeto;
-  Depois que o _merge_ da sua pull request for feito, você pode deletar a sua _branch_.

\* **Obrigado por contribuir!** ❤️ :facepunch: :blush:
