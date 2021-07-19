import cors from "cors";
import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { CORS_ORIGIN, ENV, HOST, PORT } from "./config";
import * as database from "./config/database";
import "./config/env";
import { WebSocketMiddleware } from "./middlewares/websocket";
import router from "./routes";


async function bootstrap() {
  const app = express();
  await database.connect();

  app.use(express.static(path.resolve(__dirname, "..", "public")));
  app.use(cors({ origin: CORS_ORIGIN }));

  const server = new http.Server(app);
  const webSocketMiddleware = new WebSocketMiddleware(server);
  app.use(webSocketMiddleware.init());

  app.use(
    "/api/files",
    express.static(path.resolve(__dirname, "..", "uploads", "resized"))
  );

  app.use(router);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  server.listen(PORT as number, HOST, null, (): void => {
    console.log(`[index] Servidor rodando na porta ${PORT}\n[ENV] ${ENV}`);
  });

  app.get("/", (req: Request, res: Response): void => {
    res.json("Pagina Inicial");
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on("uncaughtException", err => {
    console.error(err);
  });

  process.on("SIGTERM", async () => {
    process.exit(0);
  });
}

bootstrap().catch(error => console.log("error", error));
