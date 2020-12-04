import "reflect-metadata";

import * as Koa from "koa";
import { createKoaServer, useContainer } from "routing-controllers";
import { container } from "./ioc.container";

export class Api {
  private app: Koa;
  private port = Number(process.env.PORT);

  constructor() {
    // calling use container here will use our IoC container which sets up the routes and services in one go
    useContainer(container);
    this.app = createKoaServer(/* middleware can be provided here */);
  }

  start() {
    this.app.listen(this.port, () => {
      // koa server is listening now
      console.log(`Listening on port ${this.port}`);
    });
  }
}
