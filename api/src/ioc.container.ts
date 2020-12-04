import { Container } from "inversify";

import { StockResource } from "./resources/stock/resource";
import { FinnhubStockPriceService } from "./services/FinnhubStockPriceService";
import { HttpService } from "./services/HttpService";
import * as IHttpService from "./services/IHttpService";
import * as IStockPriceService from "./services/IStockPriceService";

const container = new Container();

// bind the services
container.bind<IStockPriceService.INTERFACE>(IStockPriceService.TYPE).to(FinnhubStockPriceService);
container.bind<IHttpService.INTERFACE>(IHttpService.TYPE).to(HttpService);
// bind the resources
container.bind<StockResource>(StockResource).toSelf();

export { container };
