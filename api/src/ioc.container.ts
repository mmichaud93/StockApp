import { Container } from "inversify";

import { StockResource } from "./resources/stock/resource";

const container = new Container();

// need to bind the service layer here

// bind the resources
container.bind<StockResource>(StockResource).toSelf();

export { container };
