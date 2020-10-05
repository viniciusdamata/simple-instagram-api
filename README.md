# Simple api inspired by Instagram

[Versao em pt-BR](./README_PT_BR.md)

[Production version](http://instagrao.herokuapp.com/)

[Frontend repository](https://github.com/viniciusdamata/simple-instagram-frontend.git)

#### :pencil: Description

An api made using the MERN stack, which simulates the functioning of Instagram with file uploads and integration with imgur.

#### :page_facing_up: Features

- image upload local and on imgur
- posts creation
- posts list
- posts like

#### :computer: Utilized Stack

- express.js
- non relational database mongoDB with mongoose framework and express.js

#### :question: ​How to use?

1.  Create the files `.env.development` and `.env.production` with the needed variables using the example file `.env.example`
2.  Run `yarn install` or just `yarn` for dependencies installation
3.  Run the command `yarn dev` for development environment and `yarn prod` for production.

#### :+1: How to contribute?

To contribute with this project create a pull request or an issue and i'l be glad to take a look at them

#### Roadmap
- [x] convert all the api to TS
- [x] create dev server nodemon like command
- [x] remove tslint and change to eslint because tslint is deprecated
- [x] add websocket again
- [ ] implement [OvernightJS](https://github.com/seanpmaxwell/overnight) to use ts decorators
- [ ] implement tests
- [ ] configure module alias



#### :blue_book:API Routes

`POST localhost:3333/api/posts `

```javascript
var form = new FormData();
form.append("author", "test author");
form.append("place", "test location");
form.append("description", "Test");
form.append("hashtags", "#test #test");
form.append("image", "image binary here");

fetch("http://localhost:3333/api/posts/", {
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

`GET localhost:3333/api/posts `

```javascript
fetch("http://localhost:3333/api/posts", {
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

`PUT LIKE localhost:3333/api/posts/${id}/like`

```javascript
const id = "id of the post here";
fetch(`http://localhost:3333/api/posts/${id}/like`, {
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
