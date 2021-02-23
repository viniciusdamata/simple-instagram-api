import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import path from "path";
import io from "socket.io";

import "./config/env.config";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";
const PORT = process.env.PORT || 3333;
const HOST = "0.0.0.0";
const URI = process.env.MONGO_DB_URI || "";

import router from "./routes";
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(cors({ origin: CORS_ORIGIN }));

const server = new http.Server(app);

mongoose.connect(
  URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error: mongoose.Error): void => {
    if (error) return console.log(`[MongoError] ${error.message}`);
    console.log("Conectado ao Mongo");
  }
);

const socketIo = io(server);
socketIo.sockets.setMaxListeners(0);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = socketIo;
  next();
});

app.use(
  "/api/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(router);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.listen(PORT as number, HOST, null, (): void => {
  console.log(
    `[index] Servidor rodando na porta ${PORT}\n[ENV] ${process.env.ENV}`
  );
});

app.get("/", (req: Request, res: Response): void => {
  res.json("Pagina Inicial");
});
