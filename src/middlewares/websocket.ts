import { NextFunction, Request, Response } from "express";
import { Server } from "http";
import io from "socket.io";

export class WebSocketMiddleware {
  constructor(private server: Server) {}

  init() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const socketIo = io(this.server);
      socketIo.sockets.setMaxListeners(0);
      req.io = socketIo;
      next();
    };
  }
}
