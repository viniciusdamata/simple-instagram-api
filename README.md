### Api simples inspirada no funcionamento do Instagram

#### Features

- upload de imagens localmente e no imgur
- criação de posts
- listagem de posts
- função de like nos posts

#### Stack utilizada

- express.js
- banco de dados não relacional mongoDB com framework mongoose

#### Como utilizar?

1.  Crie os arquivos `.env.development` e `.env.production` com as variaveis necessárias utilizando o arquivo de exemplo `.env.example`;
2.  rode o comando `yarn dev` para ambiente de desenvolvimento e `yarn prod` para produção.

#### Rotas

​ `POST localhost:3333/posts `

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

​ `GET localhost:3333/posts `

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
