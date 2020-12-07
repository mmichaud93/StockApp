import { IStockPrice } from "../models/IStockPrice";

const TYPE = Symbol("IStockPriceService");

interface IStockPriceService {
  // take a symbol, return a price
  getPrice(symbol: string): Promise<IStockPrice>;
}

export { IStockPriceService as INTERFACE, TYPE };
