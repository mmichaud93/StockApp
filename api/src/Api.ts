import "reflect-metadata";

import { Server } from "http";
import * as Koa from "koa";
import cors from "koa2-cors";
import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "inversify";

export class Api {
  private app: Koa;
  private port = Number(process.env.PORT);

  constructor(container: Container) {
    // calling use container here will use our IoC container which sets up the routes and services in one go
    useContainer(container);
    this.app = createKoaServer(/* middleware can be provided here */);
  }

  start(): Server {
    return this.app.use(cors({ origin: "*" })).listen(this.port, () => {
      // koa server is listening now
      console.log(`Listening on port ${this.port}`);
    });
  }
}
