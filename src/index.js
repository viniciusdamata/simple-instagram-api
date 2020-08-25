const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const PORT = process.env.PORT || 3333;
const URI = process.env.MONGO_DB_URI || "";

const router = require("./routes/post.routes");
const app = express();
app.use(cors({ origin: CORS_ORIGIN }));


const server = http.Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Conectado ao Mongo");
  }
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use("/posts", router);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Pagina Inicial");
  console.log(req.io);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
