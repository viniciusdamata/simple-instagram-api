# Api simples inspirada no Instagram

[Repositório do frontend](https://github.com/viniciusdamata/simple-instagram-frontend.git)

####

#### :pencil: Descrição

Uma api feita utilizando a stack MERN, que simula o funcionamento do Instagram com upload de arquivos e integração com imgur.

#### :page_facing_up: Features

- upload de imagens localmente e no imgur
- criação de posts
- listagem de posts
- função de like nos posts

#### :computer: ​Stack utilizada

- express.js
- banco de dados não relacional mongoDB com framework mongoose

#### :question: ​Como utilizar?

1.  Crie os arquivos `.env.development` e `.env.production` com as variaveis necessárias utilizando o arquivo de exemplo `.env.example`;
2.  Rode `yarn install` ou apenas `yarn` para instalar as dependencias
3.  Rode o comando `yarn dev` para ambiente de desenvolvimento e `yarn prod` para produção.

#### :+1: Como contribuir

Para contribuir com este projeto, crie um pull request ou um issue, que ficarei feliz em dar uma olhada neles.

#### :blue_book:Rotas da API

`POST localhost:3333/posts `

```javascript
var form = new FormData();
form.append("author", "Autor teste");
form.append("place", "Localização de teste");
form.append("description", "Teste");
form.append("hashtags", "#teste #teste");
form.append("image", "arquivo binario da imagem aqui");

fetch("http://localhost:3333/posts/", {
  method: "POST",
  headers: {
    "content-type": `multipart/form-data; boundary=${form._boundary}`,
  },
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
```

`GET localhost:3333/posts `

```javascript
fetch("http://localhost:3333/posts", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
  body: false,
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
```

`PUT LIKE localhost:3333/posts/${id}/like`

```javascript
const id = "id do post aqui";
fetch(`http://localhost:3333/posts/${id}/like`, {
  method: "PUT",
  headers: {},
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
```
