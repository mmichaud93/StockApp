import * as dotenv from "dotenv";
import { Container } from "inversify";

dotenv.config();

import * as supertest from "supertest";
import { SuperTest, Test } from "supertest";
import { Api } from "../src/Api";
import { container } from "../src/ioc.container";

export class Setup {
  private static instance: Setup;

  public server: SuperTest<Test>;

  public static get Instance(): Setup {
    return this.instance || (this.instance = new this());
  }

  constructor() {
    this.server = supertest.agent(new Api(container).start());
  }

  public getContainer(): Container {
    return container;
  }
}
