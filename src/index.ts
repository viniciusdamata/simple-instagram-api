import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import path from "path";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const PORT = process.env.PORT || 3333;
const URI = process.env.MONGO_DB_URI || "";

import router from "./routes";
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(cors({ origin: CORS_ORIGIN }));

const server = new http.Server(app);
// const io = require("socket.io")(server);
import io from "socket.io";

mongoose.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Conectado ao Mongo");
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io(server);
  next();
});

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(router);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.listen(PORT, () => {
  console.log(
    `[index] Servidor rodando na porta ${PORT}\n[ENV] ${process.env.ENV}`
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
